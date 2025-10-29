# Task 4: Install and Configure SVG.js Library

## Objective
Install and configure SVG.js library with necessary plugins for canvas functionality.

## Primitives Overview
- Wall: Polygon with variable width and extrusion capability
- Zone: Polygon or ellipse with text and icon support, must be inside walls
- Text: For general annotations and room names
- Icon: For vegetables, warnings, alerts, and culture indicators
- Background Image: Uploadable images that can be scaled and positioned

## Detailed Steps

1. **Install SVG.js Core Library**
   - Install the main SVG.js library via npm
   - Verify the installation works with the project
   - Ensure compatibility with Next.js environment

2. **Install Required Plugins**
   - Install plugins needed for the functionality:
     - svg.draggable.js for drag and drop functionality
     - svg.select.js for selection capabilities
     - svg.resize.js for resizing primitives
     - svg.panzoom.js for pan and zoom functionality
     - svg.path.js for path manipulation (for walls with variable width)
   - Make sure all plugins are compatible with the main SVG.js version

3. **Configure SVG.js in Next.js**
   - Ensure SVG.js works correctly in Next.js environment
   - Handle any server-side rendering issues if they arise
   - Import SVG.js only on the client side if needed

4. **Create SVG.js Wrapper/Helper Functions**
   - Create utility functions to initialize SVG canvas
   - Create helper functions for common operations (creating elements, etc.)
   - Ensure proper cleanup when components unmount

5. **Implement Canvas State Management**
   - Create interface for managing canvas state
   - Implement functions to add, modify, and remove primitives
   - Create functions for serialization and deserialization of canvas

## Data Types
```typescript
interface CanvasState {
  elements: CanvasElement[];
  viewport: Viewport;
  selectedElement: string | null;
  currentTool: PrimitiveType | null;
}

interface Viewport {
  position: Position;
  zoom: number;
  rotation: number;
}

interface CanvasElement {
  id: string;
  type: PrimitiveType;
  position: Position;
  properties: Record<string, any>;
  locked?: boolean;
  visible?: boolean;
}
```

## Algorithm
1. On component mount:
   - Import SVG.js and plugins dynamically
   - Create SVG canvas element
   - Initialize viewport and state management
2. For each primitive type:
   - Create SVG element creation function
   - Implement interaction handlers (drag, resize, etc.)
3. For canvas state management:
   - Implement functions to add, modify, delete elements
   - Create serialization/deserialization methods
   - Handle viewport transformations

## Acceptance Criteria
- SVG.js is successfully installed and working in the Next.js application
- All necessary plugins are installed and functional
- SVG canvas can be initialized properly in components
- Helper functions work correctly for common operations
- Canvas state management is properly implemented