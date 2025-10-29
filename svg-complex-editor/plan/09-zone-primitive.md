# Task 9: Create Zone Primitive

## Objective
Create zone primitive - polygon or ellipse with text and icon support.

## Primitives Overview
- Wall: Polygon with variable width and extrusion capability
- Zone: Polygon or ellipse with text and icon support, must be inside walls
- Text: For general annotations and room names
- Icon: For vegetables, warnings, alerts, and culture indicators
- Background Image: Uploadable images that can be scaled and positioned

## Detailed Steps

1. **Define Zone Data Structure**
   - Create a Zone class/structure that can represent either a polygon or ellipse
   - For polygon zones, support number of sides from 3 to 100
   - Include properties for position, size, shape type, text label, and icon
   - Include properties for culture icon and additional icons

2. **Create Zone Rendering Logic**
   - Implement function to render zones as SVG elements
   - Support both polygon and ellipse shapes
   - Add text label positioning and styling
   - Add icon positioning and styling
   - Ensure proper z-indexing so zones appear in correct order

3. **Implement Zone Creation**
   - Create function to add a zone to the canvas
   - Support specifying shape type (polygon/ellipse)
   - For polygon zones, allow specifying number of sides (3-100)
   - Set initial position and size
   - Integrate with command pattern for undo/redo

4. **Add Text Support**
   - Implement text label functionality
   - Position text appropriately within the zone
   - Ensure text is readable and properly formatted

5. **Add Icon Support**
   - Implement culture icon functionality
   - Implement additional icons (vegetables, warnings, etc.)
   - Position icons appropriately within the zone
   - Support multiple icons per zone if needed

6. **Visual Styling**
   - Apply appropriate CSS classes for zone appearance
   - Consider default colors, stroke, and fill properties
   - Ensure zones are visually distinct from walls and other elements

## Data Types
```typescript
type ZoneShapeType = 'polygon' | 'ellipse';

interface Zone {
  id: string;
  position: Position;
  shapeType: ZoneShapeType;
  dimensions: Dimensions;
  sides?: number; // For polygon zones, 3-100
  textLabel?: string;
  cultureIcon?: string;
  additionalIcons?: string[];
  color: string;
  opacity: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ZoneProperties {
  color: string;
  opacity: number;
  strokeWidth: number;
  strokeColor: string;
  textFontSize: number;
  textFontFamily: string;
}
```

## Algorithm
1. When zone tool is selected:
   - Show zone creation options in sidebar (shape type, number of sides)
   - Initialize temporary zone creation mode
2. On canvas click:
   - Create temporary zone at click position
   - If polygon selected, use specified number of sides
   - If ellipse selected, create basic ellipse
3. On drag:
   - Resize zone based on drag distance
   - Maintain aspect ratio if needed
4. On mouse up:
   - Finalize zone creation
   - Create AddElementCommand for the new zone
   - Add zone to canvas and command history
5. For zone rendering:
   - Create appropriate SVG element (polygon or ellipse)
   - Add text label if specified
   - Add icon elements if specified
   - Apply visual styling based on properties

## Acceptance Criteria
- Zone can be created as either polygon or ellipse
- Polygon zones support 3-100 sides
- Text labels can be added to zones
- Culture and additional icons can be added to zones
- Zones are visually distinct with appropriate styling
- Zone creation is integrated with command pattern for undo/redo
- Zones maintain proper shape constraints during creation