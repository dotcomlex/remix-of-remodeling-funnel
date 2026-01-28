

# Quiz Subheadline Update

## Overview
Update the contact form subheadline to be more engaging and highlight the full offer value.

---

## File to Modify

| File | Change |
|------|--------|
| `src/components/Quiz.tsx` | Update subheadline text on Step 5 |

---

## Change Details

**File:** `src/components/Quiz.tsx` (lines 504-506)

```tsx
// Before:
<p className="text-sm text-muted-foreground leading-snug max-w-sm mx-auto">
  Complete the form below so we can contact you and schedule your 100% free estimate.
</p>

// After:
<p className="text-sm text-muted-foreground leading-snug max-w-sm mx-auto">
  Trusted by Colorado homeowners for kitchens, bathrooms, basements, and much more. Answer the questions below to receive your free estimate, free consultation + $2,000 Off!
</p>
```

---

## Webhook Status

The webhook payload is already clean:
- Phone stripped to digits only (no formatting characters)
- Human-readable labels for project type, timeline, and budget
- Dual payload format for maximum GHL compatibility
- No unnecessary or weird data

