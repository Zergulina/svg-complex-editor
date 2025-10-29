# Task 7: Create Wall Primitive

## Objective
Create wall primitive - polygon with extrusion capability and variable width.

## Primitives Overview
- Wall: Polygon with variable width and extrusion capability
- Zone: Polygon or ellipse with text and icon support, must be inside walls
- Text: For general annotations and room names
- Icon: For vegetables, warnings, alerts, and culture indicators
- Background Image: Uploadable images that can be scaled and positioned

## Detailed Steps

1. **Define Wall Data Structure**
   - Create a Wall class/structure that can hold multiple segments
   - Each segment should be representable as a polygon (minimum triangle)
   - Ensure segments are connected (adjacent vertices only on other polygon edges)
   - Define properties for wall width, path, and individual segment data

2. **Create Wall Rendering Logic**
   - Implement function to convert wall definition into SVG path/polygons
   - Handle variable width for different wall segments
   - Ensure proper visual representation of extruded walls
   - Consider using path with stroke width for basic implementation

3. **Implement Basic Wall Creation**
   - Create function to add a wall to the canvas
   - Allow initial placement of the first segment as a triangle or simple polygon
   - Ensure wall segments connect properly
   - Integrate with command pattern for undo/redo

4. **Handle Wall Editing Preparation**
   - Prepare data structure to support extrusion and width adjustment
   - Store necessary information for editing operations
   - Prepare for segment manipulation functionality

5. **Visual Styling**
   - Apply appropriate CSS classes for wall appearance
   - Consider default colors, stroke width, and other visual properties
   - Ensure walls are visually distinct from other elements

## Data Types
```typescript
interface WallSegment {
  id: string;
  points: Position[];
  width: number;
  connectedTo?: string; // ID of adjacent segment
}

interface Wall {
  id: string;
  segments: WallSegment[];
  color: string;
  isClosed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface WallProperties {
  width: number;
  color: string;
  opacity: number;
  strokeWidth: number;
}
```

## Algorithm
1. When wall tool is selected:
   - Initialize temporary wall creation mode
   - Wait for first mouse click to place initial point
2. On first click:
   - Create first wall segment (initial triangle or line)
   - Continue waiting for next point to extrude
3. On subsequent clicks:
   - Extend wall with new segments based on current width settings
   - Maintain proper connections between segments
4. On double-click or Enter key:
   - Finalize wall creation
   - Create AddElementCommand for the new wall
   - Add wall to canvas and command history
5. For wall rendering:
   - Convert each segment to SVG path/polygon
   - Apply visual styling based on properties
   - Ensure proper z-ordering with other elements

## Acceptance Criteria
- Wall can be created on the canvas as a polygon with variable width
- Wall segments are properly connected
- Wall is visually distinct with appropriate styling
- Data structure supports future extrusion and editing functionality
- Wall creation is integrated with command pattern for undo/redo
- Wall segments maintain proper connections during creation