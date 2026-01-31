
# Smart Qualification Quiz + Two-Page Architecture

## Overview

This is a major architectural change that transforms the quiz flow from an embedded component to a dedicated qualification page, adds smart timeline filtering, and brings back budget range questions with proper value thresholds.

---

## Architecture Changes

### Current Structure
```text
/ (Index)
├── HeroSection (contains embedded Quiz)
├── TrustBadgesSection
├── GallerySection
├── ReviewsSection
└── Footer
```

### New Structure
```text
/ (Index - Landing Page)
├── HeroSection (CTA button → links to /qualify)
├── TrustBadgesSection
├── GallerySection
├── ReviewsSection
└── Footer

/qualify (Quiz-Only Page)
├── Simple Header (logo + back link)
├── Quiz Component (full focus, no distractions)
└── Minimal Footer
```

---

## New Quiz Flow (5 Questions + Smart Clarification)

| Step | Question | Options | Logic |
|------|----------|---------|-------|
| 1 | Project Type | Kitchen / Bath / Both / Other | Auto-advance |
| 2 | Timeline | ASAP / 30 days / 1-2 months / Not sure | If "Not sure" → Clarification screen |
| 2b | Clarification | "Start within 60 days?" Yes/No | Yes → Continue, No → Disqualify |
| 3 | Budget Range | $10-20K / $20-40K / $40-60K / $60K+ / Not sure | Auto-advance |
| 4 | ZIP Code | Colorado validation | Manual continue |
| 5 | Contact | Name + Phone + Email | Submit |

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/pages/QualifyPage.tsx` | CREATE | New quiz-only page |
| `src/App.tsx` | MODIFY | Add /qualify route |
| `src/components/HeroSection.tsx` | MODIFY | Replace Quiz with CTA button |
| `src/components/Quiz.tsx` | MODIFY | Add timeline clarification + update budget options |
| `src/components/FloatingCTA.tsx` | MODIFY | Link to /qualify instead of scroll |

---

## Technical Implementation Details

### 1. Create QualifyPage.tsx (NEW FILE)

A dedicated page with:
- Simple header with logo and "Back to Home" link
- Clean white/gray background (no hero image)
- Centered Quiz component with heading
- Minimal footer with security note

### 2. Update App.tsx

Add the new route:
```tsx
import QualifyPage from "./pages/QualifyPage";

<Route path="/qualify" element={<QualifyPage />} />
```

### 3. Update HeroSection.tsx

Replace the embedded `<Quiz />` with a CTA card:
- "See If You Qualify" heading
- Subtext explaining the 5-question quiz
- "Start Qualification Quiz" button linking to /qualify
- Trust indicators (60 seconds, 100+ homeowners)
- Keep the trust strip below

### 4. Update Quiz.tsx - Timeline Clarification

Add new state:
```tsx
const [needsTimelineClarification, setNeedsTimelineClarification] = useState(false);
const [timelineDisqualified, setTimelineDisqualified] = useState(false);
```

Modify timeline auto-advance logic:
- If user selects "Not sure" → Show clarification screen
- Clarification offers two options:
  - "Yes, I want to start within 60 days" → Continue to budget
  - "No, I'm planning further out" → Show timeline disqualification

### 5. Update Quiz.tsx - Budget Options

Replace current yes/no budget with specific ranges:
- $10,000 - $20,000
- $20,000 - $40,000
- $40,000 - $60,000
- $60,000+
- Not sure / Need guidance

Update `getBudgetLabel()` helper and webhook payload accordingly.

### 6. Add Timeline Disqualification Screen

New screen for users who are planning too far out:
- "We're Booking Soon!" heading
- Friendly message about 60-day focus
- Action items: Save phone, bookmark site
- Links to Gallery and Reviews sections

### 7. Update FloatingCTA.tsx

Change from scrolling to quiz to navigating:
```tsx
import { Link } from "react-router-dom";

<Link to="/qualify">
  <Button variant="cta">Claim $2,000 Discount</Button>
</Link>
```

---

## Disqualification Screens Summary

| Scenario | Screen | Message |
|----------|--------|---------|
| ZIP not in Colorado | "We Only Serve Colorado" | Existing - keep as-is |
| Timeline too far out | "We're Booking Soon!" | New - friendly, keeps door open |

---

## Webhook Payload Update

New budget_range values in payload:
```tsx
const getBudgetLabel = (budget: string): string => {
  switch (budget) {
    case "10-20k": return "$10,000 - $20,000";
    case "20-40k": return "$20,000 - $40,000";
    case "40-60k": return "$40,000 - $60,000";
    case "60k+": return "$60,000+";
    case "not-sure": return "Not sure / Need guidance";
    default: return "";
  }
};
```

---

## User Experience Flow

### Happy Path
1. User lands on homepage → Sees CTA "See If You Qualify"
2. Clicks button → Taken to /qualify page
3. Answers 5 questions → Submits form
4. Sees success screen with next steps

### Timeline Clarification Path
1. User selects "Not sure" on timeline
2. Sees clarification: "We're booking within 60 days"
3. Option A: "Yes, continue" → Proceeds to budget
4. Option B: "No, planning further" → Friendly disqualification with helpful links

### Out-of-State Path
1. User enters non-Colorado ZIP
2. Sees "We Only Serve Colorado" (existing behavior)

---

## Benefits of This Approach

1. **Focused conversion** - Quiz page has zero distractions
2. **Quality filtering** - Timeline clarification weeds out tire-kickers gracefully
3. **Budget qualification** - Ranges starting at $10K filter low-value leads
4. **Professional UX** - Two-page structure like HomeBuddy and other lead gen sites
5. **Mobile optimized** - Clean, fast-loading quiz page
6. **Door stays open** - Disqualified users get helpful next steps, may return later

