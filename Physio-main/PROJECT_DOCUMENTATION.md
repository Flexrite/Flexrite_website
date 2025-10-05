# FLEXRITE WORLD - Project Documentation

## Overview
Flexrite World is a health and wellness center website specializing in physiotherapy. Built with React, TypeScript, and Vite, featuring advanced animations and modern UI components.

## Project Structure

### Main Components

#### 1. Hero Component (`/client/components/Hero.tsx`)
**Purpose**: Landing section with video background and animated text
**Features**:
- Parallax video background (`/bg-hero.mp4`)
- Multi-layered scrolling text effect
- Hero image with fade animation (`/hero.png`)
- Framer Motion animations

**Current State**:
- Font Size: 144px (increased from 124px)
- Letter Spacing: 8px
- Glow Effect: Reduced by 50% (textShadow: 10px/20px, filter: 5px)
- Scroll Effect: 3 layered texts with opacity animation
- Text Position: Left 15%, Top 1/3

**Recent Changes**:
- ✅ Removed black outline from main text
- ✅ Added scroll-triggered echo text visibility
- ✅ Reduced glow intensity by 50%

#### 2. Header Component (`/client/components/Header.tsx`)
**Purpose**: Fixed navigation bar
**Features**:
- Auto-hide on scroll down, show on scroll up
- White text links (changed from black)
- Mobile hamburger menu
- Z-index: 9999

**Current State**:
- Link colors: White with text-shadow
- Mobile menu button: White bars
- Scroll behavior: Hide/show based on scroll direction

#### 3. AboutUs Component (`/client/components/AboutUs.tsx`)
**Purpose**: "Our Story" section with glassmorphism card
**Features**:
- Intersection Observer for scroll animations
- Glassmorphism background card
- Image background (`/about.avif`)
- Scroll-triggered scaling animation

**Current State**:
- Section Height: 1800px (increased from 1500px)
- Top Margin: 200px (moved down)
- Intersection Threshold: 0.3 (improved visibility)
- Scaling: Fixed to stay at scale-100 after animation

**Recent Changes**:
- ✅ Moved section down by 200px
- ✅ Fixed scaling behavior to stay at 100% after animation
- ✅ Increased section height for better spacing
- ✅ Moved about.avif image 20px to the right
- ✅ Moved Our Story content 20px to the right

#### 4. ContactFooter Component (`/client/components/ContactFooter.tsx`)
**Purpose**: Footer section with contact information and particle background
**Features**:
- Particle background animation using Canvas and GSAP
- Contact form modal integration
- Feedback submission functionality

**Current State**:
- Background: Black with animated particle overlay
- Particle opacity: 20% for subtle effect
- Canvas size: 1200x600px with responsive scaling

**Recent Changes**:
- ✅ Added GSAP-powered particle background animation
- ✅ Integrated canvas-based particle system with 3-color overlapping circles

#### 5. MeetOurDoctors Component (`/client/components/MeetOurDoctors.tsx`)
**Purpose**: Doctor profiles with glassmorphism cards
**Features**:
- Glassmorphism doctor cards
- Hover effects with gradients
- Profile images and name display

**Current State**:
- Card hover: White gradient + Navy blue gradient (added)
- Navy gradient: rgba(25,25,112,0.15) with 0.3s delay
- Improved name visibility on glassmorphism background

**Recent Changes**:
- ✅ Added subtle navy blue gradient after hover effect
- ✅ Enhanced glassmorphism visibility for doctor names
- ✅ Added light to dark navy blue gradient background (Option A implementation)

#### Doctor Card Layer Structure & Background Image Options

**Layer Hierarchy (Z-Index Order)**:
1. **Base Card (.doctor-card)** - Z-index: 0
   - Current: White glassmorphism with radial gradient pattern
   - Size: 320px × 450px with 3px padding
   - Border-radius: 32px

2. **Hover Overlays**:
   - **::before** - White gradient overlay (hover effect)
   - **::after** - Navy blue gradient overlay (0.3s delay on hover)

3. **Profile Picture Container** - Z-index: 1-3
   - Normal: calc(100% - 6px) covering most of card
   - Hover: 110px circle in top-left corner

4. **Bottom Section (Name Display)** - Z-index: 2
   - Normal: Bottom 20% of card with teal glassmorphism
   - Hover: Expands to 75% of card height

**Background Image Integration Options**:

**Option A - Main Card Background** (Recommended):
```css
.doctor-card {
  background-image: url('/your-image.jpg'), [existing gradients];
  background-size: cover, 20px 20px, 100% 100%;
}
```

**Option B - Dedicated Background Layer**:
```css
.doctor-card .background-image {
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%;
  background: url('/image.jpg') center/cover;
  z-index: -1; opacity: 0.2;
}
```

**Option C - Bottom Section Background**:
```css
.doctor-card .bottom-section {
  background-image: url('/image.jpg'), [existing gradients];
  background-size: cover, 15px 15px, 100% 100%;
}
```

