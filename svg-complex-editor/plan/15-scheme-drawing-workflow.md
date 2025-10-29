# Task 15: Implement Complex Scheme Drawing Workflow

## Objective
Implement complex scheme drawing workflow - image upload, wall creation with extrusion.

## Primitives Overview
- Wall: Polygon with variable width and extrusion capability
- Zone: Polygon or ellipse with text and icon support, must be inside walls
- Text: For general annotations and room names
- Icon: For vegetables, warnings, alerts, and culture indicators
- Background Image: Uploadable images that can be scaled and positioned

## Detailed Steps

1. **Implement Image Upload Workflow**
   - Create UI for uploading reference images
   - Allow multiple images to be uploaded for complex schemes
   - Provide visual feedback during upload process

2. **Implement Image Adjustment Tools**
   - Create tools to adjust position, scale, and rotation of uploaded images
   - Allow alignment of multiple images to form composite reference
   - Provide visual guides for precise positioning

3. **Implement Wall Creation Tool**
   - Create tool for drawing initial wall segments
   - Allow user to specify starting point for first segment
   - Provide visual feedback during wall drawing process

4. **Implement Wall Extrusion Workflow**
   - Create visual handles for extruding wall segments
   - Allow user to drag to extend walls in desired direction
   - Provide real-time feedback during extrusion process
   - Allow adjustment of wall width during or after extrusion

5. **Implement Wall Closing Functionality**
   - Provide visual indication when wall can be closed
   - Implement function to close wall by connecting end to start
   - Validate that closed wall forms a proper shape

6. **Implement Wall Validation During Drawing**
   - Provide real-time feedback if walls would intersect with each other
   - Validate proper connections between segments
   - Warn user about potential issues during the drawing process

7. **Implement Wall Selection and Editing**
   - Allow user to select existing walls for modification
   - Provide editing tools for selected walls
   - Enable modification of wall segments after creation

8. **Workflow Integration**
   - Ensure seamless transition between image upload, wall creation, and modification
   - Provide clear visual feedback throughout the workflow
   - Implement appropriate undo/redo support for the entire workflow

9. **User Guidance**
   - Provide tooltips or guidance during the workflow
   - Show examples of proper usage
   - Add visual indicators for next steps in the process

## Data Types
```typescript
interface DrawingWorkflowState {
  currentStep: 'upload' | 'position' | 'wall-planning' | 'wall-creation' | 'modification';
  selectedTool: 'select' | 'wall' | 'zone' | 'text' | 'icon' | 'background';
  activeImageId: string | null;
  activeWallId: string | null;
  wallWidth: number;
  temporaryElement: CanvasElement | null;
}

interface ComplexScheme {
  id: string;
  name: string;
  backgroundImageIds: string[];
  wallIds: string[];
  zoneIds: string[];
  textIds: string[];
  iconIds: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

## Algorithm
1. Initialize workflow in 'upload' state
2. For image upload step:
   - Show upload UI in toolbar/sidebar
   - Process uploaded images and add to canvas as background
   - Transition to 'position' state
3. For image positioning step:
   - Allow user to adjust position, scale, rotation of images
   - Show alignment guides when positioning near other images
   - Transition to 'wall-planning' when ready
4. For wall creation step:
   - Switch to wall tool
   - Wait for first click to start wall
   - On subsequent clicks/drag, create wall segments
   - Show real-time preview of wall as it's being created
   - On double-click or Enter, finalize wall creation
5. For wall extrusion:
   - Show extrusion handles on selected wall
   - On dragging handle, extend wall in that direction
   - Create new segments as needed
   - Maintain proper connections between segments
6. For wall validation:
   - Continuously check for wall intersections during creation
   - Show warnings for invalid configurations
   - Prevent creation of invalid walls
7. For workflow state management:
   - Track current step in the workflow
   - Show appropriate UI based on current step
   - Enable/disable tools based on current workflow state

## Acceptance Criteria
- Users can upload reference images and adjust their position
- Users can create walls by drawing initial segments
- Users can extrude walls to extend them
- Wall width can be adjusted during extrusion
- Walls can be closed to form complete structures
- Real-time validation prevents invalid wall configurations
- Complete workflow supports complex scheme creation
- Workflow steps are clearly guided and intuitive
- All workflow operations are integrated with command pattern