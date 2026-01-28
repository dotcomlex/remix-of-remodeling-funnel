
# Add Hero Image Background to Testimonials Section

## Overview
Replace the current dark gradient background of the testimonials section with the hero image (`hero-colorado-home.png`), adding a dark overlay to ensure all text remains readable.

---

## File to Modify

| File | Change |
|------|--------|
| `src/components/ReviewsSection.tsx` | Add hero image background with overlay |

---

## Implementation Details

### 1. Import the hero image (line 2)

```tsx
import heroImage from "@/assets/hero-colorado-home.png";
```

### 2. Update the section structure (line 124)

Replace the simple section with a relative positioned section containing the background image and overlay:

```tsx
// Before:
<section className="py-16 lg:py-24 section-gradient-dark">
  <div className="container mx-auto px-4">

// After:
<section className="py-16 lg:py-24 relative overflow-hidden">
  {/* Background image with overlay */}
  <div className="absolute inset-0">
    <img 
      src={heroImage} 
      alt="" 
      className="w-full h-full object-cover"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-black/75" />
  </div>
  
  <div className="relative z-10 container mx-auto px-4">
```

### 3. Close the wrapper div properly (line 197)

```tsx
// Before:
      </div>
    </section>

// After:
      </div>
    </div>
  </section>
```

---

## Visual Result

| Element | Before | After |
|---------|--------|-------|
| Background | Dark gradient (`section-gradient-dark`) | Hero image with 75% dark overlay |
| Text visibility | White text on dark | White text on dark overlay (fully readable) |
| Image | None | Same Colorado home image from hero |

---

## Key Details

- **Overlay opacity**: Using `bg-black/75` (75% black) ensures strong contrast for white text
- **Image loading**: Set to `lazy` since it's below the fold
- **Alt text**: Empty since it's decorative
- **z-index**: Content uses `z-10` to sit above the background layer
