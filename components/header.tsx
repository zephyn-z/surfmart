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
        className="fixed top-0 left-0 right-0 z-50"  
        initial={false}
        animate={{
          // 1. 原有背景/阴影
          backgroundColor: solid ? "rgba(4, 12, 24, 0.97)" : "rgba(0,0,0,0)",
          boxShadow: solid ? "0 1px 20px rgba(59, 130, 246, 0.15)" : "none",
          // 2. 新增直观的动画属性（核心：让效果可见）
          y: solid ? 0 : -5,          // 未滚动时向上偏移5px，滚动后回到原位
          scale: solid ? 1 : 0.98,    // 未滚动时轻微缩小，滚动后恢复原大小
          opacity: solid ? 1 : 0.95,  // 未滚动时轻微透明，滚动后完全不透明
        }}
        // 3. 过渡效果（弹性/晃动，现在能直观感受到了）
        transition={{
          type: "spring",  // 弹性类型（核心：让动画有晃动/回弹感）
          stiffness: 400,  // 弹性强度（越大越猛，建议 300-500）
          damping: 17,     // 阻尼（越小晃得越久，建议 15-20）
          mass: 0.5        // 质量（越小越轻盈，建议 0.3-0.8）
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo-800x400.png"
              alt="SurfSmart Logo"
              className={`
                h-auto
                w-40 md:w-50
                transition-colors duration-200
                object-contain
                ${solid ? "text-primary" : "text-primary-foreground"}
              `}
              aria-hidden="true"
            />

          </Link>

          {/* 桌面端导航 - md 及以上显示 */}
          <nav className="hidden items-center gap-4 md:flex lg:gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-200 hover:opacity-80 ${
                    solid ? "text-white" : "text-primary-foreground"
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
              className={`ml-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 lg:px-5 lg:py-2.5 ${
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
            className="md:hidden transition-colors duration-200 text-white"
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
