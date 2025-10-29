# Task 18: Implement Wall Deletion

## Objective
Implement wall deletion (entire wall or individual segments) and zone validation after deletion.

## Primitives Overview
- Wall: Polygon with variable width and extrusion capability
- Zone: Polygon or ellipse with text and icon support, must be inside walls
- Text: For general annotations and room names
- Icon: For vegetables, warnings, alerts, and culture indicators
- Background Image: Uploadable images that can be scaled and positioned

## Detailed Steps

1. **Implement Wall Selection**
   - Allow users to select an entire wall
   - Provide visual indication of selected wall
   - Show context menu or controls when wall is selected

2. **Implement Entire Wall Deletion**
   - Add delete button or keyboard shortcut for deleting entire wall
   - Show confirmation dialog if wall deletion might affect zones
   - Remove the wall from the canvas and data structures
   - Update command history for undo/redo functionality

3. **Implement Segment Deletion**
   - Allow selection of individual wall segments
   - Provide visual indication of selected segment
   - Add delete option for individual segments
   - When a segment is deleted, split the wall into separate wall objects if needed

4. **Handle Wall Splitting**
   - When deleting a segment that splits a wall, create two separate wall objects
   - Maintain proper connections in the remaining segments
   - Update all references to the wall elements

5. **Implement Zone Validation After Deletion**
   - After wall deletion (entire wall or segments), validate all zones
   - Check which zones are now outside wall boundaries
   - Highlight these zones visually
   - Update zone validation states

6. **Implement Visual Feedback for Invalid Zones**
   - Highlight zones that are no longer inside walls
   - Provide visual indication that these zones are in invalid state
   - Maintain this highlighting until the issue is resolved

7. **Update Command Pattern**
   - Create appropriate commands for wall and segment deletion
   - Ensure deletions can be undone/redone
   - Include zone validation state in the commands where needed

8. **Implement Warning System**
   - When saving, warn about zones that are not inside walls
   - Store the invalid state so warnings persist after saving/loading
   - Allow saving even with invalid zones but provide clear warnings

9. **User Guidance**
   - Provide clear visual feedback about what will be deleted
   - Show confirmation for potentially destructive operations
   - Inform users about impact on zones when walls are deleted

## Data Types
```typescript
interface WallDeletionState {
  selectedWallId: string | null;
  selectedSegmentId: string | null;
  deletionMode: 'none' | 'select-wall' | 'select-segment';
  showConfirmation: boolean;
  affectedZones: string[]; // IDs of zones that will become invalid
}

interface DeleteWallCommandPayload {
  deletedWall: Wall;
  affectedZonesBefore: Zone[];
  affectedZonesAfter: Zone[];
  wasSplit: boolean;
}
```

## Algorithm
1. For wall selection:
   - On mouse click on a wall, select the entire wall
   - Show selection handles and context controls
   - Check for affected zones and store in state
2. For segment selection:
   - On click on a specific segment, select only that segment
   - Show segment-specific controls and handles
   - Determine if deletion would split the wall
3. For delete initiation:
   - On delete key press or delete button click
   - Check if deletion would affect any zones
   - If zones would be affected, show confirmation dialog
4. For deletion confirmation:
   - If confirmed, create appropriate command object
   - Remove wall/segment from canvas
   - If wall is split, create new wall objects from remaining segments
   - Revalidate all zones on the canvas
   - Update validation status for any zones now outside walls
   - Add command to history
5. For zone validation after deletion:
   - Run validation on all existing zones
   - Check if any zones are now outside wall boundaries
   - Update validation status and visual styling for invalid zones
6. For command pattern integration:
   - Create DeleteWallCommand with before/after state
   - Store affected zones' state before and after deletion
   - Add command to executed stack
7. For undo/redo:
   - Undo should restore the deleted wall/segment
   - Restore original validation state of affected zones
   - Redo should reapply the deletion

## Acceptance Criteria
- Users can delete entire walls or individual segments
- Deleting a segment splits the wall into separate objects when needed
- Zone validation runs after wall deletion
- Zones outside wall boundaries are visually highlighted
- Warning system indicates when there are zones outside walls
- Deletion operations can be undone/redone
- Confirmation dialog appears when deletion affects zones
- Wall deletion is properly integrated with command pattern