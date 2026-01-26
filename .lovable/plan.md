

# Hero Section Cleanup Plan

## Overview
Clean up the hero section to reduce visual clutter by repositioning trust badges and removing elements that feel overwhelming.

---

## Changes to Implement

### 1. Move Trust Strip Below Quiz
**File:** `src/components/HeroSection.tsx`

**Current location:** Lines 66-76 (in left column, under the headline text)
**New location:** Below the Quiz component (replacing the urgency/Google badges)

The "Licensed & Insured" and "1-Year Warranty" trust badges will be moved from the left headline column to directly below the quiz card.

### 2. Remove Urgency and Google Rating Badges
**File:** `src/components/HeroSection.tsx`

**Remove:** Lines 89-115 (the entire "Trust badges row" div containing):
- Urgency badge ("Ends Jan 31 · 7 Spots Left")
- Google Rating badge ("4.9 ★★★★★ 50+ reviews")

These will be replaced with the simpler "Licensed & Insured" and "1-Year Warranty" badges.

### 3. Remove FAQ Section
**File:** `src/pages/Index.tsx`

**Remove:** 
- Import for FAQSection (line 9)
- Suspense wrapper and FAQSection component (lines 25-27)

---

## Visual Result

**Before:**
```text
[Left Column]              [Right Column]
- Breaking Badge           - Quiz Card
- Headline                 - Urgency Badge
- Subheadline              - Google Rating Badge
- Licensed & Insured
- 1-Year Warranty
```

**After:**
```text
[Left Column]              [Right Column]
- Breaking Badge           - Quiz Card
- Headline                 - Licensed & Insured | 1-Year Warranty
- Subheadline
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/HeroSection.tsx` | Move trust strip, remove urgency/Google badges |
| `src/pages/Index.tsx` | Remove FAQ section import and component |

---

## Technical Notes

- The trust badges will maintain the same styling (icons + text)
- Centered positioning below the quiz card
- Clean, minimal look matching the reference screenshots
- FAQ section fully removed from page flow

