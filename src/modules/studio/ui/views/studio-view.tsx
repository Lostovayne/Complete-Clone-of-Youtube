import { VideosSection } from "../sections/videos-section";


export const StudioView = () => {
  return (
    <div className="flex flex-col gap-y-6 pt-2.5" >
      <div className="px-4" >
        <h1 className="text-2xl font-bold" >Channel Content</h1>
        <p className="text-xs text-muted-foreground" >
          Manage your channel content and videos
        </p>
      </div>
      <VideosSection /> 
    </div>


  )
};
