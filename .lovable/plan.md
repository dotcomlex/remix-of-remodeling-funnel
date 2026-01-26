
# Quiz Typography & Gallery Improvements

## Overview
Fix inconsistent font styles in the quiz for a cohesive, mobile-first experience, and regenerate realistic before/after kitchen renovation images with matching angles.

---

## Part 1: Quiz Typography Fixes

### Issue Analysis
Looking at the screenshot showing "What's your zip code?" - the input placeholder "Enter ZIP code" has heavy, bold text that looks out of place. The font styling across quiz steps is inconsistent.

### Changes to `src/components/Quiz.tsx`

**1. ZIP Code Input Placeholder Styling (line 452)**
- Current: `font-bold tracking-wider`
- New: `font-medium` (cleaner, matches form fields on step 5)

```tsx
// Line 452 - Current
className="pl-12 h-16 text-lg text-center rounded-2xl border-2 focus:border-primary font-bold tracking-wider"

// After
className="pl-12 h-14 text-base text-center rounded-2xl border-2 focus:border-primary font-medium"
```

**2. All Question Headlines - Lighter Weight**
Lines 291, 337, 390, 439:
- Current: `text-lg sm:text-xl font-semibold`
- New: `text-lg sm:text-xl font-medium` (lighter, more modern)

**3. Step 5 "Your ZIP Code Qualifies!" Header (line 491)**
- Current: `text-lg sm:text-2xl font-bold`
- This one is celebration, so keep bold but reduce size on mobile: `text-base sm:text-xl font-semibold`

**4. Success Screen Title (line 632)**
- Current: `text-xl sm:text-2xl font-bold`
- New: `text-lg sm:text-xl font-semibold` (consistent with rest)

**5. OptionCard Label - Already font-normal but selected state is font-medium**
This is fine, no change needed.

---

## Part 2: Gallery Before/After Images

### Problem
The AI-generated kitchen renovation images have different angles between before/after sides, making them look unrealistic.

### Solution
Regenerate 2 kitchen before/after images with these strict requirements:
- Same exact camera angle
- Same room layout
- Same perspective and focal length
- Only the finishes, appliances, and fixtures change

### AI Image Generation Prompts

**Kitchen Image 1:**
```
Professional before and after kitchen renovation photo, single split-view image. 
Left side: dated 1990s kitchen with oak cabinets, laminate countertops, beige appliances, fluorescent lighting, same exact room layout and camera angle as right side.
Right side: modern renovated kitchen with white shaker cabinets, quartz countertops, stainless steel appliances, pendant lighting.
CRITICAL: Both sides must show the SAME kitchen from the SAME camera angle, only the materials and finishes are different. Professional real estate photography style, even lighting.
```

**Kitchen Image 2:**
```
Before and after kitchen remodel comparison, single split-view photograph.
Left half: outdated galley kitchen with dark wood cabinets, old tile backsplash, dated hardware, same exact perspective as right half.
Right half: bright modern galley kitchen with light gray cabinets, subway tile backsplash, updated fixtures.
CRITICAL: Identical room, identical camera angle, identical perspective - only the renovation changes. Professional photography quality.
```

### Files to Update
- `src/assets/gallery-kitchen-1.jpg` - Replace with new realistic image
- `src/assets/gallery-kitchen-2.jpg` - Replace with new realistic image

---

## Summary of All Changes

| File | Line(s) | Change |
|------|---------|--------|
| `src/components/Quiz.tsx` | 291, 337, 390, 439 | Question headlines: `font-semibold` → `font-medium` |
| `src/components/Quiz.tsx` | 452 | ZIP input: `font-bold tracking-wider` → `font-medium`, `h-16 text-lg` → `h-14 text-base` |
| `src/components/Quiz.tsx` | 491 | Qualifies header: `text-lg sm:text-2xl font-bold` → `text-base sm:text-xl font-semibold` |
| `src/components/Quiz.tsx` | 632 | Success title: `text-xl sm:text-2xl font-bold` → `text-lg sm:text-xl font-semibold` |
| `src/assets/gallery-kitchen-1.jpg` | - | Regenerate with matching angles |
| `src/assets/gallery-kitchen-2.jpg` | - | Regenerate with matching angles |

---

## Visual Result

**Quiz - Before:**
- Heavy, bold placeholder text in ZIP input
- Inconsistent font weights across steps
- "Enter ZIP code" looks chunky and dated

**Quiz - After:**
- Clean, medium-weight fonts throughout
- Consistent typography from step 1 to success screen
- Modern, premium mobile-first feel

**Gallery - Before:**
- Kitchen before/after images have mismatched angles
- Looks fake and untrustworthy

**Gallery - After:**
- Realistic transformation photos
- Same room, same angle, only finishes changed
- Builds credibility with potential customers

---

## Technical Notes
- Font weight scale: `font-normal` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700)
- Moving from bold (700) to medium (500) creates a significant visual lightening
- Input height reduced from h-16 to h-14 for better mobile proportions
- AI image generation will use specific prompts to ensure angle matching
