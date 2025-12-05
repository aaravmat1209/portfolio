# Theme Update: Lavender & Obsidian

## Summary
Updated the website's visual identity with a modern, elegant, and aesthetic "Lavender & Obsidian" theme, replacing the previous "Neon Cyan & Dark" look. Also updated the font to Geist by Vercel.

## Changes Made

### 1. **Typography**
- **Font**: Replaced `Work Sans` with `Geist Sans` and `Geist Mono`.
- **Why**: Geist is a modern, geometric sans-serif designed for readability and aesthetics, perfect for a tech portfolio.

### 2. **Color Palette**
- **Background**: `#030014` (Deep Space Indigo) - A rich, deep dark background that feels more premium than pure black.
- **Surface**: `#0F0B1E` (Darker Indigo) - Used for cards and sections to provide subtle contrast.
- **Primary Accent**: `#B4A0E5` (Muted Lavender) - Replaces the harsh Neon Cyan. It's elegant, soft, yet distinct.
- **Secondary Accent**: `#E5B4B4` (Dusty Rose) - Adds warmth and sophistication to gradients.
- **Deep Accent**: `#7D7AFF` (Deep Indigo) - Used for stronger emphasis and hover states.
- **Text**: `#E2E8F0` (Slate 200) - Soft white for comfortable reading.
- **Muted Text**: `#94A3B8` (Slate 400) - For secondary information.

### 3. **Component Updates**
- **Global CSS**: Defined new CSS variables for the theme.
- **Content Page**: Updated all hardcoded hex values to use CSS variables (`var(--primary)`, `var(--background)`, etc.).
- **Timeline**: Updated to match the new lavender/indigo theme.
- **Dock**: Updated navigation bar to blend seamlessly with the new aesthetic.

## Visual Impact
- **Elegant & Modern**: The new palette feels much more sophisticated and "aesthetic" compared to the standard "gamer" neon look.
- **Better Readability**: The contrast is softer on the eyes while maintaining a dark mode appeal.
- **Cohesive Design**: All components now share the same unified color system via CSS variables.

## Files Modified
- `/src/app/layout.tsx` (Font update)
- `/src/app/globals.css` (Theme variables)
- `/src/app/content/page.tsx` (Color updates)
- `/src/components/Timeline.tsx` (Color updates)
- `/src/components/Dock.tsx` (Color updates)

## Result
✨ **A stunning, modern, and elegant portfolio with a unique "Lavender & Obsidian" aesthetic.**
