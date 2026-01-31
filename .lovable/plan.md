

# Phase 6: CTA & FAQ Improvements

## Summary

This phase makes 4 remaining changes: update Reviews CTA text, add dynamic live badge, and replace two FAQ questions with new ones focused on service areas and design assistance.

---

## Files to Modify

| File | Action | Changes |
|------|--------|---------|
| `src/components/ReviewsSection.tsx` | MODIFY | Change CTA text to "Check Availability Now" |
| `src/pages/QualifyPage.tsx` | MODIFY | Add dynamic live count (23-28, refreshes every 8-12 sec) |
| `src/components/FAQSection.tsx` | MODIFY | Replace FAQs #4 and #5 with new questions |

---

## Already Completed (No Action Needed)

- FloatingCTA removal - Done in Phase 5
- CTA after Gallery section - Done in Phase 5 (already says "Check Availability Now")

---

## Part 1: Update Reviews Section CTA Text

### File: `src/components/ReviewsSection.tsx`

**Current (Line 223):**
```tsx
Claim Your $2,000 Discount
```

**New:**
```tsx
Check Availability Now
```

This creates consistency - both inline CTAs now say "Check Availability Now".

---

## Part 2: Dynamic Live Badge

### File: `src/pages/QualifyPage.tsx`

**Current (Lines 1-7):**
```tsx
import { useState } from "react";
import Quiz from "@/components/Quiz";
import { Shield } from "lucide-react";
import qualifyBgImage from "@/assets/14er-paper-mountain-bg.webp";

const QualifyPage = () => {
  const [quizStarted, setQuizStarted] = useState(false);
```

**New:**
```tsx
import { useState, useEffect } from "react";
import Quiz from "@/components/Quiz";
import { Shield } from "lucide-react";
import qualifyBgImage from "@/assets/14er-paper-mountain-bg.webp";

const QualifyPage = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [liveCount, setLiveCount] = useState(25);

  // Dynamic live count - changes every 8-12 seconds
  useEffect(() => {
    const updateLiveCount = () => {
      const newCount = Math.floor(Math.random() * 6) + 23; // 23-28
      setLiveCount(newCount);
    };

    const interval = setInterval(() => {
      updateLiveCount();
    }, Math.floor(Math.random() * 4000) + 8000); // 8-12 seconds

    return () => clearInterval(interval);
  }, []);
```

**Current Badge Text (Line 35):**
```tsx
12 people are checking availability right now
```

**New:**
```tsx
{liveCount} people are checking availability right now
```

This makes the badge feel more "live" and creates urgency.

---

## Part 3: Update FAQ Questions

### File: `src/components/FAQSection.tsx`

**Replace FAQ #4 (Lines 24-28):**

Current:
```tsx
{
  question: "How long does a typical remodeling project take?",
  answer:
    "Timelines vary based on project scope. Kitchen remodels typically take 4-8 weeks, bathrooms 2-4 weeks, and basements 6-10 weeks. We'll provide a detailed timeline during your consultation.",
},
```

New:
```tsx
{
  question: "What areas do you serve?",
  answer:
    "We serve major cities throughout Colorado including Denver, Boulder, Fort Collins, Colorado Springs, Aurora, Lakewood, Arvada, and surrounding areas. If you're located in Colorado, we can likely help - just enter your zip code in our qualification form to confirm.",
},
```

**Replace FAQ #5 (Lines 29-33):**

Current:
```tsx
{
  question: "Do I need to move out during the remodel?",
  answer:
    "Most homeowners stay in their homes during remodeling. We work to minimize disruption, maintain clean work areas, and coordinate schedules to keep your daily life as normal as possible.",
},
```

New:
```tsx
{
  question: "Can you help with design and material selection?",
  answer:
    "Absolutely! During your free consultation, we'll provide design recommendations, show you material samples, and help you choose options that fit your style and budget. We can also create mockup designs so you can see exactly how your project will look before we start. We'll guide you through every decision to ensure you love the final result.",
},
```

---

## Visual Comparison

### Reviews Section CTA - Before vs After

**BEFORE:**
```text
[Claim Your $2,000 Discount →]
```

**AFTER:**
```text
[Check Availability Now →]
```

### Live Badge - Before vs After

**BEFORE:**
```text
🔴 12 people are checking availability right now
(Static - never changes)
```

**AFTER:**
```text
🔴 27 people are checking availability right now
(Dynamic - changes to random 23-28 every 8-12 seconds)
```

### FAQ Section - Before vs After

**BEFORE:**
```text
4. How long does a typical remodeling project take?
5. Do I need to move out during the remodel?
```

**AFTER:**
```text
4. What areas do you serve?
5. Can you help with design and material selection?
```

---

## Verification Checklist

### ReviewsSection.tsx
- [ ] CTA text changed from "Claim Your $2,000 Discount" to "Check Availability Now"

### QualifyPage.tsx
- [ ] Added useEffect import
- [ ] Added liveCount state (initial: 25)
- [ ] Added useEffect for random interval updates
- [ ] Badge displays dynamic {liveCount} instead of static "12"
- [ ] Count changes every 8-12 seconds
- [ ] Range is 23-28

### FAQSection.tsx
- [ ] FAQ #4 replaced with "What areas do you serve?"
- [ ] FAQ #5 replaced with "Can you help with design and material selection?"
- [ ] Mentions mockup designs in the design FAQ answer

