"use client"

import { SocialLinks } from "@/components/social-links"

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-foreground text-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-4 md:flex-row md:justify-between md:items-center lg:px-8">
        <p className="text-xs text-background/40">
          © {new Date().getFullYear()} SurfSmart. All rights reserved.
        </p>
        <SocialLinks variant="footer" />
      </div>
    </footer>
  )
}
