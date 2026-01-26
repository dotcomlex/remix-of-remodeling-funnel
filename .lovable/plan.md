

# Remodeling Lead Gen Funnel Conversion Plan

## Overview
Convert the existing concrete services landing page to a home remodeling lead generation funnel while preserving all design, functionality, and technical integrations. The core structure stays intact - we're updating content and adding a budget question to the quiz.

---

## Phase 1: Quiz Component Updates

### 1.1 Add Budget Question (New Step 3)
- Add new `budgetRange` field to QuizData interface
- Insert new step between Timeline (Step 2) and ZIP Code (moved to Step 4)
- Budget options: Under $20k, $20k-50k, $50k-100k, $100k+, Not sure yet
- Auto-advance on selection (same as Steps 1-2)

### 1.2 Update Project Types
- Replace concrete options (Driveway, Patio, Walkway, Other) with remodeling options:
  - Kitchen remodel (ChefHat icon)
  - Bathroom remodel (Bath icon)
  - Kitchen AND bathroom (Home icon)
  - Other remodeling project (HelpCircle icon)

### 1.3 Update Timeline Options
- "Within 2 weeks (ASAP)" → Zap icon
- "Within 30 days" → Calendar icon
- "1-3 months" → CalendarClock icon
- "Just exploring options" → Clock icon

### 1.4 Update Progress Bar
- Expand from 4 steps to 5 steps: Project → Timeline → Budget → Location → Contact
- Update progress percentages: 20%, 40%, 60%, 80%, 100%

### 1.5 Update Webhook Payload
- Add `budget_range` field to payload
- Update label mapping functions for new project types and timeline options
- Maintain dual format (contact.* and plain keys) for GHL compatibility

---

## Phase 2: Hero Section Content Updates

### 2.1 Main Headline
- "Colorado homeowners can now get **$2,000 OFF** any remodeling project through our Winter Upgrade Program!"

### 2.2 Subheadline
- Update to mention kitchens, bathrooms, basements instead of driveways/patios

### 2.3 Keep Unchanged
- Breaking badge, trust strip, urgency badge, Google rating badge
- Same layout, styling, and animations

---

## Phase 3: Reviews Section Updates

### 3.1 Replace All 12 Testimonials
- Convert concrete project stories to remodeling stories (kitchen, bathroom, basement)
- Update review text to mention:
  - Custom cabinets, countertops, tile work, fixtures
  - Basement finishing, spa-like bathrooms, dream kitchens
- Keep same names, locations, and avatar assignments
- Maintain carousel functionality and card design

---

## Phase 4: FAQ Section Updates

### 4.1 Replace All 6 FAQs
1. "What types of remodeling projects do you handle?"
2. "What does the free in-home consultation include?"
3. "Are you licensed and insured?"
4. "How long does a typical remodeling project take?"
5. "Do I need to move out during the remodel?"
6. "What does the $2,000 Winter Upgrade Program discount apply to?"

---

## Phase 5: Services Section Updates

### 5.1 Update Service Cards
- Kitchens (ChefHat) - "The heart of your home"
- Bathrooms (Droplets) - "Your private retreat"
- Basements (Home) - "Unlock hidden potential"
- Home Additions (Maximize) - "Expand your space"
- Custom Projects (Hammer) - "Your vision, our expertise"

### 5.2 Note About Images
- Keep existing placeholder images for now
- You'll provide new remodeling images later

---

## Phase 6: Gallery Section Updates

### 6.1 Update Section Header
- Change heading from "Real Colorado Results" to "Real Colorado Transformations"
- Update subheading to mention kitchens, bathrooms, basements

### 6.2 Note About Images
- Keep existing gallery images for now
- You'll provide new before/after remodeling images later

---

## Phase 7: Supporting Sections Updates

### 7.1 Why Winter Section
- Update 3 reasons for remodeling context:
  - Save $2,000 → invest in premium finishes
  - Ready for Spring → enjoy new kitchen/bathroom/basement
  - Skip the Spring Rush → faster scheduling

### 7.2 Final CTA Section
- Update headline: "$2,000 Off Any Remodeling Project"
- Update subheadline for kitchens, bathrooms, basements

### 7.3 Process Section
- Update step descriptions for remodeling:
  - "remodeling project" instead of "concrete project"
  - "remodeling expert" instead of "concrete expert"
  - "demolition, construction, and finishing touches" instead of "tear-out, prep, pour, and finish"

### 7.4 Why Choose Section
- Minor wording updates for remodeling context

### 7.5 Floating CTA
- Update button text: "Get My Free Consultation"

### 7.6 Footer
- Update to mention "kitchen, bathroom, and basement remodeling"

---

## Phase 8: Meta Tags & SEO Updates

### 8.1 Update index.html
- Title: "14er Renovation | $2,000 Off Home Remodeling | Colorado"
- Meta description: Focus on kitchen, bathroom, basement remodeling
- Keywords: Remodeling-specific terms
- Open Graph tags: Updated for remodeling context
- Twitter cards: Updated for remodeling context

---

## Technical Specifications

### What Stays Unchanged
- ✅ Overall page layout and structure
- ✅ All CSS classes and animations
- ✅ Webhook URL and integration pattern
- ✅ Facebook Pixel implementation (same pixel ID)
- ✅ Component architecture
- ✅ Image placement and sizing
- ✅ Section order and spacing

### Quiz Flow Summary
1. **Project Type** → Kitchen / Bathroom / Both / Other (auto-advance)
2. **Timeline** → ASAP / 30 days / 1-3 months / Exploring (auto-advance)
3. **Budget** → Under $20k / $20k-50k / $50k-100k / $100k+ / Not sure (auto-advance)
4. **ZIP Code** → Manual entry with Continue button
5. **Contact Form** → Name, Phone, Email (optional)
6. **Success Screen** → Personalized thank you

---

## Files to Modify
- `src/components/Quiz.tsx` - Quiz flow + budget question
- `src/components/HeroSection.tsx` - Hero copy
- `src/components/ReviewsSection.tsx` - All 12 testimonials
- `src/components/FAQSection.tsx` - All 6 FAQs
- `src/components/ServicesSection.tsx` - Service cards + icons
- `src/components/GallerySection.tsx` - Section headers
- `src/components/WhyWinterSection.tsx` - Reason cards
- `src/components/FinalCTASection.tsx` - CTA copy
- `src/components/ProcessSection.tsx` - Step descriptions
- `src/components/WhyChooseSection.tsx` - Card descriptions
- `src/components/FloatingCTA.tsx` - Button text
- `src/components/Footer.tsx` - Footer text
- `index.html` - Meta tags and SEO

