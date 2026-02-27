"use client"

import { Waves, Mail, Phone, MapPin, Linkedin, Youtube, MessageCircle } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Centered brand + contact */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 flex items-center gap-2">
            <Waves className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold tracking-tight">SurfSmart</span>
          </div>
          <p className="mb-4 max-w-md text-sm leading-relaxed text-background/60">
            Professional turn-key surfing solutions from China. We design, manufacture, and install premium wave machines worldwide.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-background/70">
            <a
              href="mailto:info@surfsmart.com"
              className="flex items-center gap-1.5 transition-colors hover:text-background"
            >
              <Mail className="h-3.5 w-3.5" />
              info@surfsmart.com
            </a>
            <a
              href="tel:+8653288888888"
              className="flex items-center gap-1.5 transition-colors hover:text-background"
            >
              <Phone className="h-3.5 w-3.5" />
              +86 532 8888 8888
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              Qingdao, China
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-background/10 pt-5 md:flex-row">
          <p className="text-xs text-background/40">
            {"\u00A9"} {new Date().getFullYear()} SurfSmart. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="LinkedIn" className="text-background/40 transition-colors hover:text-background">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="#" aria-label="YouTube" className="text-background/40 transition-colors hover:text-background">
              <Youtube className="h-4 w-4" />
            </a>
            <a href="#" aria-label="WeChat" className="text-background/40 transition-colors hover:text-background">
              <MessageCircle className="h-4 w-4" />
            </a>
            <a href="#" aria-label="WhatsApp" className="text-background/40 transition-colors hover:text-background">
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
