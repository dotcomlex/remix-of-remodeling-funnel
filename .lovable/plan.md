

# Add Lucky Orange Tracking (Keeping Meta Pixel)

## Summary

Add Lucky Orange tracking script **alongside** the existing Meta Pixel - nothing will be removed.

---

## Current State (Lines 28-42)

```html
    <!-- Meta Pixel Code -->
    <script>
    !function(f,b,e,v,n,t,s)
    ...
    fbq('track', 'PageView');
    </script>
    <!-- End Meta Pixel Code -->
  </head>
```

---

## After Change

```html
    <!-- Meta Pixel Code -->
    <script>
    !function(f,b,e,v,n,t,s)
    ...
    fbq('track', 'PageView');
    </script>
    <!-- End Meta Pixel Code -->

    <!-- Lucky Orange Tracking -->
    <script async defer src="https://tools.luckyorange.com/core/lo.js?site-id=70775e8c"></script>
  </head>
```

---

## What Stays the Same

| Item | Status |
|------|--------|
| Meta Pixel Code (lines 28-41) | KEPT - No changes |
| Meta Pixel noscript fallback (lines 45-48) | KEPT - No changes |
| All other code | KEPT - No changes |

---

## What Gets Added

- **1 line only**: Lucky Orange script tag inserted between line 41 and 42
- Site ID: `70775e8c`

---

## File Change

| File | Line | Action |
|------|------|--------|
| `index.html` | After line 41 | INSERT Lucky Orange script (Meta Pixel untouched) |

