"use client"

import dynamic from "next/dynamic"

export type ProjectData = {
  id: string
  title: string
  country: string
  region: string
  location: string
  description: string
  coordinates: [number, number]
  cover: string
  media: string[]
}

const ProjectsMapLeaflet = dynamic(
  () =>
    import("@/components/projects-map-leaflet").then(
      (mod) => mod.ProjectsMapLeaflet
    ),
  {
    ssr: false,
    loading: () => (
      <main className="pb-20 pt-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="h-[560px] w-full animate-pulse rounded-2xl border border-border bg-muted" />
        </div>
      </main>
    ),
  }
)

export function ProjectsMap({ projectsData }: { projectsData: ProjectData[] }) {
  return <ProjectsMapLeaflet projectsData={projectsData} />
}
