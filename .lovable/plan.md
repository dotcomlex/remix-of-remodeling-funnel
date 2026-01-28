
# Add More Spacing in Hero Section

## Overview
Increase the vertical spacing between the headline, subheadline, and the quiz card to create better visual hierarchy and breathing room.

---

## File to Modify

| File | Change |
|------|--------|
| `src/components/HeroSection.tsx` | Increase spacing between elements |

---

## Change Details

**File:** `src/components/HeroSection.tsx`

### 1. Increase space-y on the headline container (line 41)
```tsx
// Before:
<div className="space-y-4 sm:space-y-5 lg:space-y-6">

// After:
<div className="space-y-6 sm:space-y-7 lg:space-y-8">
```

### 2. Increase gap between left and right columns (line 29)
```tsx
// Before:
<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">

// After:
<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-12">
```

### 3. Add more top margin to subheadline (line 55)
```tsx
// Before:
<p className="text-sm sm:text-base lg:text-lg text-white/90 max-w-lg leading-relaxed hero-text-shadow">

// After:
<p className="text-sm sm:text-base lg:text-lg text-white/90 max-w-lg leading-relaxed hero-text-shadow mt-2">
```

---

## Summary

| Element | Before | After |
|---------|--------|-------|
| Headline container spacing | `space-y-4/5/6` | `space-y-6/7/8` |
| Column gap (mobile) | `gap-4` | `gap-8` |
| Column gap (desktop) | `gap-8` | `gap-12` |
| Subheadline margin | none | `mt-2` |

This will add more breathing room between all elements, making the layout feel less cramped.
