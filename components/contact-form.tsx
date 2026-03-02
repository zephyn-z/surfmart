"use client"

import { useState, type BaseSyntheticEvent } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  name: z.string().min(2, "请输入至少 2 个字符"),
  email: z.string().email("请输入有效的邮箱地址"),
  subject: z.string().min(1, "请输入主题"),
  projectType: z.string().min(1, "请选择项目类型"),
  message: z.string().min(10, "请输入至少 10 个字符"),
})

type FormValues = z.infer<typeof formSchema>
type ContactFormProps = {
  compact?: boolean
  defaultSubject?: string
  defaultProjectType?: string
  defaultMessage?: string
}

const PROJECT_TYPES = [
  { value: "resort", label: "Resort" },
  { value: "club", label: "Club" },
  { value: "waterpark", label: "Water Park" },
  { value: "villa", label: "Private Villa" },
  { value: "other", label: "Other" },
] as const

export function ContactForm({
  compact = false,
  defaultSubject = "",
  defaultProjectType = "other",
  defaultMessage = "",
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: defaultSubject,
      projectType: defaultProjectType,
      message: defaultMessage,
    },
  })

  async function onSubmit(_: FormValues, event?: BaseSyntheticEvent) {
    const formElement = event?.target as HTMLFormElement | undefined
    if (!formElement) return

    setIsSubmitting(true)
    setIsSuccess(false)

    try {
      const formData = new FormData(formElement)
      const response = await fetch("https://formspree.io/f/xwvndkky", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Formspree request failed")
      }

      form.reset({
        name: "",
        email: "",
        subject: defaultSubject,
        projectType: defaultProjectType,
        message: defaultMessage,
      })
      setIsSuccess(true)
      toast.success(
        "Thank you! Your inquiry has been sent successfully. We will contact you soon."
      )
      setTimeout(() => setIsSuccess(false), 2500)
    } catch {
      toast.error("Submission failed. Please check your network and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form
        action="https://formspree.io/f/xwvndkky"
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className={compact ? "space-y-4" : "space-y-6"}
      >
        <input
          type="hidden"
          name="project_type"
          value={form.watch("projectType")}
          readOnly
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} name="full_name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    {...field}
                    name="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Brief subject" {...field} name="subject" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PROJECT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your project..."
                  className={compact ? "min-h-24" : "min-h-32"}
                  {...field}
                  name="message"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting
            ? "Sending..."
            : isSuccess
              ? "Message Sent!"
              : "Send Message"}
        </Button>
      </form>
    </Form>
  )
}
