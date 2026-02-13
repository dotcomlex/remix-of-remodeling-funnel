

# Quiz Page Optimization - 3 Changes

## Summary

Three targeted updates to the quiz funnel page to improve conversion: a new benefit-driven headline, repositioned social proof badge, and polished success screen copy.

---

## Change 1: Update Headline and Subheadline

**File:** `src/pages/QualifyPage.tsx` (lines 55-61)

**Current:**
```
See If You Qualify for the
Winter Upgrade Program
Takes less than 30 seconds
```

**New:**
```
Colorado Homeowners: Save $2,000 On Your Remodeling Project - Limited Spots Available!

LIMITED SPOTS AVAILABLE. Fill this quick form to see if you qualify for a FREE estimate and $2,000 off your remodeling project.
```

**Details:**
- Headline gets larger responsive sizing (`text-xl sm:text-3xl lg:text-4xl`, `font-extrabold`)
- Subheadline includes red "LIMITED SPOTS AVAILABLE" text for urgency
- Subheadline matches the proven lead form copy that generated 72 leads
- Removes outdated "Winter Upgrade Program" reference

---

## Change 2: Move Live Viewers Badge Below Quiz

**File:** `src/pages/QualifyPage.tsx` (lines 43-50, 67)

- Remove the orange badge from above the headline (lines 43-50)
- Add it below the `<Quiz />` component instead

This improves visual hierarchy: users read the headline first, then engage with the quiz, then see social proof as reinforcement.

---

## Change 3: Update ZIP Qualification Success Screen

**File:** `src/components/Quiz.tsx` (lines 719-725)

**Current:**
```
Congrats! Your Area (80202) Qualifies!
Enter your info below to claim your free consultation and lock in your $2,000 discount.
```

**New:**
```
Great News! Your Zip Code Qualifies!
Complete the form below to get your FREE estimate and $2,000 discount.
```

- More professional tone ("Great News" vs "Congrats")
- Removes displaying the raw ZIP code
- "Complete the form below" is a clearer directive
- "FREE estimate" matches lead form language
- Removes "lock in" (too salesy)

---

## Files Modified

| File | Changes |
|------|---------|
| `src/pages/QualifyPage.tsx` | New headline, new subheadline, badge moved below quiz |
| `src/components/Quiz.tsx` | Updated success screen copy |

---

## Testing Checklist

- [ ] Headline reads clearly on mobile and desktop
- [ ] "LIMITED SPOTS AVAILABLE" appears in red
- [ ] Live viewers badge appears below the quiz card, not above headline
- [ ] Badge still animates with pulsing dot
- [ ] After entering a valid ZIP, success message says "Great News! Your Zip Code Qualifies!"
- [ ] Success message mentions "FREE estimate and $2,000 discount"

