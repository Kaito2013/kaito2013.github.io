# Randy Minh — Senior Full-Stack & Mobile Software Engineer Portfolio

[![Live Site](https://img.shields.io/badge/Live_Site-kaito2013.github.io-2563eb?style=for-the-badge&logo=githubpages&logoColor=white)](https://kaito2013.github.io)
[![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)](https://kaito2013.github.io)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

> A modern, high-performance personal portfolio website showcasing real-world software architecture, high-concurrency backend systems, cross-platform mobile applications, and engineering leadership.

🌐 **Live URL**: [https://kaito2013.github.io](https://kaito2013.github.io)

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Local Development](#-local-development)
- [Deployment](#-deployment)
- [Performance & Accessibility](#-performance--accessibility)
- [Contact & Socials](#-contact--socials)

---

## 🌟 Overview

This repository hosts the official personal website and engineering portfolio of **Randy Minh** (GitHub: [@Kaito2013](https://github.com/Kaito2013)). 

Built with a focus on speed, aesthetics, accessibility, and zero-runtime bloat, the portfolio communicates technical depth through interactive Bento Grid modules, detailed architectural breakdowns of flagship projects, and seamless user experiences across mobile, tablet, and desktop viewports.

---

## ✨ Key Features

- **⚡ Zero-FOUC Dual Theme System**:
  - Full Dark Mode and Light Mode support with smooth CSS transitions.
  - Early-execution `<head>` script preventing Flash of Unstyled Content (FOUC).
  - Synchronizes with `localStorage` and system `prefers-color-scheme` automatically.
- **🍱 Bento Grid Architecture**:
  - Organized showcase of core engineering strengths: Backend Microservices, Mobile Engineering, Cloud Infrastructure, and Technical Leadership.
  - Interactive skill pills with icon badges and level indicators.
- **💼 Architectural Project Case Studies**:
  - Real-world production projects detailing Problem, Architecture & Solution, Key Metrics, and Tech Stacks.
  - Deep-dive highlights for FinTech high-throughput microservices, E-commerce mobile apps, and IoT real-time streaming platforms.
- **📋 One-Click Email Copy Utility**:
  - High-usability clipboard copy button with visual state feedback and tooltip animation.
  - Robust asynchronous clipboard API support with textarea fallback for non-secure or restricted contexts.
- **🧭 Dynamic Scroll Spy Navigation**:
  - Sticky glassmorphic navigation bar with blurred background (`backdrop-blur-md`).
  - Active section indicator that tracks scrolling position via Intersection Observer.
  - Mobile slide-down menu with backdrop tap-to-dismiss and Esc key listeners.
- **♿ Semantic & Accessible**:
  - Structured HTML5 landmark elements (`<header>`, `<main>`, `<section>`, `<footer>`).
  - Fully accessible ARIA attributes (`aria-label`, `aria-expanded`, `aria-live`, `role`).
  - High-contrast typography optimized for readability using Inter and JetBrains Mono fonts.
- **🔍 SEO & Social Sharing Ready**:
  - Pre-configured OpenGraph and Twitter Card metadata for rich previews on Slack, LinkedIn, Twitter, and Facebook.

---

## 🛠 Tech Stack

| Layer | Technologies & Tools |
| :--- | :--- |
| **Markup & Semantics** | HTML5, Semantic Elements, WAI-ARIA, OpenGraph Protocol |
| **Styling & Design System** | Tailwind CSS (v3 CDN), Modern CSS3 Custom Properties (Variables), Bento Grid Layout |
| **Typography & Icons** | Inter & JetBrains Mono (Google Fonts), Lucide Icons |
| **Interactivity & Logic** | Modern Vanilla JavaScript (ES6+, zero heavy framework dependencies) |
| **Hosting & CI/CD** | GitHub Pages, Git |

> [!NOTE]
> **Architectural Decision (Zero-Build Philosophy):** Tailwind CSS is loaded via CDN to preserve the zero-build-step architecture, ensuring instantaneous deployment, zero node_modules dependencies, and effortless editing directly in the browser or any lightweight editor.

---

## 📁 Project Structure

```text
kaito2013.github.io/
├── assets/
│   ├── css/
│   │   └── style.css            # Custom CSS animations, tokens, and utility classes
│   ├── js/
│   │   └── main.js              # Theme toggle, mobile menu, clipboard copy, scroll spy
│   └── images/                  # Static images, project screenshots, and visual assets
│       └── .gitkeep
├── index.html                   # Main single-page portfolio document
└── README.md                    # Repository documentation and development guide
```

---

## 💻 Local Development

Because this project is built entirely with modern web standards and zero build-step overhead, running it locally requires no installation of heavy toolchains.

### Option 1: Python HTTP Server (Recommended)
```bash
# Clone the repository
git clone https://github.com/Kaito2013/kaito2013.github.io.git
cd kaito2013.github.io

# Start local server on port 8000
python3 -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

### Option 2: Node.js `npx serve`
```bash
npx serve . -l 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 3: VS Code Live Server
1. Open the project folder in VS Code.
2. Install the **Live Server** extension.
3. Click **"Go Live"** in the bottom status bar.

---

## 🚀 Deployment

The site is configured for automated continuous deployment using **GitHub Pages**:

1. Any commit pushed to the `main` branch is automatically published.
2. The site root (`/`) serves `index.html`.
3. Custom domain or default GitHub Pages domain (`https://kaito2013.github.io`) serves the site over HTTPS with automated TLS certificate management.

---

## 📈 Performance & Accessibility

- **Zero JavaScript framework overhead**: Pure vanilla JS execution ensures instant page loads (<100ms TTFB).
- **GPU-accelerated CSS animations**: Clean micro-interactions utilizing `transform` and `opacity` to avoid layout reflows.
- **Zero-FOUC Guarantee**: Inline dark-mode pre-evaluation executes prior to DOM styling paint.

---

## 📬 Contact & Socials

- **Developer**: Randy Minh
- **GitHub**: [@Kaito2013](https://github.com/Kaito2013)
- **Email**: [randyminh90@gmail.com](mailto:randyminh90@gmail.com)
- **Website**: [https://kaito2013.github.io](https://kaito2013.github.io)

---

*© 2026 Randy Minh. Built with care, precision, and clean code.*
