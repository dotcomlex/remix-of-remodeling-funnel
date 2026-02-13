

# Add Logo with Dark Gradient for Visibility

## Summary

Two changes to `src/pages/QualifyPage.tsx`: add a dark gradient at the top of the page so the white logo is visible, then add the logo image above the content.

---

## Change 1: Add Dark Gradient at Top

**File:** `src/pages/QualifyPage.tsx` (line 33)

After the existing dark overlay div, add an extra gradient that fades from `black/70` to transparent over the first 128px (`h-32`). This creates a dark area at the top for the white logo to stand out.

---

## Change 2: Add Logo

**File:** `src/pages/QualifyPage.tsx`

- Import the uploaded logo from `src/assets/14er-logo.png`
- Add the logo image above the "Progress Text" div, centered, with `h-16 sm:h-20` sizing
- No `brightness(0)` filter -- the logo displays in its original white color against the dark gradient

---

## Change 3: Save Uploaded Image

Copy the uploaded image to `src/assets/14er-logo.png` (overwriting the previous version if needed).

---

## Files Modified

| File | Changes |
|------|---------|
| `src/assets/14er-logo.png` | Updated with new upload |
| `src/pages/QualifyPage.tsx` | Add dark top gradient, add logo import and element |

