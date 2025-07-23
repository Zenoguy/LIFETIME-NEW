# Component-Based Architecture for LIFETIME Website

This document explains the component-based architecture used in the LIFETIME website project.

## Overview

We've adopted a component-based approach where each UI component has its functionality defined right next to its selector. This makes the codebase more maintainable, easier to understand, and more suitable for open-source collaboration.

## Key Benefits

1. **Locality of Behavior**: Each component's functionality is defined close to where it's used
2. **Self-Contained Components**: Components manage their own state and behavior
3. **Easier Maintenance**: Changes to a component only require looking in one place
4. **Better Collaboration**: New contributors can understand components in isolation
5. **Reduced Bugs**: Less chance of side effects between components

## Component Structure

Each component follows this general pattern:

```javascript
/**
 * Component Name
 * Brief description of what it does
 */
function initComponentName() {
    // 1. Get DOM elements
    const element = document.querySelector('.component-selector');
    if (!element) return; // Exit if element doesn't exist
    
    // 2. Set up functionality
    element.addEventListener('event', function() {
        // Component-specific behavior
    });
    
    // 3. Initialize animations if needed
    gsap.from(element, {
        // Animation properties
    });
    
    console.log('✓ Component initialized');
}
```

## Main Components

### 1. Header Component
- Fixed navigation with scroll effects
- Smooth scrolling for navigation links

### 2. Hero Section Component
- Animated intro elements
- Particles background

### 3. Service Cards Component
- Card animations
- Service popup functionality
- Icon animations

### 4. Gallery Items Component
- Image grid with hover effects
- Lightbox functionality

### 5. Contact Form Component
- Form validation
- Submission handling
- Consultation slot selection

### 6. Mobile Menu Component
- Toggle functionality
- Icon state management
- Outside click handling

### 7. Back to Top Component
- Scroll-based visibility
- Smooth scroll to top

## Particles Component

The particles animation is implemented as a class-based component for better encapsulation:

```javascript
class ParticlesComponent {
    constructor(containerId) {
        // Initialize properties
    }
    
    init() {
        // Set up canvas and particles
    }
    
    animate() {
        // Animation loop
    }
}
```

## How to Add a New Component

1. Add your HTML markup to `index-new.html`
2. Create a new initialization function in `components.js`:

```javascript
function initYourComponent() {
    const element = document.querySelector('.your-component');
    if (!element) return;
    
    // Your component's functionality
    
    console.log('✓ Your component initialized');
}
```

3. Call your initialization function in the DOMContentLoaded event listener at the top of `components.js`

## Best Practices

1. Always check if elements exist before trying to use them
2. Keep component functions focused on a single responsibility
3. Use clear naming that reflects the component's purpose
4. Add console logs to confirm initialization
5. Document any complex behavior with comments
6. Use consistent patterns across components

This component-based architecture makes the codebase more maintainable and easier for new contributors to understand and extend.