# Webhook Troubleshooting Guide

## Problemas Resueltos

### 1. Error 500 en `/api/videos/webhook`

#### Problemas Identificados y Corregidos:

1. **❌ Falta de `break` en el switch statement**

   - El caso `video.asset.created` no tenía `break`, causando que el código continuara ejecutándose en los siguientes casos
   - **Solución**: Agregado `break` al final de cada caso

2. **❌ Falta de configuración de Route Segment para Next.js 15**

   - Next.js 15 requiere configuraciones explícitas para rutas dinámicas
   - **Solución**: Agregadas las siguientes exportaciones:
     ```typescript
     export const dynamic = "force-dynamic";
     export const runtime = "nodejs";
     ```

3. **❌ Middleware de Clerk interfiriendo con webhooks**

   - El middleware intentaba autenticar las peticiones de webhook
   - **Solución**: Agregada excepción para rutas de webhook en `middleware.ts`

4. **❌ Falta de manejo de errores**
   - No había captura de errores global, dificultando el debugging
   - **Solución**: Agregado try-catch global con logging detallado

## Verificación de Variables de Entorno

Asegúrate de tener las siguientes variables configuradas en tu archivo `.env`:

```env
# Mux
MUX_TOKEN_ID=your_token_id
MUX_TOKEN_SECRET=your_token_secret
MUX_WEBHOOK_SECRET=your_webhook_secret

# UploadThing
UPLOADTHING_TOKEN=your_uploadthing_token

# Database
DATABASE_URL=your_database_url

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

## Cómo Probar el Webhook Localmente

### 1. Usar ngrok para exponer tu servidor local

```bash
# Iniciar tu servidor de desarrollo
npm run dev

# En otra terminal, exponer el puerto con ngrok
ngrok http 3000
```

### 2. Configurar el webhook en Mux

1. Ve a [Mux Dashboard](https://dashboard.mux.com/)
2. Navega a Settings > Webhooks
3. Agrega tu URL de ngrok: `https://your-ngrok-url.ngrok.io/api/videos/webhook`
4. Selecciona los eventos:
   - `video.asset.created`
   - `video.asset.ready`
   - `video.asset.errored`
   - `video.asset.deleted`
   - `video.asset.track.ready`

### 3. Verificar los logs

El webhook ahora incluye logging detallado:

```typescript
console.log("Webhook received:", payload.type);
console.log("Video asset created:", data.id);
console.log("Video asset ready:", data.id);
console.error("Video asset errored:", data.id, data.errors);
```

Observa la consola de tu servidor para ver estos mensajes.

## Debugging Común

### Error: "Mux signature is not set"

**Causa**: Mux no está enviando el header de firma o no está llegando correctamente.

**Solución**:

- Verifica que la URL del webhook esté correctamente configurada en Mux
- Asegúrate de que no haya proxies intermedios que eliminen headers

### Error: "Invalid signature"

**Causa**: La firma del webhook no coincide.

**Solución**:

- Verifica que `MUX_WEBHOOK_SECRET` en tu `.env` coincida con el secreto en Mux Dashboard
- Asegúrate de que el body de la petición no esté siendo modificado antes de la verificación

### Error: "Upload ID is not set"

**Causa**: El video no se está creando correctamente en la base de datos.

**Solución**:

- Verifica que el procedimiento `create` en `videos/server/procedures.ts` esté funcionando
- Asegúrate de que el `muxUploadId` se esté guardando correctamente

### Error: "Failed to upload thumbnails"

**Causa**: UploadThing no puede subir las imágenes desde Mux.

**Solución**:

- Verifica que `UPLOADTHING_TOKEN` esté configurado
- Asegúrate de que la URL de Mux sea accesible: `https://image.mux.com/${playbackId}/thumbnail.png`
- Revisa los logs de UploadThing en su dashboard

## Flujo Completo de Subida de Video

1. **Usuario sube video**: Se llama al procedimiento `create` en tRPC
2. **Mux crea upload**: Se obtiene una URL de subida de Mux
3. **Video se guarda en DB**: Con `muxUploadId` y status `"waiting"`
4. **Webhook `video.asset.created`**: Actualiza `muxAssetId` y `muxStatus`
5. **Webhook `video.asset.ready`**:
   - Obtiene `playbackId`
   - Descarga thumbnail y preview de Mux
   - Sube a UploadThing
   - Actualiza DB con todas las URLs y duración
6. **Video listo**: El usuario puede visualizarlo

## Comandos Útiles

```bash
# Desarrollo con ngrok
npm run dev:all

# Solo desarrollo
npm run dev

# Solo webhook/ngrok
npm run dev:webhook

# Ver base de datos
npm run drizzle:studio

# Ver logs en tiempo real
# En terminal del servidor de desarrollo
```

## Checklist de Verificación

- [ ] Variables de entorno configuradas
- [ ] Webhook configurado en Mux Dashboard
- [ ] ngrok funcionando (para desarrollo local)
- [ ] Middleware permite acceso público al webhook
- [ ] Base de datos tiene la tabla `videos` con todas las columnas necesarias
- [ ] UploadThing configurado correctamente

## Recursos Adicionales

- [Mux Webhooks Documentation](https://docs.mux.com/guides/listen-for-webhooks)
- [Next.js 15 Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [UploadThing Documentation](https://docs.uploadthing.com/)

## Contacto

Si sigues teniendo problemas después de seguir esta guía, revisa:

1. Los logs de la consola del servidor
2. Los logs en Mux Dashboard > Webhooks
3. Los logs en UploadThing Dashboard
