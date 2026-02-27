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
    image: "/images/segment-resort.jpg",
    stat: "+30%",
    statLabel: "Booking Rate",
  },
  {
    title: "Clubs & Gyms",
    description: "Offer a unique surf-fitness experience that drives membership growth and retention.",
    icon: Dumbbell,
    image: "/images/segment-club.jpg",
    stat: "2x",
    statLabel: "Member Retention",
  },
  {
    title: "Water Parks",
    description: "Add a signature surf attraction that increases dwell time and per-visitor spend.",
    icon: Waves,
    image: "/images/segment-waterpark.jpg",
    stat: "+45%",
    statLabel: "Visitor Spend",
  },
  {
    title: "Private Villas",
    description: "Transform your property with a personal surf pool, the ultimate luxury lifestyle upgrade.",
    icon: Home,
    image: "/images/segment-villa.jpg",
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
      className="relative bg-secondary py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
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
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {segments.map((segment) => {
            const Icon = segment.icon
            return (
              <motion.div
                key={segment.title}
                variants={cardVariants}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={segment.image}
                    alt={segment.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />

                  {/* Stat badge */}
                  <div className="absolute bottom-3 left-4">
                    <span className="text-2xl font-bold text-background">
                      {segment.stat}
                    </span>
                    <p className="text-xs text-background/80">
                      {segment.statLabel}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="absolute right-3 top-3 rounded-full bg-background/20 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4 text-background" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {segment.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
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
