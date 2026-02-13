

# Fix Black Box Behind Logo

## Problem
The current `src/assets/14er-logo.png` has a solid black background baked into the image file, causing a visible black box on the page.

## Solution
Replace the logo file with the newly uploaded transparent version.

### Step 1: Copy New Logo
Copy `user-uploads://Black_Illustration_Construction_Business_Card_3_1.png` to `src/assets/14er-logo.png`, overwriting the current file.

### Step 2: No Code Changes Needed
The existing `QualifyPage.tsx` already imports and displays the logo correctly. Once the image file is replaced, the black box will disappear automatically.

