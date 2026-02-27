"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Waves } from "lucide-react"
import Link from "next/link"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Global Projects", href: "/projects" },
  { label: "Contact Us", href: "/contact" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const isHome = pathname === "/"
  const solid = !isHome || scrolled

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        initial={false}
        animate={{
          backgroundColor: solid ? "rgba(255,255,255,0.97)" : "rgba(0,0,0,0)",
          boxShadow: solid ? "0 1px 20px rgba(0,0,0,0.08)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Waves
              className={`h-6 w-6 md:h-7 md:w-7 transition-colors duration-500 ${
                solid ? "text-primary" : "text-primary-foreground"
              }`}
            />
            <span
              className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-500 ${
                solid ? "text-foreground" : "text-primary-foreground"
              }`}
            >
              SurfSmart
            </span>
          </Link>

          {/* Nav - visible from md (768px) upwards */}
          <nav className="hidden items-center gap-4 md:flex lg:gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-500 hover:opacity-80 ${
                    solid ? "text-foreground" : "text-primary-foreground"
                  } ${isActive ? "opacity-100" : ""}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                        solid ? "bg-primary" : "bg-primary-foreground"
                      }`}
                    />
                  )}
                </Link>
              )
            })}
            <Link
              href="/contact"
              className={`ml-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-500 lg:px-5 lg:py-2.5 ${
                solid
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-primary-foreground/20 text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground/30"
              }`}
            >
              Get a Quote
            </Link>
          </nav>

          {/* Mobile Toggle - only below md (768px) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden transition-colors duration-500 ${
              solid ? "text-foreground" : "text-primary-foreground"
            }`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile side-drawer - only below md (768px) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Semi-transparent backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-30 bg-foreground/30 backdrop-blur-[3px] md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            {/* Right-side drawer (~2/3 width max 280px) */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="fixed right-0 top-0 bottom-0 z-40 flex w-2/3 max-w-[280px] flex-col border-l border-border bg-background shadow-2xl md:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <span className="text-sm font-semibold text-foreground">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md p-1 text-muted-foreground hover:text-foreground"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex flex-1 flex-col px-4 py-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors ${
                      pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  className="mt-3 rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground"
                >
                  Get a Quote
                </Link>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
