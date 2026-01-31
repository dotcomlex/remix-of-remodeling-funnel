

# Complete Homepage + Qualify Page + Quiz Fixes

## Summary

This update implements the final set of copy and layout changes:
1. **Homepage Hero**: Replace two-column layout with centered single-column design
2. **Qualify Page**: Update headline and increase live activity count
3. **Quiz Component**: Update budget subtext and ensure all language is consistent

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/HeroSection.tsx` | Replace two-column layout with centered single-column, update all copy |
| `src/pages/QualifyPage.tsx` | Update headline to "Check Availability", increase live count to 12, update subtext |
| `src/components/Quiz.tsx` | Update budget question subtext |

---

## Part 1: HeroSection.tsx - Complete Restructure

### Current Structure (Two-Column)
```text
[Logo centered]
[Left Column: Headline/Subheadline] | [Right Column: CTA Card]
[Trust Strip below right column]
```

### New Structure (Single-Column Centered)
```text
[Logo centered]
[Headline centered]
[Subheadline centered]
[CTA Card centered]
[Trust Strip centered below]
```

### Copy Changes

| Element | Current | New |
|---------|---------|-----|
| Headline | "Save $2,000 On Your Kitchen, Bathroom, Or Any Remodeling Project" | "This New Winter Upgrade Program Helps Colorado Homeowners Save $2,000 on their remodel" |
| Subheadline | "Fill this quick form to see if you qualify for a free consultation and $2,000 off any remodeling project." | "Only a few spots are left. Fill this quick form to see if you qualify for a FREE consultation and $2,000 off your project!" |
| CTA Card Heading | "Save $2,000 On Your Remodel" | "Check Availability" |
| CTA Card Subtext | "See if you qualify for a free consultation and $2,000 off any remodeling project." | "Takes less than 30 seconds to complete" |
| Button Text | "Check Availability" | "Check Availability Now" |
| Trust Indicator | "60 seconds or less" | "30 seconds" |

### Elements to Remove
- "LIMITED SPOTS AVAILABLE" badge below headline
- "LIMITED SPOTS" badge inside CTA card
- Two-column flex layout (`lg:flex-row lg:items-start lg:justify-between`)

### Structural Changes
- Remove left/right column wrappers
- Wrap everything in `max-w-3xl mx-auto` centered container
- Add `text-center` to headline section
- Center the CTA card with `flex justify-center`
- Adjust padding: `py-6 lg:py-12`
- Adjust logo margin: `mb-6 lg:mb-8`
- Logo size: `h-20 sm:h-28 lg:h-40` (slightly smaller than lg:h-44)

---

## Part 2: QualifyPage.tsx - Headline Updates

### Changes

| Element | Current | New |
|---------|---------|-----|
| Live Activity Count | "8 people" | "12 people" |
| Headline | "Save $2,000 On Your Remodel" | "Check Availability" |
| Subheadline | "Answer a few quick questions to see if you qualify" | "Takes less than 30 seconds to complete" |

### Lines Affected
- Line 36: Activity count text
- Line 38-40: h1 headline
- Line 41-43: p subheadline

---

## Part 3: Quiz.tsx - Budget Subtext Update

### Change

| Element | Current (Line 573-574) | New |
|---------|------------------------|-----|
| Budget Subtext | "(This won't affect your pricing—it just helps us prepare the right options for you)" | "(This helps us prepare the right options for you)" |

This simplifies the copy to match the user's instructions.

---

## Visual Comparison

### Homepage Hero - Before
```text
┌─────────────────────────────────────────────────┐
│                    [LOGO]                       │
├───────────────────────┬─────────────────────────┤
│  Save $2,000 On Your  │   ┌─────────────────┐  │
│  Kitchen, Bathroom... │   │ LIMITED SPOTS   │  │
│                       │   │ Save $2,000...  │  │
│  [LIMITED SPOTS]      │   │                 │  │
│                       │   │ [Check Avail]   │  │
│  Fill this quick form │   │                 │  │
│  to see if you qual.. │   │ 60s | 100+      │  │
│                       │   └─────────────────┘  │
│                       │  Licensed | Warranty   │
└───────────────────────┴─────────────────────────┘
```

### Homepage Hero - After
```text
┌─────────────────────────────────────────────────┐
│                    [LOGO]                       │
│                                                 │
│      This New Winter Upgrade Program Helps      │
│    Colorado Homeowners Save $2,000 on their     │
│                    remodel                      │
│                                                 │
│        Only a few spots are left. Fill this     │
│        quick form to see if you qualify...      │
│                                                 │
│            ┌─────────────────────┐              │
│            │  Check Availability │              │
│            │  Takes less than    │              │
│            │  30 seconds         │              │
│            │                     │              │
│            │ [Check Avail Now]   │              │
│            │                     │              │
│            │  30s  |  100+       │              │
│            └─────────────────────┘              │
│                                                 │
│         Licensed & Insured | 1-Year Warranty    │
└─────────────────────────────────────────────────┘
```

---

## Implementation Details

### HeroSection.tsx Changes

**Lines 25-123** - Replace entire content div with new centered layout:

1. Adjust outer container padding to `py-6 lg:py-12`
2. Update logo container margin to `mb-6 lg:mb-8`
3. Reduce logo size to `lg:h-40` from `lg:h-44`
4. Remove the `flex flex-col lg:flex-row...` wrapper (line 36)
5. Replace with single centered container `max-w-3xl mx-auto`
6. Add centered headline section with new copy
7. Add centered CTA card section with new copy
8. Add centered trust strip at bottom

### QualifyPage.tsx Changes

**Lines 29-43** - Update the headline section:

1. Line 36: Change "8 people" to "12 people"
2. Lines 38-40: Change h1 from "Save $2,000 On Your Remodel" to "Check Availability"
3. Lines 41-43: Change p from "Answer a few quick questions..." to "Takes less than 30 seconds to complete"

### Quiz.tsx Changes

**Lines 573-574** - Update budget subtext:

1. Change from "(This won't affect your pricing—it just helps us prepare the right options for you)"
2. To: "(This helps us prepare the right options for you)"

---

## Verification Checklist

### Homepage
- [ ] Logo centered at top
- [ ] Headline: "This New Winter Upgrade Program Helps Colorado Homeowners Save $2,000 on their remodel"
- [ ] Subheadline: "Only a few spots are left..."
- [ ] CTA card centered below (NOT side-by-side)
- [ ] CTA card heading says "Check Availability"
- [ ] CTA card subtext says "Takes less than 30 seconds to complete"
- [ ] Button says "Check Availability Now"
- [ ] Trust indicators show "30 seconds" and "100+ qualified"
- [ ] NO two-column layout
- [ ] NO "LIMITED SPOTS" badges

### Qualify Page
- [ ] Live activity: "12 people are checking availability right now"
- [ ] Headline: "Check Availability"
- [ ] Subheadline: "Takes less than 30 seconds to complete"
- [ ] NO "$2,000" mention in headline

### Quiz
- [ ] Budget has only 4 options (already done)
- [ ] Budget subtext: "(This helps us prepare the right options for you)"
- [ ] Timeline clarification says "Quick Question" (already done)
- [ ] Timeline disqualification has single "Back to Home" button (already done)
- [ ] Contact form shows actual ZIP code (already done)

