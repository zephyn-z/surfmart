import type { Metadata } from "next"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us - SurfSmart",
  description:
    "Get in touch with SurfSmart for surfing machine quotes, technical support, or partnership inquiries.",
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@surfsmart.com",
    href: "mailto:info@surfsmart.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+86 532 8888 8888",
    href: "tel:+8653288888888",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Qingdao, Shandong, China",
    href: undefined,
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon - Fri, 9:00 - 18:00 (CST)",
    href: undefined,
  },
]

export default function ContactPage() {
  return (
    <main className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Contact Us
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground lg:text-5xl text-balance">
            Let{"'"}s Build Your Wave
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Whether you need a quote, technical consultation, or want to visit
            our factory, our team is ready to help. Reach out today and we will
            get back to you within 24 hours.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-card-foreground"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-card-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-card-foreground"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a topic
                  </option>
                  <option>Request a Quote</option>
                  <option>Technical Consultation</option>
                  <option>After-Sales Support</option>
                  <option>Factory Visit</option>
                  <option>Partnership Inquiry</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-card-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your project..."
                  className="resize-none rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                className="self-start rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {contactInfo.map((item) => {
              const Icon = item.icon
              const content = (
                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-card-foreground">
                      {item.value}
                    </p>
                  </div>
                </div>
              )
              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="transition-opacity hover:opacity-80"
                >
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
