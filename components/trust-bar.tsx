"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  ShieldCheck,
  Award,
  Globe,
  Headphones,
  Ship,
  Factory,
} from "lucide-react"
import Image from "next/image"

const trustItems = [
  { icon: ShieldCheck, label: "CE Certified" },
  { icon: Award, label: "ISO 9001" },
  { icon: Globe, label: "Exported to 5+ Countries" },
  { icon: Headphones, label: "Professional After-sales" },
  { icon: Ship, label: "Qingdao Port Logistics" },
  { icon: Factory, label: "15,000 sqm Factory" },
]

export function TrustBar() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section id="trust" ref={sectionRef} className="relative overflow-hidden bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Why SurfSmart
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground text-balance md:text-5xl">
            Trusted Worldwide
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
            Backed by rigorous international certifications and a dedicated
            after-sales team — we deliver quality you can trust.
          </p>
        </motion.div>

        {/* Scrolling Trust Icons */}
        <div className="relative mb-16">
          <div className="absolute left-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

          <motion.div
            className="flex gap-6"
            animate={{ x: [0, -800] }}
            transition={{
              x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" },
            }}
          >
            {[...trustItems, ...trustItems, ...trustItems].map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="flex shrink-0 items-center gap-3 rounded-xl border border-border bg-card px-6 py-4 shadow-sm"
                >
                  <div className="rounded-lg bg-primary/10 p-2.5">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="whitespace-nowrap text-sm font-medium text-foreground">
                    {item.label}
                  </span>
                </div>
              )
            })}
          </motion.div>
        </div>

        {/* Factory showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative overflow-hidden rounded-2xl"
        >
          <div className="relative aspect-[21/9] overflow-hidden">
            <Image
              src="/images/factory.jpg"
              alt="SurfSmart manufacturing facility"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12">
              <h3 className="mb-2 text-2xl font-bold text-background md:text-3xl">
                World-Class Manufacturing
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-background/80 md:text-base">
                Our 15,000 sqm Qingdao facility combines precision engineering with
                rigorous quality control — every machine built to international
                standards.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {[
            { value: "200+", label: "Units Delivered" },
            { value: "5+", label: "Countries" },
            { value: "15,000", label: "sqm Factory" },
            { value: "24/7", label: "After-sales Support" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-6 text-center shadow-sm"
            >
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
