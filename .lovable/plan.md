

# Replace Gallery Images and Update Headline

## Overview
Replace all existing gallery images with the 5 new optimized before/after renovation photos and update the headline to be more casual and conversational.

---

## Changes to Implement

### 1. Copy New Images to Assets
Copy the 5 uploaded images to `src/assets/`:

| Source | Destination |
|--------|-------------|
| `user-uploads://hf_20260127_001940_899810da-cdba-4539-aa6d-ed190b6550e9_hq.webp` | `src/assets/gallery-kitchen-modern.webp` |
| `user-uploads://hf_20260127_002141_4ccbf707-d756-4fc9-b28a-849a382ea901_hq.webp` | `src/assets/gallery-kitchen-navy.webp` |
| `user-uploads://hf_20260127_002539_90e87584-ac80-4d30-b19e-7bbe64765f4b_hq.webp` | `src/assets/gallery-kitchen-dark.webp` |
| `user-uploads://hf_20260127_002813_b57e7e03-0a0c-4ff0-b6a3-fea0f0fb3dc6_hq.webp` | `src/assets/gallery-kitchen-white.webp` |
| `user-uploads://hf_20260127_002848_3367236f-b195-4169-9c52-8de0b11d5491_hq.webp` | `src/assets/gallery-bathroom-spa.webp` |

---

### 2. Update GallerySection.tsx

**File:** `src/components/GallerySection.tsx`

**Update imports (lines 5-12):**

Remove old imports:
```tsx
import bathroomReno1 from "@/assets/gallery-bathroom-1.png";
import bathroomReno2 from "@/assets/gallery-bathroom-2.png";
import bathroomReno3 from "@/assets/gallery-bathroom-3.png";
import kitchenReno1 from "@/assets/gallery-kitchen-1.jpg";
import kitchenReno2 from "@/assets/gallery-kitchen-2.jpg";
```

Add new imports:
```tsx
import galleryKitchenModern from "@/assets/gallery-kitchen-modern.webp";
import galleryKitchenNavy from "@/assets/gallery-kitchen-navy.webp";
import galleryKitchenDark from "@/assets/gallery-kitchen-dark.webp";
import galleryKitchenWhite from "@/assets/gallery-kitchen-white.webp";
import galleryBathroomSpa from "@/assets/gallery-bathroom-spa.webp";
```

---

**Update projects array (lines 17-23):**

```tsx
const projects = [
  { image: galleryKitchenModern, alt: "Kitchen renovation before and after with modern wood cabinets" },
  { image: galleryKitchenNavy, alt: "Kitchen transformation with navy blue cabinets and marble backsplash" },
  { image: galleryKitchenDark, alt: "Small kitchen remodel with dark modern cabinets" },
  { image: galleryKitchenWhite, alt: "Full kitchen renovation with white shaker cabinets" },
  { image: galleryBathroomSpa, alt: "Bathroom before and after with spa-like marble shower" },
];
```

---

**Update headline (lines 40-49):**

Current:
```tsx
<span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
  Transformations
</span>
<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
  Real Colorado <span className="text-primary">Transformations</span>
</h2>
```

New (more casual):
```tsx
<span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
  Our Work
</span>
<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
  Take a Look at Our <span className="text-primary">Recent Projects</span>
</h2>
```

Keep the subheadline as-is:
```tsx
<p className="text-base text-muted-foreground max-w-xl mx-auto">
  See what's possible — kitchens, bathrooms, basements, and more
</p>
```

---

## Summary

| Element | Before | After |
|---------|--------|-------|
| Tag line | "Transformations" | "Our Work" |
| Headline | "Real Colorado Transformations" | "Take a Look at Our Recent Projects" |
| Subheadline | Keep as-is | Keep as-is |
| Images | 5 old images (3 bathroom, 2 kitchen) | 5 new optimized webp images |
| Image format | Mixed .png/.jpg | All .webp (optimized) |

---

## Technical Notes

- New images are in webp format for better compression and loading performance
- Images are all before/after kitchen and bathroom renovations
- Alt text updated to be descriptive of each specific transformation
- No structural changes to the carousel component itself

