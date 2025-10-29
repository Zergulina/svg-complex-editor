# Task 10: Implement Icon Primitive

## Objective
Implement icon primitive for vegetables and UI indicators (warnings, alerts).

## Detailed Steps

1. **Define Icon Data Structure**
   - Create an Icon class/structure that holds icon type, position, size, etc.
   - Include properties for position (x, y coordinates), icon type, size, and state
   - Add properties for different icon categories (vegetables, warnings, alerts, culture types)

2. **Create Icon Library**
   - Define available icon types for different vegetables (tomato, cucumber, lettuce, etc.)
   - Define available UI icons (warning, alert, danger, info, etc.)
   - Implement a system for easily adding new icon types
   - Consider using SVG icons or Unicode symbols

3. **Create Icon Rendering Logic**
   - Implement function to render icons as SVG elements
   - Handle different icon types with appropriate visual representation
   - Ensure consistent sizing and positioning of icons

4. **Implement Icon Selection and Placement**
   - Create function to add an icon to the canvas
   - Allow users to select from available icon types
   - Implement proper positioning of icons on the canvas

5. **Implement Icon Styling**
   - Allow sizing of icons (to accommodate different use cases)
   - Implement color coding for different icon types if needed
   - Ensure icons remain visible and recognizable at different sizes

6. **Implement Icon Interaction**
   - Allow moving icons around the canvas
   - Enable selection and manipulation of icons
   - Consider tooltip or information display on hover

7. **Integration with Zones**
   - Allow icons to be attached to zones (culture icons, additional icons)
   - Handle positioning of icons relative to zones
   - Consider special handling for icons within zones vs standalone icons

## Acceptance Criteria
- Icons can be selected from a library and placed on the canvas
- Different icon types are visually distinct
- Icons can be positioned and moved around the canvas
- Icons can be integrated with zones (culture icons, additional icons)
- Icons remain visible and recognizable at appropriate sizes