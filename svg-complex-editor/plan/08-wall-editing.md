# Task 8: Implement Wall Editing

## Objective
Implement wall editing - segment manipulation, extrusion, width adjustment.

## Primitives Overview
- Wall: Polygon with variable width and extrusion capability
- Zone: Polygon or ellipse with text and icon support, must be inside walls
- Text: For general annotations and room names
- Icon: For vegetables, warnings, alerts, and culture indicators
- Background Image: Uploadable images that can be scaled and positioned

## Detailed Steps

1. **Implement Wall Selection**
   - Enable selection of walls and individual segments
   - Show visual indicators for selected elements
   - Allow selection of multiple segments within a wall if needed

2. **Create Extrusion Functionality**
   - Implement ability to extrude wall segments
   - Handle extension of walls by adding new segments
   - Ensure proper connection between extruded segments
   - Implement visual handles for extrusion points

3. **Implement Width Adjustment**
   - Create handles for adjusting wall width
   - Update wall geometry when width changes
   - Ensure width adjustment affects only the selected segment or maintains consistency across connected segments

4. **Implement Segment Manipulation**
   - Allow moving individual vertices of wall segments
   - Maintain proper connections between adjacent segments
   - Ensure each segment remains at least a triangle after manipulation
   - Add visual handles for vertex manipulation

5. **Create Wall Closure Functionality**
   - Implement ability to close a wall (connect end to start)
   - Visual indication of possible closure points
   - Proper handling of the closed shape in the data structure

6. **Visual Feedback During Editing**
   - Provide visual feedback during editing operations
   - Show handles for manipulation points
   - Highlight affected areas during extrusion or width adjustment

## Data Types
```typescript
interface WallEditState {
  selectedWall: string | null;
  selectedSegment: string | null;
  editingMode: 'select' | 'extrude' | 'moveVertex' | 'adjustWidth';
  controlPoints: Position[];
  isDragging: boolean;
}

interface ModifyWallCommandPayload {
  wallId: string;
  beforeState: Wall;
  afterState: Wall;
}
```

## Algorithm
1. When wall is clicked:
   - Check if it's already selected
   - If selected, show editing controls (handles, vertices)
   - If not selected, deselect others and select this wall
2. For extrusion:
   - Show extrusion handle at endpoints
   - On dragging handle, create new segment connected to endpoint
   - Update wall geometry and create ModifyWallCommand
3. For width adjustment:
   - Show width adjustment handles along segments
   - On dragging handle, adjust segment width
   - Update connected segments as needed
   - Create ModifyWallCommand with before/after states
4. For vertex manipulation:
   - Show vertex handles at all points
   - On dragging vertex, update position and adjacent segments
   - Maintain proper connections and minimum triangle requirement
   - Create ModifyWallCommand with transformation
5. For wall closure:
   - When endpoints are close enough, show closure indicator
   - On closure action, connect endpoints and set isClosed flag
   - Create ModifyWallCommand for the closure operation

## Acceptance Criteria
- Wall segments can be extruded to extend the wall
- Wall width can be adjusted
- Individual segments can be manipulated while maintaining connections
- Walls can be closed if needed
- Visual feedback is provided during editing operations
- All editing operations are integrated with command pattern for undo/redo
- Wall integrity is maintained during all editing operations