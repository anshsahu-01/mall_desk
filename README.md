# 🏛️ Mall Desk | Cinematic Retail Experience

[![Live Demo](https://img.shields.io/badge/Live-Demo-C9A96E?style=for-the-badge&logo=vercel)](https://mall-desk.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02?style=for-the-badge&logo=greensock)](https://gsap.com/)

> **"The interface of luxury."**  
> Mall Desk is a high-fidelity, cinematic web experience designed to redefine digital retail storytelling. It blends architectural precision with fluid motion to create an immersive journey through a premium luxury space.

---

## ✨ Experience Highlights

- **🎥 Cinematic Preloader:** A synchronized loading sequence that sets the stage for a premium experience.
- **📜 Scroll-Driven Narrative:** Leverages GSAP ScrollTrigger and Framer Motion for a seamless, frame-by-frame storytelling journey.
- **💻 MacBook Showcase:** A high-end device presentation section featuring parallax effects and ambient design layers.
- **🏙️ Architectural Transitions:** Smooth transitions between sections like the **Atrium**, **Corridor**, and **Retail Showcase**.
- **🍽️ Fine Dining Intimacy:** An immersive dining section featuring interactive 3D elements and cinematic video backgrounds.
- **🤖 Robot Interaction:** Cutting-edge animations integrated into the retail flow.
- **🌊 Fluid Smooth Scroll:** Powered by Lenis for a consistent, weight-based scrolling experience across all devices.

---

## 🛠️ Tech Stack

### Core
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://reactjs.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

### Animation & 3D
- **GSAP:** For complex scroll-based pinning and horizontal movement.
- **Framer Motion:** For micro-interactions, layout transitions, and entrance animations.
- **Lenis:** For high-performance smooth scrolling.
- **Three.js:** Powering immersive 3D scenes (e.g., PlateScene).

---

## 🏗️ Project Structure

```text
src/
├── components/
│   ├── sections/     # Modular full-page sections (Hero, MacBook, Dining, etc.)
│   ├── shared/       # Reusable UI components (AnimatedText, MediaCard, PlateScene)
│   ├── ui/           # Base design system elements
│   └── data/         # Asset configurations and static content
├── app/              # Next.js App Router pages and layouts
└── styles/           # Global design tokens and Tailwind configuration
```

---

## 🚀 Getting Started

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/mall_desk.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🎨 Design Philosophy

Mall Desk follows a **"Luxury-First"** design philosophy:
- **Dark Mode by Default:** Using a deep black palette (`#000000`) with copper-gold accents (`#C9A96E`).
- **Typography:** Architectural focus with wide tracking and elegant display fonts.
- **Motion:** Every interaction is calibrated for weight, momentum, and cinematic grace.

---

## 🔗 Live Link

Experience the project live at: [**https://mall-desk.vercel.app/**](https://mall-desk.vercel.app/)

---

<div align="center">
  <p>Crafted with precision for the next generation of retail.</p>
</div>
