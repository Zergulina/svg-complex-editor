# Task 7: Create Zone Primitive

## Objective
Create zone primitive - polygon or ellipse with text and icon support.

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

## Acceptance Criteria
- Zone can be created as either polygon or ellipse
- Polygon zones support 3-100 sides
- Text labels can be added to zones
- Culture and additional icons can be added to zones
- Zones are visually distinct with appropriate styling