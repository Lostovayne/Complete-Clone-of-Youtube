"use client"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"


export const StudioUploadModal = () => {
  return (
    <Button variant={"secondary"} >
      <PlusIcon />
      Create
    </Button>
  )
}