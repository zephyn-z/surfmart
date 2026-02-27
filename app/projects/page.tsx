import type { Metadata } from "next"
import Image from "next/image"
import { MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Global Projects - SurfSmart",
  description:
    "Explore SurfSmart surfing machine installations across resorts, clubs, water parks, and private villas worldwide.",
}

const projects = [
  {
    title: "Bali Wave Resort",
    location: "Bali, Indonesia",
    image: "/images/segment-resort.jpg",
    tag: "Resort",
  },
  {
    title: "Shanghai Surf Club",
    location: "Shanghai, China",
    image: "/images/segment-club.jpg",
    tag: "Club",
  },
  {
    title: "Dubai Aqua Park",
    location: "Dubai, UAE",
    image: "/images/segment-waterpark.jpg",
    tag: "Water Park",
  },
  {
    title: "Maldives Private Villa",
    location: "Maldives",
    image: "/images/segment-villa.jpg",
    tag: "Villa",
  },
]

export default function ProjectsPage() {
  return (
    <main className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Global Projects
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground lg:text-5xl text-balance">
            Trusted by Clients in 5+ Countries
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            From luxury island resorts to urban fitness clubs, our surfing
            machines are making waves worldwide. Explore a selection of our
            recent installations.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 sm:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {project.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="mb-1 text-xl font-semibold text-card-foreground">
                  {project.title}
                </h3>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {project.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
