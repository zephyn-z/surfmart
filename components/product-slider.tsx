"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Badge } from "lucide-react"
import Image from "next/image"

const models = [
  {
    name: "WavePro X1",
    subtitle: "Competition Series",
    image: "/images/model-1.jpg",
    description: "Professional-grade barrel wave machine, ideal for competitive surfing venues and training centers.",
  },
  {
    name: "FlowRider S2",
    subtitle: "Indoor Series",
    image: "/images/model-2.jpg",
    description: "Compact indoor standing-wave machine, perfect for clubs, gyms, and entertainment centers.",
  },
  {
    name: "TideForce M3",
    subtitle: "Commercial Series",
    image: "/images/model-3.jpg",
    description: "High-capacity commercial wave pool system designed for water parks and large resort complexes.",
  },
  {
    name: "AquaElite V4",
    subtitle: "Luxury Series",
    image: "/images/model-4.jpg",
    description: "Premium residential surf pool designed for luxury villas, boutique resorts, and private estates.",
  },
]

export function ProductSlider() {
  const [activeIndex, setActiveIndex] = useState(1)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const goTo = (idx: number) => {
    if (idx >= 0 && idx < models.length) setActiveIndex(idx)
  }

  return (
    <section
      id="models"
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-24 lg:py-32"
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
            Product Lineup
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground text-balance md:text-5xl">
            4 Core Models
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
            From indoor compact machines to large outdoor commercial wave pools,
            SurfSmart covers every surfing scenario.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-8">
            {models.map((model, index) => {
              const isActive = index === activeIndex
              const distance = Math.abs(index - activeIndex)

              return (
                <motion.div
                  key={model.name}
                  className="cursor-pointer"
                  animate={{
                    scale: isActive ? 1 : 0.85,
                    opacity: distance > 1 ? 0.4 : isActive ? 1 : 0.7,
                    zIndex: isActive ? 10 : 5 - distance,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  onClick={() => setActiveIndex(index)}
                  style={{ flex: isActive ? "0 0 400px" : "0 0 260px" }}
                >
                  <div
                    className={`overflow-hidden rounded-2xl border transition-all duration-500 ${
                      isActive
                        ? "border-primary/30 bg-card shadow-2xl shadow-primary/10"
                        : "border-border bg-card shadow-lg"
                    }`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={model.image}
                        alt={model.name}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute bottom-3 left-3">
                        <span className="rounded-md bg-foreground/80 px-3 py-1 text-xs font-medium text-background backdrop-blur-sm">
                          Concrete / Stainless Steel
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                        {model.subtitle}
                      </p>
                      <h3 className="mb-2 text-lg font-bold text-foreground">
                        {model.name}
                      </h3>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-sm leading-relaxed text-muted-foreground"
                        >
                          {model.description}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border border-border bg-card p-3 shadow-lg transition-all hover:bg-secondary disabled:opacity-30"
            aria-label="Previous model"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <button
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === models.length - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border border-border bg-card p-3 shadow-lg transition-all hover:bg-secondary disabled:opacity-30"
            aria-label="Next model"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {models.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-border hover:bg-muted-foreground"
              }`}
              aria-label={`Go to model ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
