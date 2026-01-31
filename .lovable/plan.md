

# Phase 3: Text Visibility and Contrast Fixes

## Summary

This phase addresses critical visibility issues where text is hard to read on bright backgrounds. The new golden-hour mountain hero image provides better natural contrast, and we'll strengthen shadows, add overlays, and improve the qualify page contrast.

---

## Files to Modify

| File | Action | Changes |
|------|--------|---------|
| `src/assets/14er-mountain-hero.webp` | CREATE | Copy uploaded golden-hour mountain image |
| `src/components/HeroSection.tsx` | MODIFY | New background, update subheadline text |
| `src/pages/QualifyPage.tsx` | MODIFY | Dark overlay, prominent badge, solid quiz card |
| `src/index.css` | MODIFY | Strengthen text shadow even more |

---

## Part 1: Hero Section Fixes

### 1.1 Replace Background Image

The new golden-hour mountain image has dramatic lighting with darker tones in the sky and forest - perfect for white text visibility.

**Current Import (Line 3):**
```tsx
import heroImage from "@/assets/hero-mountains-daylight.png";
```

**New Import:**
```tsx
import heroImage from "@/assets/14er-mountain-hero.webp";
```

### 1.2 Strengthen Text Shadow Even More

**Current CSS (Lines 219-224):**
```css
.hero-text-shadow-strong {
  text-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.8),
    0 4px 8px rgba(0, 0, 0, 0.6),
    0 8px 16px rgba(0, 0, 0, 0.4);
}
```

**New CSS (Maximum Visibility):**
```css
.hero-text-shadow-strong {
  text-shadow: 
    0 1px 2px rgba(0, 0, 0, 1),
    0 3px 6px rgba(0, 0, 0, 0.95),
    0 6px 12px rgba(0, 0, 0, 0.8),
    0 12px 24px rgba(0, 0, 0, 0.6);
}
```

This adds a near-black base shadow with 100% opacity for maximum contrast.

### 1.3 Update Subheadline Text

**Current (Line 51-52):**
```tsx
Only a few spots are left. Fill this quick form to see if you qualify...
```

**New:**
```tsx
Only a few spots are left. Click the button below to see if you qualify...
```

Change: "Fill this quick form" to "Click the button below"

---

## Part 2: Qualify Page Contrast Fixes

### 2.1 Add Dark Overlay to Background

**Current (Lines 9-14):**
```tsx
<div className="fixed inset-0 z-0">
  <img 
    src={qualifyBgImage} 
    alt="" 
    className="w-full h-full object-cover"
  />
</div>
```

**New (with dark gradient overlay):**
```tsx
<div className="fixed inset-0 z-0">
  <img 
    src={qualifyBgImage} 
    alt="" 
    className="w-full h-full object-cover"
  />
  {/* Dark overlay for better contrast */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />
</div>
```

### 2.2 Make Live Activity Badge MORE Prominent

**Current (Lines 25-31):**
```tsx
<div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-full mb-4 shadow-md">
```

**New (Bright & Bold):**
```tsx
<div className="inline-flex items-center gap-2 bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full mb-4 shadow-xl border-2 border-white/50">
```

Changes:
- Solid emerald-500 background (not transparent white)
- White text (not emerald text)
- font-bold (not font-medium)
- Larger padding (px-4 py-2)
- Stronger shadow (shadow-xl)
- White border for extra pop

### 2.3 Strengthen Headline & Subheadline

**Current (Lines 32-37):**
```tsx
<h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
  Check Availability
</h1>
<p className="text-sm text-muted-foreground">
  Takes less than 30 seconds to complete
</p>
```

**New (Maximum Contrast):**
```tsx
<h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
  Check Availability
</h1>
<p className="text-sm sm:text-base font-medium text-slate-700">
  Takes less than 30 seconds to complete
</p>
```

Changes:
- Headline: Larger (text-2xl/3xl), font-extrabold, explicit text-slate-900
- Subheadline: Responsive size, font-medium, darker text-slate-700

### 2.4 Strengthen Footer Contrast

**Current (Line 46):**
```tsx
<footer className="w-full py-4 px-4 bg-white/50 backdrop-blur-sm">
```

**New:**
```tsx
<footer className="w-full py-4 px-4 bg-white/80 backdrop-blur-sm border-t border-slate-200">
```

---

## Visual Comparison

### Hero Section - Before vs After

**BEFORE:**
```text
[BRIGHT BLUE SKY BACKGROUND]
White text with moderate shadow
(hard to read in places)
"Fill this quick form..."
```

**AFTER:**
```text
[GOLDEN-HOUR MOUNTAIN PEAKS - dramatic dark/warm tones]
White text with MAXIMUM shadow (near-black base)
(100% readable everywhere)
"Click the button below..."
```

### Qualify Page - Before vs After

**BEFORE:**
```text
[Soft misty background - no overlay]
→ Pale badge (white bg, green text)
→ Light headline (text-foreground)
→ Everything blends together
```

**AFTER:**
```text
[Soft misty background + DARK GRADIENT OVERLAY]
→ BRIGHT GREEN badge (emerald-500, white text, white border)
→ BOLD headline (text-slate-900, font-extrabold)
→ Maximum contrast throughout
```

---

## Implementation Details

### CSS Changes (src/index.css, Lines 219-224)

Replace the existing `.hero-text-shadow-strong` with maximum visibility version:
- 4-layer shadow stack
- Base layer at 100% opacity
- Creates a near-black outline effect

### HeroSection.tsx Changes

1. Line 3: Update import to new webp image
2. Line 52: Change "Fill this quick form" to "Click the button below"

### QualifyPage.tsx Changes

1. Lines 9-14: Add dark gradient overlay after background image
2. Line 25: Replace badge classes with bold emerald styling
3. Lines 32-37: Update headline/subheadline with stronger colors
4. Line 46: Strengthen footer background

---

## Verification Checklist

### Hero Section
- [ ] New golden-hour mountain image loaded
- [ ] Text has maximum contrast shadow
- [ ] Subheadline says "Click the button below"
- [ ] Text 100% readable on mobile

### Qualify Page
- [ ] Dark gradient overlay on background
- [ ] Live badge: bright emerald with white text
- [ ] Headline: text-2xl/3xl, font-extrabold, text-slate-900
- [ ] Subheadline: font-medium, text-slate-700
- [ ] Footer has stronger contrast

