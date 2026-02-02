

# Add Testimonial Line Between Button and Trust Badges

## Summary

Add a subtle testimonial quote in Step 5 between the CTA button and the trust badges to boost credibility at the final conversion point.

---

## File to Modify

| File | Action | Changes |
|------|--------|---------|
| `src/components/Quiz.tsx` | MODIFY | Insert testimonial div between button and trust badges |

---

## Implementation

**Location:** Lines 844-846 (between button and trust footer)

**Current:**
```tsx
                )}
              </Button>

              {/* Trust Footer - Enhanced */}
```

**New:**
```tsx
                )}
              </Button>

              {/* Subtle Testimonial */}
              <div className="mt-3">
                <p className="text-xs text-muted-foreground/80 italic text-center leading-relaxed">
                  "Just finished our kitchen remodel with 14er—would definitely recommend!"
                  <span className="text-muted-foreground/60 not-italic ml-1">- Michael R., Denver</span>
                </p>
              </div>

              {/* Trust Footer - Enhanced */}
```

---

## Visual Flow

```text
┌────────────────────────────────────┐
│  [Get My Free Consultation Button] │
│                                    │
│  "Just finished our kitchen remodel│
│  with 14er—would definitely        │
│  recommend!" - Michael R., Denver  │
│                                    │
│  ─────────────────────────────────│
│  🛡 Secure · Licensed & Insured ·  │
│     No spam                        │
└────────────────────────────────────┘
```

---

## Styling Details

| Property | Value | Purpose |
|----------|-------|---------|
| `mt-3` | Margin top | Space from button |
| `text-xs` | 12px | Subtle, not distracting |
| `text-muted-foreground/80` | 80% opacity | Soft gray |
| `italic` | Italic text | Quote styling |
| `text-center` | Center aligned | Matches layout |
| `leading-relaxed` | 1.625 line height | Readable |

---

## Testing

- [ ] Verify testimonial appears between button and trust badges on Step 5
- [ ] Check text is readable but subtle (not competing with CTA)
- [ ] Confirm responsive display on mobile

