"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ContactFormModal() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", message: "" })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div
      className="mx-auto p-8 rounded-2xl max-w-2xl flex flex-col justify-center"
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
        borderRadius: "20px",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Share Your Feedback
        </h2>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white/80 mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-lg 
                     text-white placeholder-white/50 backdrop-blur-sm
                     focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white/80 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-lg 
                     text-white placeholder-white/50 backdrop-blur-sm
                     focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-white/80 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-lg 
                     text-white placeholder-white/50 backdrop-blur-sm resize-none
                     focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="Share your thoughts with us..."
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold 
                   py-3.5 px-6 rounded-lg border border-white/30 backdrop-blur-sm
                   transition-all duration-300"
        >
          Send Feedback
        </Button>
      </form>
    </div>
  )
}
