

# Colorado ZIP Code Validation Implementation

This plan implements bulletproof Colorado ZIP code validation to prevent out-of-state leads while providing a polite user experience for disqualified visitors.

---

## Summary

When a user enters a non-Colorado ZIP code (outside the 80001-81658 range), they'll see a friendly disqualification screen instead of proceeding to the contact form. Colorado residents will experience no change to the quiz flow.

---

## Changes Overview

| File | What Changes |
|------|--------------|
| `src/components/Quiz.tsx` | Add validation logic + disqualification screen |

---

## Technical Implementation

### 1. Add New State Variable (line 36)

Add `isDisqualified` state alongside existing state variables:

```tsx
const [isDisqualified, setIsDisqualified] = useState(false);
```

### 2. Add Validation Function (after line 29)

Add the Colorado ZIP validation function right after `formatPhoneNumber`:

```tsx
const isColoradoZipCode = (zip: string): boolean => {
  if (zip.length !== 5 || !/^\d{5}$/.test(zip)) {
    return false;
  }
  const zipNum = parseInt(zip, 10);
  return zipNum >= 80001 && zipNum <= 81658;
};
```

### 3. Update handleNext Function (lines 70-74)

Replace the current `handleNext` to validate ZIP before proceeding:

```tsx
const handleNext = () => {
  if (step === 4 && data.zipCode.length >= 5) {
    if (isColoradoZipCode(data.zipCode)) {
      setStep(5);
    } else {
      setIsDisqualified(true);
    }
  }
};
```

### 4. Update Progress Dots Visibility (line 287)

Hide progress dots when disqualified:

```tsx
{!isSubmitted && !isDisqualified && (
```

### 5. Add Disqualification Screen (after line 679)

Add the new screen inside AnimatePresence, right after the Success Screen:

```tsx
{isDisqualified && (
  <motion.div
    key="disqualified"
    variants={cardVariants}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{ duration: 0.3 }}
    className="py-6 text-center"
  >
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="w-16 h-16 mx-auto mb-5 rounded-full bg-amber-100 flex items-center justify-center"
    >
      <MapPin className="w-8 h-8 text-amber-600" />
    </motion.div>
    
    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 leading-snug">
      We Only Serve Colorado
    </h3>
    
    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 max-w-sm mx-auto">
      Thank you for your interest in 14er Renovation! Unfortunately, we currently only serve homeowners in Colorado.
    </p>
    
    <div className="bg-muted/50 rounded-lg p-4 mb-4">
      <p className="text-xs text-muted-foreground">
        <strong>Looking for a contractor in your area?</strong>
      </p>
      <div className="flex gap-3 justify-center mt-2">
        <a href="https://www.homeadvisor.com" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline font-medium">HomeAdvisor</a>
        <a href="https://www.angi.com" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline font-medium">Angi</a>
        <a href="https://www.thumbtack.com" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline font-medium">Thumbtack</a>
      </div>
    </div>
    
    <p className="text-xs text-muted-foreground/70 italic">
      Think this is an error? Your ZIP code was: <strong>{data.zipCode}</strong>
    </p>
  </motion.div>
)}
```

---

## User Experience

| User Type | Experience |
|-----------|------------|
| Colorado resident (ZIP 80001-81658) | No change - proceeds to contact form normally |
| Out-of-state visitor | Sees polite disqualification screen with helpful alternatives |

---

## Test Cases

**Should PASS (proceed to Step 5):**
- 80202 (Denver)
- 80301 (Boulder)
- 80521 (Fort Collins)
- 81611 (Aspen)

**Should FAIL (show disqualification screen):**
- 68102 (Nebraska)
- 84101 (Utah)
- 10001 (New York)
- 90210 (California)

---

## What Remains Unchanged

- All quiz styling and layout
- Existing 5 quiz steps
- Form field appearance
- Button styling
- Progress dots design
- Animation behavior
- Webhook submission logic

