# Task 2: Create Header with Toolbar

## Objective
Create the header component with toolbar containing undo/redo, save/load, and new canvas functionality.

## Primitives Overview
- Wall: Polygon with variable width and extrusion capability
- Zone: Polygon or ellipse with text and icon support, must be inside walls
- Text: For general annotations and room names
- Icon: For vegetables, warnings, alerts, and culture indicators
- Background Image: Uploadable images that can be scaled and positioned

## Detailed Steps

1. **Design and Create Header Component**
   - Create a header component using ShadCN UI components
   - Implement responsive design that works on different screen sizes
   - Add application title/logo area

2. **Implement Undo/Redo Functionality**
   - Create undo button with visual indication of availability
   - Create redo button with visual indication of availability
   - Add keyboard shortcuts (Ctrl+Z for undo, Ctrl+Y/Shift+Z for redo)
   - Connect to future command pattern implementation

3. **Implement Save/Load Functionality**
   - Create save button with file save dialog
   - Create load button with file open dialog
   - Add visual feedback during save/load operations
   - Show notifications for successful operations

4. **Implement New Canvas Functionality**
   - Create new canvas button
   - Implement confirmation dialog for unsaved changes
   - Clear all canvas elements when creating new canvas

5. **Toolbar Styling and Layout**
   - Position toolbar elements logically and aesthetically
   - Apply consistent styling with the application theme
   - Ensure toolbar buttons are easily accessible

6. **Keyboard Shortcuts and Accessibility**
   - Implement keyboard shortcuts for all toolbar actions
   - Ensure accessibility compliance (ARIA labels, etc.)
   - Add tooltips for toolbar buttons

## Data Types
```typescript
interface ToolbarState {
  canUndo: boolean;
  canRedo: boolean;
  hasUnsavedChanges: boolean;
}

type ToolbarAction = 'undo' | 'redo' | 'save' | 'load' | 'new';
```

## Algorithm
1. Initialize header component with default toolbar state
2. For each toolbar action:
   - Validate current state allows the action
   - Execute the action
   - Update toolbar state
   - Provide visual feedback to user
3. Handle keyboard shortcuts by mapping to appropriate toolbar actions

## Acceptance Criteria
- Header contains all required toolbar functionality (undo/redo, save/load, new canvas)
- Buttons are properly enabled/disabled based on context
- Keyboard shortcuts work for all toolbar actions
- Toolbar is visually consistent with the rest of the application
- Visual feedback is provided during save/load operations
- Confirmation dialog appears when creating new canvas with unsaved changes