

# Quiz Contact Form & Reviews Section Updates

## Overview
Improve the final quiz step (contact form) with more engaging copy and better UX for the phone field, plus remove the star rating tagline from the reviews section.

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/Quiz.tsx` | Update headline, subheadline, name field, phone field helper |
| `src/components/ReviewsSection.tsx` | Remove star rating tagline |

---

## 1. Reviews Section - Remove Tagline

**File:** `src/components/ReviewsSection.tsx`

**Delete lines 127-129:**
```tsx
// DELETE THIS:
<span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
  ⭐ Rated 5 Stars by Homeowners Like You
</span>
```

---

## 2. Quiz Contact Form Updates

**File:** `src/components/Quiz.tsx`

### A. Update Headline (lines 501-503)

```tsx
// Before:
<h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
  You Qualify for the $2,000 Discount!
</h3>

// After:
<h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
  Your Zip Code Qualifies For This Offer!
</h3>
```

### B. Update Subheadline (lines 504-506)

```tsx
// Before:
<p className="text-sm text-muted-foreground leading-snug max-w-sm mx-auto">
  Complete the form below to schedule your free consultation.
</p>

// After:
<p className="text-sm text-muted-foreground leading-snug max-w-sm mx-auto">
  Complete the form below so we can contact you and schedule your 100% free estimate.
</p>
```

### C. Change "First name" to "Name" (line 528)

```tsx
// Before:
placeholder="First name"

// After:
placeholder="Name"
```

### D. Add Phone Number Helper Text (after line 564)

Add a subtle reminder below the phone field:

```tsx
<div>
  <div className="relative">
    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
    <Input
      type="tel"
      inputMode="tel"
      placeholder="(555) 123-4567"
      value={data.phone}
      onChange={(e) => {
        setData({ ...data, phone: formatPhoneNumber(e.target.value) });
        if (errors.phone) setErrors({ ...errors, phone: undefined });
      }}
      className={`pl-10 h-12 text-[15px] rounded-xl border-2 transition-all ${
        errors.phone ? 'border-red-500 focus:border-red-500' : 'focus:border-primary'
      }`}
      maxLength={14}
    />
  </div>
  {errors.phone ? (
    <p className="text-xs text-red-500 mt-1 pl-1">{errors.phone}</p>
  ) : (
    <p className="text-[10px] text-muted-foreground mt-1 pl-1">
      📱 Please double-check your number so we can reach you
    </p>
  )}
</div>
```

---

## Summary of Changes

| Element | Before | After |
|---------|--------|-------|
| Reviews tagline | "⭐ Rated 5 Stars by Homeowners Like You" | Removed |
| Contact headline | "You Qualify for the $2,000 Discount!" | "Your Zip Code Qualifies For This Offer!" |
| Contact subheadline | "...schedule your free consultation." | "...schedule your 100% free estimate." |
| Name field placeholder | "First name" | "Name" |
| Phone field | No helper text | Helper text reminder to double-check number |

---

## Mobile Optimization Notes

- Phone helper text uses very small font (`text-[10px]`) to not add clutter
- Helper text only shows when there's no error (error takes priority)
- Emoji (📱) adds visual cue without taking extra space

