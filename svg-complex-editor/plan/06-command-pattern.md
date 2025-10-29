# Task 6: Implement Command Pattern for Undo/Redo

## Objective
Implement command pattern for undo/redo functionality.

## Primitives Overview
- Wall: Polygon with variable width and extrusion capability
- Zone: Polygon or ellipse with text and icon support, must be inside walls
- Text: For general annotations and room names
- Icon: For vegetables, warnings, alerts, and culture indicators
- Background Image: Uploadable images that can be scaled and positioned

## Detailed Steps

1. **Create Command Interface**
   - Define a Command interface with execute(), undo(), and redo() methods
   - This interface will be implemented by all command classes

2. **Create Command History Manager**
   - Create a class to manage command history
   - Maintain stacks for executed commands and undone commands
   - Implement methods for executing, undoing, and redoing commands
   - Limit the history size to prevent memory issues

3. **Implement Specific Command Classes**
   - Create command classes for different operations:
     - AddElementCommand - for adding any primitive to the canvas
     - RemoveElementCommand - for removing primitives
     - MoveElementCommand - for moving elements
     - ModifyElementCommand - for modifying element properties
     - AddBackgroundImageCommand - for adding background images
     - RemoveBackgroundImageCommand - for removing background images
   - Each command should store the necessary state to execute, undo, and redo

4. **Integrate with Canvas Operations**
   - Wrap all user operations with command pattern
   - Ensure each operation creates and executes the appropriate command
   - Add UI elements for undo/redo functionality (buttons, shortcuts)

5. **Handle Complex State Changes**
   - For complex operations affecting multiple elements, implement composite commands
   - Ensure proper state management when commands are undone/redone

## Data Types
```typescript
interface Command {
  execute(): void;
  undo(): void;
  redo(): void;
  timestamp: Date;
}

interface CommandHistory {
  executed: Command[];
  undone: Command[];
  maxSize: number;
}

interface ElementState {
  id: string;
  type: PrimitiveType;
  properties: Record<string, any>;
  position: Position;
  dimensions?: Dimensions;
}
```

## Algorithm
1. Initialize command history manager with empty stacks
2. For each user action that modifies canvas:
   - Create appropriate command object with current state
   - Execute the command
   - Push command to executed stack
   - Clear undone stack (since new action breaks redo chain)
   - Update toolbar state (enable/disable undo/redo buttons)
3. For undo operation:
   - Pop command from executed stack
   - Call undo() on the command
   - Push command to undone stack
   - Update toolbar state
4. For redo operation:
   - Pop command from undone stack
   - Call execute() on the command
   - Push command to executed stack
   - Update toolbar state

## Acceptance Criteria
- User can undo and redo all supported operations
- Command history is properly maintained
- Complex operations are handled correctly
- UI provides clear indication of available undo/redo actions
- Performance is acceptable even with large command history
- Command pattern properly integrated with all canvas operations