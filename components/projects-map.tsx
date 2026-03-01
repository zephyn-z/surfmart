"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { MapPin } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type ProjectData = {
  id: string
  name: string
  location: string
  description: string
  coordinates: { x: number; y: number }
  media: string[]
}

function isVideoSrc(src: string): boolean {
  return /\.(mp4|webm|mov|ogg)(\?|$)/i.test(src)
}

function MapPinItem({
  project,
  isSelected,
  onSelect,
}: {
  project: ProjectData
  isSelected: boolean
  onSelect: () => void
}) {
  const thumbSrc = project.media[0] ?? "/images/model-1.jpg"

  return (
    <button
      type="button"
      className="absolute cursor-pointer touch-manipulation"
      style={{
        left: `${project.coordinates.x}%`,
        top: `${project.coordinates.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      aria-label={`查看 ${project.name} 项目详情`}
      aria-pressed={isSelected}
    >
      <motion.div
        className="relative z-10 h-12 w-12 overflow-hidden rounded-full border-2 border-white ring-2 ring-primary/30 md:h-14 md:w-14"
        animate={{
          scale: isSelected ? 1.3 : 1,
          boxShadow: isSelected
            ? "0 0 0 4px rgba(26, 111, 181, 0.4), 0 8px 24px rgba(0,0,0,0.3)"
            : "0 2px 8px rgba(0,0,0,0.2)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <Image
          src={thumbSrc}
          alt={project.name}
          fill
          className="object-cover"
          sizes="56px"
        />
      </motion.div>
    </button>
  )
}

function ProjectDetailModal({
  project,
  open,
  onClose,
}: {
  project: ProjectData | null
  open: boolean
  onClose: () => void
}) {
  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        className="max-h-[90vh] overflow-hidden border-0 bg-white/90 p-0 shadow-2xl backdrop-blur-xl dark:bg-card/90 max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:top-auto max-md:max-h-[92vh] max-md:translate-y-0 max-md:rounded-t-2xl max-md:border-t md:max-w-xl"
        showCloseButton={true}
      >
        {/* Top: Media Carousel */}
        <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-muted">
          <Carousel
            opts={{ align: "start", loop: true }}
            className="h-full w-full"
          >
            <CarouselContent className="h-full">
              {project.media.map((src, idx) => (
                <CarouselItem key={idx} className="h-full pl-0">
                  {isVideoSrc(src) ? (
                    <video
                      src={src}
                      controls
                      className="h-full w-full object-cover"
                      playsInline
                    />
                  ) : (
                    <div className="relative h-full w-full">
                      <Image
                        src={src}
                        alt={`${project.name} - 图片 ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 512px"
                      />
                    </div>
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        {/* Bottom: Text Content */}
        <div className="flex flex-col gap-4 overflow-y-auto p-6">
          <DialogHeader>
            <DialogTitle className="text-xl">{project.name}</DialogTitle>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              {project.location}
            </p>
          </DialogHeader>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const galleryImages = [
  { src: "/images/model-1.jpg", alt: "WavePro X1 现场运行" },
  { src: "/images/model-2.jpg", alt: "FlowRider S2 室内冲浪" },
  { src: "/images/model-3.jpg", alt: "TideForce M3 商业冲浪池" },
  { src: "/images/model-4.jpg", alt: "AquaElite V4 奢华冲浪池" },
  { src: "/images/segment-resort.jpg", alt: "度假村冲浪项目" },
  { src: "/images/segment-club.jpg", alt: "俱乐部冲浪项目" },
  { src: "/images/segment-waterpark.jpg", alt: "水上乐园冲浪项目" },
  { src: "/images/segment-villa.jpg", alt: "私人别墅冲浪池" },
]

const MAP_VIEWBOX = { width: 2000, height: 857 }

export function ProjectsMap({
  projectsData,
}: {
  projectsData: ProjectData[]
}) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeProject = projectsData.find((p) => p.id === activeId)

  const handleSelect = useCallback((id: string) => {
    setActiveId((prev) => (prev === id ? null : id))
  }, [])

  const handleClose = useCallback(() => {
    setActiveId(null)
  }, [])

  const handleMapClick = useCallback(() => {
    setActiveId(null)
  }, [])

  return (
    <main className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Global Projects
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground lg:text-5xl text-balance">
            Trusted by Clients in 5+ Countries
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            From luxury island resorts to urban fitness clubs, our surfing
            machines are making waves worldwide. Click on a pin to explore each
            project.
          </p>
        </div>

        {/* Map Container - click blank area to close modal */}
        <div
          className="relative mb-20 cursor-default overflow-hidden rounded-2xl border border-border bg-[oklch(0.95_0.04_210)]"
          onClick={handleMapClick}
          role="presentation"
        >
          <div
            className="relative w-full"
            style={{
              aspectRatio: `${MAP_VIEWBOX.width} / ${MAP_VIEWBOX.height}`,
            }}
          >
            {/* World Map Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/world-map.svg"
                alt=""
                className="h-full w-full object-contain"
                style={{
                  opacity: 0.45,
                  filter: "brightness(1.1) contrast(1.1)",
                }}
              />
            </div>

            <div
              className="pointer-events-none absolute inset-0 mix-blend-overlay"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(100, 180, 255, 0.08) 0%, transparent 70%)",
              }}
            />

            {/* Interactive Pins */}
            <div className="absolute inset-0">
              {projectsData.map((project) => (
                <MapPinItem
                  key={project.id}
                  project={project}
                  isSelected={activeId === project.id}
                  onSelect={() => handleSelect(project.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Project Detail Modal */}
        <ProjectDetailModal
          project={activeProject ?? null}
          open={!!activeId}
          onClose={handleClose}
        />

        {/* Project Gallery Carousel */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-foreground">
            On-Site Gallery
          </h2>
          <div className="relative">
            <Carousel
              opts={{ align: "start", loop: true, slidesToScroll: 1 }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {galleryImages.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-full pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
                  >
                    <div className="group relative overflow-hidden rounded-xl border border-border bg-card">
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw, 33vw"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4 hidden md:flex" />
              <CarouselNext className="-right-4 hidden md:flex" />
            </Carousel>
          </div>
        </section>
      </div>
    </main>
  )
}
