# Design Document

## Overview

This feature modifies the CSS layout of recipe sequences on mobile devices to improve readability. Currently, sequences display all elements (step number, ingredients, separator, description, and actions) in a single horizontal line, which creates a cramped and difficult-to-read layout on small screens. The new design will stack the description below the ingredients on mobile viewports while maintaining the current desktop layout.

## Architecture

### Current Structure (Desktop & Mobile)

```
.sequence-item (flex container)
├── .sequence-step (step number circle)
├── .sequence-content (flex container, column direction)
│   ├── .sequence-ingredients (ingredient chips)
│   ├── .sequence-description (text)
│   └── .sequence-duration (time display)
└── .sequence-actions (action buttons)
```

### Current Layout Behavior

**Desktop (>768px):**
- All elements flow horizontally in one line
- `.sequence-item` uses `display: flex` with `gap: var(--spacing-md)`
- Content naturally wraps within `.sequence-content`

**Mobile (≤768px):**
- `.sequence-item` has `flex-wrap: wrap` applied
- All elements still attempt to fit on one line, causing cramped layout
- No specific styling to force description to new line

### Proposed Layout Behavior

**Desktop (>768px):**
- No changes - maintain current horizontal layout

**Mobile (≤768px):**
- Step number and ingredients remain on first line
- Description moves to second line with full width
- Actions remain on first line, right-aligned
- Improved spacing between lines

## Components and Interfaces

### CSS Changes Required

#### 1. Mobile Sequence Item Container

Modify `.sequence-item` media query to support multi-line layout:

```css
@media (max-width: 768px) {
    .sequence-item {
        flex-wrap: wrap;
        /* Existing rule - keep it */
    }
}
```

#### 2. Mobile Sequence Content

Add new mobile-specific rules for `.sequence-content`:

```css
@media (max-width: 768px) {
    .sequence-content {
        /* Force content to take full width on mobile */
        flex-basis: 100%;
        order: 2; /* Move content below first line */
    }
}
```

#### 3. Mobile Sequence Step

Ensure step number stays on first line:

```css
@media (max-width: 768px) {
    .sequence-step {
        order: 1;
        /* Existing styles remain */
    }
}
```

#### 4. Mobile Sequence Actions

Keep actions on first line, right-aligned:

```css
@media (max-width: 768px) {
    .sequence-actions {
        order: 3;
        margin-left: auto; /* Push to right */
        margin-top: 0; /* Override any existing margin */
    }
}
```

#### 5. Mobile Sequence Ingredients

Adjust ingredients to appear on first line with step:

```css
@media (max-width: 768px) {
    .sequence-ingredients {
        /* Keep on same line as step */
        flex-basis: auto;
        flex-grow: 1;
        margin-bottom: 0; /* Remove bottom margin */
    }
}
```

#### 6. Mobile Sequence Description

Force description to new line with full width:

```css
@media (max-width: 768px) {
    .sequence-description {
        width: 100%;
        margin-top: var(--spacing-sm); /* Add spacing from ingredients line */
        padding-left: 0; /* Align with container */
    }
}
```

#### 7. Mobile Sequence Duration

Ensure duration appears below description:

```css
@media (max-width: 768px) {
    .sequence-duration {
        width: 100%;
        margin-top: var(--spacing-xs);
    }
}
```

## Data Models

No data model changes required. This is purely a CSS/presentation layer change.

## Visual Layout Diagram

### Desktop Layout (No Changes)
```
┌─────────────────────────────────────────────────────────────┐
│ [1] [🥕 Zanahoria] [🧄 Ajo] • Sofreír hasta dorar    [⋮]  │
│ ↑   └─ ingredients ─────┘     └─ description ─┘  └actions┘ │
│ step                                                         │
└─────────────────────────────────────────────────────────────┘
```

### Mobile Layout (New)
```
┌─────────────────────────────────────────────────────────────┐
│ [1] [🥕 Zanahoria] [🧄 Ajo]                          [⋮]   │
│ ↑   └─ ingredients ─────┘                        └actions┘  │
│ step                                                         │
│                                                              │
│ Sofreír el ajo y la cebolla hasta que estén dorados        │
│ └─ description (full width, second line) ─────────────────┘│
│                                                              │
│ ⏱️ 15min                                                    │
│ └─ duration (full width, third line) ──────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

## Implementation Strategy

### Flexbox Order Approach

Use CSS flexbox `order` property to control element positioning without changing HTML structure:

1. **First Line (order: 1-3):**
   - `.sequence-step` → order: 1
   - `.sequence-actions` → order: 3
   - Ingredients stay within `.sequence-content` but content moves to order: 2

2. **Second Line (order: 2):**
   - `.sequence-content` → order: 2, flex-basis: 100%
   - This forces content (ingredients + description + duration) to wrap to new line
   - Within content, ingredients stay at top, description below

### Alternative: Restructure Content

Instead of using order, we could restructure how `.sequence-content` displays on mobile:

```css
@media (max-width: 768px) {
    .sequence-content {
        display: contents; /* Remove from flex layout */
    }
    
    .sequence-ingredients {
        order: 2;
        flex: 1;
    }
    
    .sequence-description {
        order: 4;
        flex-basis: 100%;
    }
    
    .sequence-duration {
        order: 5;
        flex-basis: 100%;
    }
}
```

**Recommended Approach:** Use the `display: contents` method as it provides more granular control over individual elements within `.sequence-content`.

## Error Handling

No error handling required - this is a pure CSS change. However, we should ensure:

1. Layout doesn't break with very long ingredient names
2. Layout works with sequences that have no description
3. Layout works with sequences that have no duration
4. Layout works with sequences that have no ingredients

## Testing Strategy

### Visual Testing

1. **Mobile viewport testing (≤768px):**
   - Verify description appears on second line
   - Verify ingredients and step appear on first line
   - Verify actions appear on first line, right-aligned
   - Test with various content lengths
   - Test with missing description
   - Test with missing duration
   - Test with many ingredients (wrapping)

2. **Desktop viewport testing (>768px):**
   - Verify no changes to current layout
   - Verify all elements remain on single line

3. **Responsive transition testing:**
   - Resize browser from desktop to mobile
   - Verify smooth transition between layouts
   - No layout jumps or flickers

### Browser Testing

Test on:
- Chrome mobile (Android)
- Safari mobile (iOS)
- Firefox mobile
- Desktop browsers at mobile viewport sizes

### Edge Cases

1. **Very long ingredient names:** Should wrap within ingredient chips
2. **Many ingredients:** Should wrap to multiple lines within first line section
3. **No description:** Layout should still work, just skip description line
4. **No ingredients:** Layout should still work with just description
5. **Edit mode:** Verify edit mode layout is not affected

## Files to Modify

- `styles.css` - Add mobile-specific media query rules for sequence layout

## Dependencies

None - this is a self-contained CSS change.

## Performance Considerations

- No performance impact - pure CSS changes
- No JavaScript modifications required
- No additional DOM elements created
- Flexbox is well-optimized in modern browsers
