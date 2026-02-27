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

  /* Only show transparent-to-solid on the home page (which has a full-bleed hero).
     On sub-pages the header is always solid. */
  const isHome = pathname === "/"
  const solid = !isHome || scrolled

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  /* Close mobile menu on route change */
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
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Waves
              className={`h-7 w-7 transition-colors duration-500 ${
                solid ? "text-primary" : "text-primary-foreground"
              }`}
            />
            <span
              className={`text-xl font-bold tracking-tight transition-colors duration-500 ${
                solid ? "text-foreground" : "text-primary-foreground"
              }`}
            >
              SurfSmart
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-500 hover:opacity-80 ${
                    solid ? "text-foreground" : "text-primary-foreground"
                  } ${isActive ? "opacity-100" : ""}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className={`block h-0.5 mt-0.5 rounded-full ${
                        solid ? "bg-primary" : "bg-primary-foreground"
                      }`}
                    />
                  )}
                </Link>
              )
            })}
            <Link
              href="/contact"
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-500 ${
                solid
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-primary-foreground/20 text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground/30"
              }`}
            >
              Get a Quote
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden transition-colors duration-500 ${
              solid ? "text-foreground" : "text-primary-foreground"
            }`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 pt-20 backdrop-blur-md lg:hidden"
          >
            <nav className="flex flex-col items-center gap-6 p-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-lg font-medium transition-colors ${
                    pathname === link.href ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-4 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground"
              >
                Get a Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