**Option D - New Pseudo-element**:
```css
.doctor-card::after {
  background: url('/image.jpg') center/cover;
  opacity: 0.3; z-index: -1;
}
```

### UI Components (`/client/components/ui/`)

#### ElegantShadowTitle Component (`ElegantShadowTitle.tsx`)
**Purpose**: Uniform elegant shadow text effect with slide-in background strip animation
**Animation Features**:
- Background strip slides in from left to right using GSAP
- Text fades in with upward motion after background animation
- ScrollTrigger integration for viewport-based activation
- Customizable delay parameter

**Typography Specifications**:
- Font Family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif
- Font Size: 92px (uniform across all headings)
- Text Transform: Uppercase
- Letter Spacing: 0.15em
- Multi-layer shadow effect with 28 shadow layers for elegant depth

**Background Strip**:
- Color: #e7e5e4 (light beige)
- Animation: ScaleX from 0 to 1, transform origin left center
- Size: Text width + 16px horizontal padding, text height + 4px vertical padding
- Duration: 1.2s with power3.out easing

**Usage Examples**:
- "Our Story": ElegantShadowTitle with 0.2s delay
- "Meet Our Doctors": ElegantShadowTitle (default timing)
- "What Our Clients Say": ElegantShadowTitle (default timing)
- "Blogs and News": ElegantShadowTitle (default timing)

#### AnimatedTitle Component (`AnimatedTitle.tsx`) - DEPRECATED
**Status**: Replaced by ElegantShadowTitle for all major headings
**Previous Animation Types**:
- `slideUp`: Text slides up with fade-in
- `fadeIn`: Scale and fade animation
- `splitChars`: Character-by-character stagger animation
- `scaleIn`: Scale with rotation and bounce effect

