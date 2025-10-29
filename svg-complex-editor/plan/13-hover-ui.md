# Task 13: Add Hover UI Elements

## Objective
Add hover UI elements for zones and some icons.

## Primitives Overview
- Wall: Polygon with variable width and extrusion capability
- Zone: Polygon or ellipse with text and icon support, must be inside walls
- Text: For general annotations and room names
- Icon: For vegetables, warnings, alerts, and culture indicators
- Background Image: Uploadable images that can be scaled and positioned

## Detailed Steps

1. **Implement Hover Detection**
   - Add hover event listeners to zones and specified icons
   - Use SVG.js event handling to detect mouse enter/leave events
   - Ensure proper event handling without interfering with other interactions

2. **Design Hover UI Elements**
   - Create visual indicators that appear on hover
   - Design UI elements that provide useful functionality or information
   - Plan hover UI for zones (possibly copy button, edit options, etc.)
   - Plan hover UI for icons (possibly info tooltip, additional actions)

3. **Implement Zone Hover UI**
   - Add hover state that highlights the zone
   - Implement a copy button that appears on hover for zones
   - Add edit controls that appear on hover
   - Ensure hover UI doesn't interfere with other canvas interactions

4. **Implement Icon Hover UI**
   - Add hover state for icons that shows additional information
   - Implement tooltips with icon descriptions
   - Add possible actions that can be performed on icons

5. **Position Hover Elements Correctly**
   - Ensure hover UI elements appear in appropriate positions relative to the hovered element
   - Handle positioning when elements are near canvas boundaries
   - Ensure hover UI doesn't overlap with other important elements

6. **Handle Multiple Hover States**
   - Manage hover states when multiple elements could be hovered simultaneously
   - Ensure responsive interaction without lag
   - Remove hover UI when element is no longer hovered

7. **Accessibility Considerations**
   - Ensure hover UI is accessible to users with different needs
   - Consider adding keyboard-based access to hover functionality
   - Implement appropriate ARIA attributes for hover elements

## Data Types
```typescript
interface HoverState {
  elementId: string | null;
  elementType: PrimitiveType | null;
  showCopyButton: boolean;
  showEditControls: boolean;
  tooltipContent?: string;
}

interface HoverControl {
  position: Position;
  type: 'copy' | 'edit' | 'delete' | 'info';
  elementId: string;
  visible: boolean;
}
```

## Algorithm
1. For each canvas element:
   - Add mouseenter event listener to show hover UI
   - Add mouseleave event listener to hide hover UI
2. On mouseenter:
   - Update hover state with element details
   - Calculate positions for hover controls
   - Show appropriate hover UI elements (copy button, etc.)
   - Highlight the hovered element visually
3. On mouseleave:
   - Hide hover UI elements
   - Clear hover state
   - Remove visual highlighting
4. For hover control interactions:
   - On copy button click:
     * Create copy of the element
     * Position copy slightly offset from original
     * Create AddElementCommand for the copy
   - On edit button click:
     * Show properties panel for the element
     * Enter editing mode for that element
   - On delete button click:
     * Create RemoveElementCommand
     * Remove element from canvas
5. For positioning:
   - Calculate control positions relative to element bounds
   - Adjust for canvas viewport transformations
   - Prevent controls from appearing outside canvas bounds

## Acceptance Criteria
- Hover UI appears when mouse enters zones and specified icons
- Hover UI includes useful functionality (like copy button for zones)
- Hover UI elements are positioned correctly and don't interfere with canvas interactions
- Hover UI disappears when mouse leaves the element
- Hover functionality works without performance issues
- Hover controls are accessible and provide useful functionality
- Hover UI works correctly with canvas transformations (zoom/pan)