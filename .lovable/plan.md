

# Update Hero Headline Text

## Summary

Update the hero headline to new copy that emphasizes the program benefits for kitchen and bath remodels.

---

## Change

**File:** `src/components/HeroSection.tsx` (line 47-49)

**Current:**
```tsx
<h1 className="sm:text-3xl lg:text-4xl font-extrabold text-white leading-snug hero-text-shadow-strong mb-8 text-2xl">
  Attention Colorado Homeowners: This New Winter Program Helps You Save Over{" "}
  <span className="text-highlight">$2,000</span> On Your Remodeling Project
</h1>
```

**New:**
```tsx
<h1 className="sm:text-3xl lg:text-4xl font-extrabold text-white leading-snug hero-text-shadow-strong mb-8 text-2xl">
  This New Program Is Helping Colorado Homeowners Save{" "}
  <span className="text-highlight">$2,000+</span> On Kitchen And Bath Remodels
</h1>
```

**What changed:**
- Removed "Attention Colorado Homeowners:" opener
- Changed "Winter Program Helps You Save Over" to "Program Is Helping Colorado Homeowners Save"
- Changed "$2,000" to "$2,000+" (added plus sign)
- Changed "On Your Remodeling Project" to "On Kitchen And Bath Remodels"

---

## Testing Checklist

- [ ] Headline displays correctly on mobile
- [ ] "$2,000+" is highlighted in the accent color
- [ ] Text is readable against the dark background
- [ ] Spacing between headline and subheadline is maintained

