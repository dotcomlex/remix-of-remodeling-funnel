

# Add Logo + Fix Headline & Subheadline Styling

## Summary

Three changes to `src/pages/QualifyPage.tsx`: add the uploaded 14er logo at the top, soften the headline font weight, and reduce the subheadline text size.

---

## Change 1: Copy Logo to Project

Copy the uploaded logo image to `src/assets/14er-logo-dark.png` so it can be imported in the component.

---

## Change 2: Add Logo Above Content

**File:** `src/pages/QualifyPage.tsx`

Add a logo image above the "Progress Text" div. Import the logo from `src/assets` and render it centered with `h-16 sm:h-20`, using `filter: brightness(0)` to make it black (since the logo is white-on-black and the page background is light).

---

## Change 3: Soften Headline

**File:** `src/pages/QualifyPage.tsx`

Change `font-extrabold` to `font-bold` on the h1 element for a less aggressive feel.

---

## Change 4: Reduce Subheadline Size

**File:** `src/pages/QualifyPage.tsx`

Change `text-sm sm:text-base` to `text-xs sm:text-sm` on the subheadline paragraph for better visual hierarchy.

---

## Files Modified

| File | Changes |
|------|---------|
| `src/assets/14er-logo-dark.png` | New file (copied from upload) |
| `src/pages/QualifyPage.tsx` | Add logo import + element, headline `font-bold`, subheadline `text-xs sm:text-sm` |

