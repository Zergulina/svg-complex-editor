# Task 5: Create Basic Canvas Component

## Objective
Create basic canvas component with infinite scrolling and grid functionality.

## Primitives Overview
- Wall: Polygon with variable width and extrusion capability
- Zone: Polygon or ellipse with text and icon support, must be inside walls
- Text: For general annotations and room names
- Icon: For vegetables, warnings, alerts, and culture indicators
- Background Image: Uploadable images that can be scaled and positioned

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

4. **Integrate with UI Components**
   - Connect canvas to toolbar actions
   - Listen for tool changes from sidebar
   - Update toolbar state based on canvas state

5. **Implement Basic Primitive Rendering**
   - Create placeholder rendering for all primitive types
   - Implement selection highlighting
   - Add basic interaction handlers

## Data Types
```typescript
interface CanvasProps {
  onSelectionChange: (elementId: string | null) => void;
  onCanvasChange: (state: CanvasState) => void;
  currentTool: PrimitiveType | null;
}

interface GridSettings {
  enabled: boolean;
  spacing: number;
  color: string;
  opacity: number;
}
```

## Algorithm
1. Initialize canvas with default viewport settings
2. For each frame/render cycle:
   - Update grid position based on viewport
   - Apply viewport transformations to canvas
   - Render all canvas elements
3. For user interactions:
   - Detect current tool from props
   - Handle mouse/touch events based on current tool
   - Update canvas state and notify parent components
4. For viewport changes:
   - Apply transformations to canvas group
   - Update grid accordingly
   - Maintain performance with proper rendering optimization

## Acceptance Criteria
- Canvas supports infinite scrolling in all directions
- Grid is visible and moves with the canvas during panning
- Zoom functionality works with mouse wheel
- Pan functionality works with middle mouse button or space+drag
- Component integrates well with Next.js architecture
- Canvas properly responds to tool changes from sidebar
- Canvas state updates are communicated to parent components