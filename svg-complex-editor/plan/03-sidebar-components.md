# Task 3: Create Sidebar with Components Panel

## Objective
Create the sidebar component with a panel of available components that can be placed on the canvas.

## Primitives Overview
- Wall: Polygon with variable width and extrusion capability
- Zone: Polygon or ellipse with text and icon support, must be inside walls
- Text: For general annotations and room names
- Icon: For vegetables, warnings, alerts, and culture indicators
- Background Image: Uploadable images that can be scaled and positioned

## Detailed Steps

1. **Design and Create Sidebar Component**
   - Create a collapsible sidebar using ShadCN UI components
   - Implement toggle functionality for collapsing/expanding
   - Add appropriate styling with consistent theme

2. **Implement Wall Components Section**
   - Create wall tool button with visual preview
   - Add wall with different initial shapes (line, curve)
   - Include options for wall width and properties
   - Add description of wall functionality

3. **Implement Zone Components Section**
   - Create zone tool button (polygon/ellipse selector)
   - Add options for number of sides (3-100 for polygons)
   - Include visual preview of different zone shapes
   - Add description of zone functionality

4. **Implement Text Components Section**
   - Create text tool button
   - Add options for text properties (size, font, etc.)
   - Include visual preview of text tool
   - Add description of text functionality

5. **Implement Icon Components Section**
   - Create icon library browser
   - Include categories: vegetables, warnings, alerts, culture types
   - Show preview of different icons
   - Add search functionality for icon selection

6. **Implement Background Image Section**
   - Create background image upload button
   - Add preview of uploaded images
   - Include management tools for background images

7. **Sidebar State Management**
   - Track currently selected tool/component
   - Update canvas tool when selection changes
   - Store user preferences for sidebar state

8. **Accessibility and Keyboard Navigation**
   - Implement keyboard navigation within sidebar
   - Add ARIA labels and descriptions
   - Ensure all components are accessible

## Data Types
```typescript
interface ComponentItem {
  id: string;
  type: PrimitiveType;
  name: string;
  description: string;
  icon?: string;
  properties?: Record<string, any>;
}

interface SidebarState {
  collapsed: boolean;
  activeTab: 'primitives' | 'backgrounds' | 'zones' | 'icons';
  selectedTool: PrimitiveType | null;
  componentItems: ComponentItem[];
}
```

## Algorithm
1. Initialize sidebar with all available components
2. For each component category:
   - Render component items with appropriate previews
   - Add event listeners for component selection
3. When component is selected:
   - Update sidebar state to reflect selection
   - Notify canvas component of tool change
   - Update UI to indicate active selection
4. Handle sidebar collapse/expand:
   - Toggle visibility of component details
   - Adjust layout to accommodate sidebar state
   - Store user preference for future sessions

## Acceptance Criteria
- Sidebar contains all primitive components with visual previews
- Users can select different tools from the sidebar
- Selected tool is properly communicated to canvas
- Sidebar is responsive and can be collapsed/expanded
- Icons are organized in logical categories with search functionality
- All sidebar components are accessible via keyboard navigation
- Component selection is visually indicated