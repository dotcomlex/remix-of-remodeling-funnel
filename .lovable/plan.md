

# Increase ZIP Loading Screen Duration

## Summary

Increase the loading screen duration from 2.5 seconds to 4 seconds to give users more time to see the verification messages.

---

## File to Modify

| File | Action | Changes |
|------|--------|---------|
| `src/components/Quiz.tsx` | MODIFY | Change timeout from 2500ms to 4000ms |

---

## Implementation

### Change Timeout Duration

**Location:** Line 145

**Current:**
```tsx
setTimeout(() => {
  setIsCheckingZip(false);
  setStep(5);
}, 2500);
```

**New:**
```tsx
setTimeout(() => {
  setIsCheckingZip(false);
  setStep(5);
}, 4000);
```

---

## Why 4 Seconds?

- Each rotating message displays for 800ms
- 3 messages = ~2.4 seconds for one full cycle
- 4 seconds allows users to see all messages plus a complete second pass
- Feels more thorough without being annoyingly long

---

## Testing

- [ ] Enter Colorado ZIP (80233) and verify loading lasts 4 seconds
- [ ] Confirm all 3 messages cycle through at least once

