# Techloom Ghana: Elite UI/UX Design System & Anti-Vibecoding Rules

This rulebook is the authoritative design standard for all human and AI agent code in this project.
It incorporates the 15 foundational design resources:
- **Playbooks**: UI Skills (`ui-skills.com`), Rauno's Web Interface Guidelines (`interfaces.rauno.me`), Design System Checklist (`designsystemchecklist.com`)
- **Tokens & Sizing**: Utopia (`utopia.fyi`), Open Props (`open-props.style`), Component Gallery (`component.gallery`), Design Systems One (`designsystems.one`)
- **Motion & Interactions**: Kinetics (`kinetics.colorion.co`), Animated Buttons (`animatedbuttons.colorion.co`), Motion Primitives (`motion-primitives.com`)
- **Components & Atmosphere**: Coss/Cal.com UI (`coss.com/ui`), ReUI/shadcn (`reui.io`), ibelick backgrounds (`bg.ibelick.com`), VibePrompts (`vibeprompts.dev`)

---

## 1. Typography & Hierarchy (Utopia + Rauno)
- **Fluid Scales**: Headings must use fluid clamp scales (e.g. `clamp(2.25rem, 4vw + 1rem, 4.5rem)`) rather than rigid device-specific jumps.
- **Tabular Figures**: Any metric, counter, date, or numeric badge must declare `font-variant-numeric: tabular-nums` (`font-mono` or `tabular-nums`) to prevent layout shifts during count-up or state changes.
- **Font Smoothing**: All text layers must inherit `-webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility;`.
- **Selection Contrast**: On gradient text, `::selection` must unset the text-fill transparent mask and render a solid, readable selection background (`selection:bg-brand-blue/20 selection:text-slate-900 dark:selection:text-white`).

## 2. Interaction & Tactile Feedback (Kinetics + Animated Buttons)
- **Spring Physics Over Easing**: Avoid linear or aggressive ease-in-out transitions on buttons. Use spring physics (`type: "spring", stiffness: 400, damping: 28`).
- **Proportional Press**: Buttons should scale to `0.97` or `0.98` on tap/click (`whileTap={{ scale: 0.97 }}`), never drastically down to `0.85` or `0.9`.
- **Micro-Interaction Polish**: High-priority CTAs should feature subtle shimmer borders or reactive glow states rather than loud blinking pulses.
- **Touch-First Guardrails**:
  - Input field font size must never be smaller than 16px (`text-base` or `text-[16px]` on mobile) to stop iOS Safari from auto-zooming on focus.
  - Hover states should not stick on mobile: always support touch interactions gracefully.
  - All interactive tap targets must be at least 44x44px.

## 3. Visual Depth & Atmosphere (ibelick + Open Props)
- **Ambient Canvases**: Use subtle SVG dot/grid patterns or radial gradient masks (`bg.ibelick.com`) instead of sterile, flat solid backgrounds.
- **Decorative Elements**: All glowing orbs, blur disks, and background gradients must explicitly include `pointer-events-none` so they never trap clicks.
- **Dark Mode Discipline**:
  - Background: Deep slate/charcoal `#0b0f19` and `#0f172a`, never pure inverted white or muddy grays.
  - Text: `#f8fafc` for titles, `#94a3b8` for body copy, maintaining WCAG AA 4.5:1 contrast.
  - Borders: Subtle translucency `rgba(255,255,255,0.08)` in dark mode and `rgba(0,0,0,0.06)` in light mode.

## 4. Layout & Information Architecture (Cal.com + VibePrompts)
- **Immediate Proof Over Text Claims**: Place client logos, delivered projects, and credibility badges directly beneath the Hero before deep scrolling.
- **No Duplicate Forms**: Do not place two contact/audit forms back-to-back. Consolidate lead generation into a single split Studio Hub & Consultation request.
- **Agency Identity Over Freelance Resumes**: Present strategic agency value pillars (Brand Architecture, Digital Engineering, Rapid Delivery, Transparent ROI) instead of candidate percentage progress bars.

## 5. Accessibility & Semantic Quality (W3C + Coss UI)
- All interactive icon-only buttons must have `aria-label`.
- All decorative icons must include `aria-hidden="true"`.
- Form inputs must be enclosed in `<form>` containers to support keyboard Enter submissions.
- Focus states must use `ring-2 ring-brand-blue ring-offset-2` rather than raw browser outlines.
