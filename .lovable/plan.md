

# Replace Logo with Transparent Version

## Problem
The current `src/assets/14er-logo.png` has a dark background baked in, causing a visible black box on the qualify page.

## Solution
Replace `src/assets/14er-logo.png` with the newly uploaded transparent logo (`ChatGPT_Image_Feb_12_2026_08_51_38_PM.png`). This version has a white/transparent background with black mountains, yellow sun, and black/yellow text.

**Important**: Since this logo has dark (black) elements rather than white, the dark gradient overlay at the top of the page is no longer needed for contrast. However, the background image on the qualify page is light-colored, so the black logo will be visible without any gradient changes.

### Steps

1. Copy `user-uploads://ChatGPT_Image_Feb_12_2026_08_51_38_PM.png` to `src/assets/14er-logo.png` (overwrite)
2. No code changes needed in `QualifyPage.tsx` -- same import path, logo displays automatically

### Files Modified
| File | Change |
|------|--------|
| `src/assets/14er-logo.png` | Replaced with new transparent logo |

