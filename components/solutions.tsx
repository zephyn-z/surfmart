"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Hotel, Dumbbell, Waves, Home, ArrowUpRight } from "lucide-react"
import Image from "next/image"

const segments = [
  {
    title: "Resorts & Hotels",
    description: "Boost booking rates by 30% with a premium surf attraction that differentiates your property.",
    icon: Hotel,
    image: "/images/scenes/hotel.png",
    stat: "+30%",
    statLabel: "Booking Rate",
  },
  {
    title: "Clubs & Gyms",
    description: "Offer a unique surf-fitness experience that drives membership growth and retention.",
    icon: Dumbbell,
    image: "/images/scenes/club.png",
    stat: "2x",
    statLabel: "Member Retention",
  },
  {
    title: "Water Parks",
    description: "Add a signature surf attraction that increases dwell time and per-visitor spend.",
    icon: Waves,
    image: "/images/scenes/waterpark.png",
    stat: "+45%",
    statLabel: "Visitor Spend",
  },
  {
    title: "Private Villas",
    description: "Transform your property with a personal surf pool, the ultimate luxury lifestyle upgrade.",
    icon: Home,
    image: "/images/scenes/home.png",
    stat: "5-Star",
    statLabel: "Lifestyle",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export function Solutions() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="relative bg-secondary py-14 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center sm:mb-16"
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Segment Solutions
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground text-balance md:text-5xl">
            Tailored for Every Scenario
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
            Whether it is a luxury resort or a neighborhood fitness club, SurfSmart
            delivers ROI-driven surfing solutions.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4"
        >
          {segments.map((segment) => {
            const Icon = segment.icon
            return (
              <motion.div
                key={segment.title}
                variants={cardVariants}
                className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 sm:rounded-2xl"
              >
                {/* Image */}
                <div className="relative aspect-[3/2] overflow-hidden sm:aspect-[4/3]">
                  <Image
                    src={segment.image}
                    alt={segment.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={() => {
                      console.warn(`Warning: missing scene image ${segment.image}`)
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />

                  {/* Stat badge */}
                  <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-4">
                    <span className="text-lg font-bold text-background sm:text-2xl">
                      {segment.stat}
                    </span>
                    <p className="text-[10px] text-background/80 sm:text-xs">
                      {segment.statLabel}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="absolute right-2 top-2 rounded-full bg-background/20 p-1.5 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 sm:right-3 sm:top-3 sm:p-2">
                    <ArrowUpRight className="h-3 w-3 text-background sm:h-4 sm:w-4" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-5">
                  <div className="mb-1.5 flex items-center gap-1.5 sm:mb-3 sm:gap-2">
                    <div className="rounded-md bg-primary/10 p-1.5 sm:rounded-lg sm:p-2">
                      <Icon className="h-3 w-3 text-primary sm:h-4 sm:w-4" />
                    </div>
                    <h3 className="text-xs font-semibold text-foreground sm:text-base">
                      {segment.title}
                    </h3>
                  </div>
                  <p className="hidden text-sm leading-relaxed text-muted-foreground sm:block">
                    {segment.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
