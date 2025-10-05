import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        'watercolor-1': 'radial-gradient(circle at 10% 20%, rgba(14, 116, 144, 0.1) 0%, rgba(255, 255, 255, 0) 50%), radial-gradient(circle at 90% 80%, rgba(94, 234, 212, 0.15) 0%, rgba(255, 255, 255, 0) 30%)',
        'watercolor-2': 'radial-gradient(circle at 30% 60%, rgba(125, 211, 252, 0.12) 0%, rgba(255, 255, 255, 0) 40%), radial-gradient(circle at 70% 30%, rgba(14, 116, 144, 0.08) 0%, rgba(255, 255, 255, 0) 50%)',
        'watercolor-cta': 'radial-gradient(circle at 10% 20%, rgba(14, 116, 144, 0.9) 0%, rgba(94, 234, 212, 0.8) 90%)',
        'vignette': 'radial-gradient(circle at center, transparent 0%, transparent 50%, rgba(0, 0, 0, 0.4) 100%)',
      },
      colors: {
        // Custom colors
        'navy': {
          DEFAULT: '#0F172A',
          light: '#1E293B',
          dark: '#020617',
        },
        'teal': {
          light: '#5EEAD4',
          DEFAULT: '#0E7490',
          dark: '#0C4A6E',
        },
        'sky': '#7DD3FC',
        'paper': '#F8FAFC',
        'charcoal': '#1E293B',
        'mist': '#E2E8F0',
        // Theme colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        source: ["Source Sans Pro", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
