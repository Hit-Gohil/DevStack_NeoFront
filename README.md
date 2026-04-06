# Lumina — Scroll-Storytelling Dev Showcase Platform

## Team Name
NeoFront

## Team Members
- Jaivin Tretiya (Team Leader)
- Hit Gohil
- Paras Khetiya
- Kunj Paghdal
- Anshumaa

## Idea Chosen
Custom: Lumina — Scroll-Storytelling Dev Showcase Platform

---

## Problem Statement

Most developer portfolios are static, forgettable, and fail to capture the
personality behind the work. There is no platform that lets developers present
themselves in a truly cinematic, interactive way.

Lumina solves this by giving every developer a scroll-driven, animated showcase
page — inspired by the experience of Apple and MetaMask websites. Projects reveal
themselves on scroll, skills animate into view, and timelines scrub as you move
through the page. The result is a profile that people actually remember.

---

## Core Features

| Feature | Description |
|---|---|
| Cinematic hero section | Animated headline, particle background, smooth entrance sequence |
| Scroll-driven animations | Every section animates on scroll — stagger reveals, pin effects, scrub |
| Project showcase | Animated project cards with tech tags, descriptions, and live links |
| Skills visualisation | Radar chart that draws itself into view as the user scrolls |
| Interactive timeline | Pinned horizontal scroll timeline for project and work history |
| Live profile editor | Edit mode to update bio, projects, and skills — saved locally |
| Theme engine | Dark / light mode with accent colour options |
| Fully responsive | Works across all screen sizes; animations adapt for mobile |

---

## Tech Stack

- **React 18** + **Vite**
- **Redux Toolkit** — global state management
- **GSAP** + **ScrollTrigger** — all scroll and entrance animations
- **Recharts** — animated radar chart for skills section
- **React Router v6** — client-side routing
- **Tailwind CSS** — styling
- **localStorage** — profile data persistence (no backend required)
- **Vercel** — deployment

---

## State Management (Redux)

The app uses four Redux slices, each with a clear and specific responsibility:

- **themeSlice** — manages dark/light mode, accent colour, and animation speed preference
- **profileSlice** — stores all user content (name, bio, projects, skills, social links) and persists it to localStorage automatically
- **sceneSlice** — tracks which section is currently in view and overall scroll progress, used by the navigation indicator
- **editorSlice** — controls whether edit mode is active and the drag-and-drop ordering of sections

---

## Implementation Approach

### Animation System
All animations are scroll-triggered and scoped to their own components so they are easy to manage and explain. A global animation speed setting from Redux scales every animation's duration. Animations are disabled automatically for users who have reduced motion enabled in their OS settings.

### Hero Section
The hero loads a sequenced animation timeline — background fades in first, then the headline letters stagger in, followed by the subtitle and call-to-action button. A custom cursor glow effect follows the mouse with a smooth lag.

### Project Cards
Cards are revealed with a staggered entrance as the user scrolls into the projects section. Each card lifts on hover to show additional project details.

### Skills Radar
A Recharts RadarChart animates into view on scroll. Skill data is pulled directly from Redux profileSlice, so updating skills in the editor instantly reflects in the chart.

### Timeline
The timeline section pins to the viewport while the user scrolls through it, creating a horizontal scrub effect. Each milestone appears progressively as scroll progress advances.

### Profile Persistence
A custom Redux middleware listens to every profileSlice action and writes the updated state to localStorage. On app load, the store is hydrated from localStorage if data exists — making the profile feel persistent without any backend or database.

---
