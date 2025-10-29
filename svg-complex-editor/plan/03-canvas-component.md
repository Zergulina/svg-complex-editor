# Task 3: Create Basic Canvas Component

## Objective
Create basic canvas component with infinite scrolling and grid functionality.

## Detailed Steps

1. **Create Canvas Component Structure**
   - Initialize SVG canvas using SVG.js library
   - Set up proper container with overflow and scrolling capabilities
   - Implement infinite scrolling functionality (panning in all directions)

2. **Implement Grid Functionality**
   - Create grid lines using SVG elements
   - Make grid configurable (spacing, color, etc.)
   - Ensure grid moves with the canvas when panning
   - Add option to toggle grid visibility

3. **Implement Zoom and Pan**
   - Implement mouse wheel zooming
   - Implement panning with middle mouse button or space+drag
   - Set appropriate zoom limits (min/max)
   - Ensure zooming happens around the mouse cursor position

4. **Integrate with Next.js**
   - Ensure component is client-side only if needed
   - Handle component lifecycle properly
   - Implement cleanup when component unmounts

## Acceptance Criteria
- Canvas supports infinite scrolling in all directions
- Grid is visible and moves with the canvas during panning
- Zoom functionality works with mouse wheel
- Pan functionality works with middle mouse button or space+drag
- Component integrates well with Next.js architecture