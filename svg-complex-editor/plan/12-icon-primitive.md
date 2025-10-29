# Task 12: Implement Icon Primitive

## Objective
Implement icon primitive for vegetables and UI indicators (warnings, alerts).

## Primitives Overview
- Wall: Polygon with variable width and extrusion capability
- Zone: Polygon or ellipse with text and icon support, must be inside walls
- Text: For general annotations and room names
- Icon: For vegetables, warnings, alerts, and culture indicators
- Background Image: Uploadable images that can be scaled and positioned

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
   - Integrate with command pattern for undo/redo

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

## Data Types
```typescript
type IconCategory = 'vegetable' | 'warning' | 'alert' | 'info' | 'culture' | 'custom';

interface IconData {
  id: string;
  type: string; // specific icon identifier (e.g., 'tomato', 'warning', 'alert')
  category: IconCategory;
  position: Position;
  size: number;
  color?: string;
  rotation?: number;
  attachedTo?: string; // ID of element this icon is attached to (e.g., zone)
  createdAt: Date;
  updatedAt: Date;
}

interface IconLibrary {
  [category: string]: IconData[];
}
```

## Algorithm
1. When icon tool is selected:
   - Show icon library browser in sidebar
   - Allow user to select from different categories
2. On icon selection:
   - Show selected icon as preview during placement
   - Wait for canvas click to place icon
3. On canvas click:
   - Place icon at clicked position
   - Create AddElementCommand for the new icon
   - Add icon to canvas and command history
4. For zone attachment:
   - When placing icon near a zone, offer attachment option
   - Position icon relative to zone boundary or center
5. For icon rendering:
   - Map icon type to appropriate SVG path or symbol
   - Apply size and color properties
   - Position relative to parent element if attached
6. For icon interaction:
   - On click, show editing options or properties panel
   - On drag, move icon to new position
   - On delete, remove icon and create RemoveElementCommand

## Acceptance Criteria
- Icons can be selected from a library and placed on the canvas
- Different icon types are visually distinct
- Icons can be positioned and moved around the canvas
- Icons can be integrated with zones (culture icons, additional icons)
- Icons remain visible and recognizable at appropriate sizes
- Icon placement is integrated with command pattern for undo/redo
- Icon library is organized with clear categories