#### ParticleBackground Component (`ParticleBackground.tsx`)
**Purpose**: Canvas-based particle animation system
**Technical Details**:
- Built with HTML5 Canvas and GSAP
- Grid-based particle system (11x11 grid)
- Three overlapping circles per grid position
- Colors: Blue (#01AFF6), Pink (#F20085), Yellow (#FFD036)
- Blend mode: Multiply for color mixing

**Animation Sequence**:
1. Initial entrance: Scale from 0 to 1 with rotation
2. Continuous pulsing: Staggered breathing effect
3. Grid-based stagger pattern from top-left

**Performance Features**:
- RequestAnimationFrame for smooth rendering
- GSAP ticker integration
- Automatic cleanup on unmount

### Global Styles (`/client/global.css`)

#### Debug Outlines (Development Only)
```css
img { outline: 3px solid hotpink !important; }
section { outline: 4px solid lime !important; }
h2, h3, h4, h5, h6 { outline: 2px solid red !important; }
p { outline: 1px solid blue !important; }
button { outline: 2px solid purple !important; }
nav { outline: 3px solid green !important; }
article { outline: 3px solid cyan !important; }
main { outline: 4px solid yellow !important; }
```

## Animation Systems

### 1. Hero Text Scroll Effect
- **File**: Hero.tsx
- **Mechanism**: 3 layered h1 elements with different scroll speeds
- **Logic**: `scrollValue * 0.07 * index` for position offset
- **Visibility**: Echo texts fade in based on scroll (`scrollValue / 200`)

### 2. AboutUs Scaling Animation
- **File**: AboutUs.tsx
- **Mechanism**: Intersection Observer + setTimeout
- **Phases**:
  1. Initial: opacity-0, scale-85, translateY-12
  2. Trigger: opacity-100, translateY-0, scale-105
  3. Complete: scale-100 (stays visible)

### 3. Doctor Card Hover Effects
- **File**: MeetOurDoctors.tsx
- **Sequence**:
  1. White gradient overlay (immediate)
  2. Navy blue gradient overlay (0.3s delay)
  3. Enhanced glassmorphism visibility

## Error Resolutions & Fixes

### Issue 1: Hero Text Overlap
**Problem**: Header navigation overlapping hero text
**Solution**: Increased hero text z-index to 10001
**File**: Hero.tsx:63

### Issue 2: Echo Text Visibility
**Problem**: Background echo texts always visible
**Solution**: Set initial opacity: 0, fade in on scroll
**File**: Hero.tsx:124, 141

### Issue 3: AboutUs Scaling Behavior
**Problem**: Section scaled up and disappeared on scroll
**Solution**: 
- Fixed scaling to end at scale-100
- Moved section down 200px
- Increased intersection threshold to 0.3
**File**: AboutUs.tsx:91, 125, 41

### Issue 4: Doctor Card Name Visibility
**Problem**: Glassmorphism made doctor names hard to read
**Solution**: Added navy blue gradient overlay on hover
**File**: MeetOurDoctors.tsx:63-64

### Issue 5: AboutUs Section Positioning
**Problem**: Need to adjust image and content positioning
**Solution**: 
- Moved about.avif image 20px to the right
- Moved Our Story content 20px to the right using transform
**File**: AboutUs.tsx:108, 119

### Issue 6: Section Title Animation
**Problem**: Static section titles lacked visual impact
**Solution**: 
- Created reusable AnimatedTitle component with GSAP
- Implemented 4 animation types: slideUp, fadeIn, splitChars, scaleIn
- Added ScrollTrigger for viewport-based animations
**File**: AnimatedTitle.tsx, AboutUs.tsx:136-144, MeetOurDoctors.tsx:88-93

### Issue 7: Footer Visual Enhancement
**Problem**: Footer section needed dynamic background element
**Solution**: 
- Created particle animation system using Canvas and GSAP
- Implemented 3-color overlapping circle grid with stagger animations
- Added as background overlay with 20% opacity
**File**: ParticleBackground.tsx, ContactFooter.tsx:13-19

### Issue 8: TileTextReveal Implementation Failure ❌
**Problem**: Attempted to implement complex tile-based text animation for all section headings
**Implementation**: Created TileTextReveal component with 5x5 tile grid system
**Result**: Complete failure - user rejected with explicit feedback
**Resolution**: 
- ✅ Reverted all TileTextReveal implementations
- ✅ Restored original AnimatedTitle components in AboutUs and MeetOurDoctors
- ✅ Restored original h2 elements in Testimonials and BlogsAndNews  
- ✅ Removed TileTextReveal.tsx component entirely
- ✅ System restored to working state with original animation system

### Issue 9: ElegantShadowTitle Implementation ✅
**Problem**: Need uniform elegant shadow text effect for all section headings with slide-in background strip
**Requirements**: 
- Use only "elegant shadow" effect for all headings
- Background strip slides in from left to right edge
- Strip height: text height + 10px extra
- Uniform font size (92px) across all headings
- Apply to: "Our Story", "Meet Our Doctors", "What Our Clients Say", "Blogs and News"
**Implementation**: 
- ✅ Created ElegantShadowTitle component with GSAP animations
- ✅ Implemented slide-in background strip animation (left to right)
- ✅ Applied elegant shadow text effect with multi-layer shadows
- ✅ Used consistent typography: Avant Garde font family, 92px size, uppercase
- ✅ Replaced all heading components across 4 sections
**Current State**: All major headings now use ElegantShadowTitle:
- "Our Story": ElegantShadowTitle with 0.2s delay
- "Meet Our Doctors": ElegantShadowTitle 
- "What Our Clients Say": ElegantShadowTitle
- "Blogs and News": ElegantShadowTitle

## Technical Implementation Details

### Scroll Effects
- Hero text uses `window.scrollY` with multipliers
- AboutUs uses Intersection Observer API
- Framer Motion for smooth animations

### Styling Approach
- Tailwind CSS for utility classes
- Inline styles for dynamic values
- CSS-in-JS for complex animations

### Z-Index Hierarchy
1. Header: 9999
2. Hero Text: 10001
3. Hero Components: 10-50
4. AboutUs: 20-30
5. Other sections: 10

## File Locations

### Core Components
- `/client/components/Hero.tsx` - Main landing section
- `/client/components/Header.tsx` - Navigation
- `/client/components/AboutUs.tsx` - Our Story section
- `/client/components/ContactFooter.tsx` - Footer with particle background
- `/client/components/MeetOurDoctors.tsx` - Doctor profiles

### UI Components
- `/client/components/ui/ElegantShadowTitle.tsx` - Uniform elegant shadow text with slide-in background strip
- `/client/components/ui/AnimatedTitle.tsx` - GSAP text animations (deprecated, replaced by ElegantShadowTitle)
- `/client/components/ui/ParticleBackground.tsx` - Canvas particle system

### Assets
- `/public/hero.png` - Main hero image (scaled 110%)
- `/public/bg-hero.mp4` - Background video
- `/public/about.avif` - AboutUs background image

### Styles
- `/client/global.css` - Global styles and debug outlines

## Debug Tools

### Visual Debugging
- Colored outlines for all elements (removable in production)
- Different colors for different element types
- Easy identification of layout issues

### Browser Dev Tools
- Use React DevTools for component inspection
- Check Intersection Observer in Elements tab
- Monitor scroll events in Console

## Performance Considerations

### Optimizations
- Framer Motion for hardware-accelerated animations
- Intersection Observer for efficient scroll detection
- Conditional rendering for hover effects

### Potential Issues
- Multiple scroll listeners (Hero + AboutUs)
- Large video background file
- Complex glassmorphism effects

## Deployment Notes

### Before Production
1. Remove debug outlines from global.css
2. Optimize video/image assets
3. Test scroll performance on mobile
4. Verify accessibility compliance

### Environment Variables
- None currently required
- All assets are static files

---

*Last Updated: August 16, 2025*
*Version: 1.4.0* (ElegantShadowTitle implementation with uniform typography and slide-in animations)