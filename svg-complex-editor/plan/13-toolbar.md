# Task 13: Implement Toolbar

## Objective
Implement toolbar with undo/redo, save/load, new canvas functionality.

## Detailed Steps

1. **Design Toolbar UI**
   - Create a toolbar component using ShadCN UI components
   - Plan layout with buttons for all required functionality
   - Ensure toolbar is intuitive and user-friendly

2. **Implement Undo/Redo Buttons**
   - Create undo button that executes the undo command from the command pattern
   - Create redo button that executes the redo command from the command pattern
   - Add visual indication of whether undo/redo is available
   - Implement keyboard shortcuts (Ctrl+Z for undo, Ctrl+Y or Ctrl+Shift+Z for redo)

3. **Implement Save Button**
   - Create button to trigger save functionality
   - Implement save dialog to specify filename/location
   - Connect to the save functionality that will serialize the canvas state
   - Add visual feedback during save operation

4. **Implement Load Button**
   - Create button to trigger load functionality
   - Implement file selection dialog
   - Connect to the load functionality that will deserialize the canvas state
   - Add visual feedback during load operation

5. **Implement New Canvas Button**
   - Create button to create a new empty canvas
   - Implement confirmation dialog if there are unsaved changes
   - Reset all canvas state when creating new canvas
   - Clear command history when creating new canvas

6. **Toolbar Styling and Positioning**
   - Position toolbar appropriately (top, side, or floating)
   - Apply consistent styling with the application theme
   - Ensure toolbar buttons are easily accessible

7. **Keyboard Shortcuts**
   - Implement keyboard shortcuts for all toolbar actions
   - Maintain consistency with common application shortcuts
   - Add visual indication of keyboard shortcuts on buttons

8. **Toolbar State Management**
   - Enable/disable buttons based on current state (e.g., disable undo when no actions to undo)
   - Update button states based on canvas state
   - Provide visual feedback about current state

## Acceptance Criteria
- Toolbar provides access to all required functionality (undo/redo, save/load, new canvas)
- Buttons are properly enabled/disabled based on context
- Keyboard shortcuts work for all toolbar actions
- Toolbar is visually consistent with the rest of the application
- Visual feedback is provided during save/load operations