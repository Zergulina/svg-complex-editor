# Task 17: Implement Wall Deletion

## Objective
Implement wall deletion (entire wall or individual segments) and zone validation after deletion.

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

## Acceptance Criteria
- Users can delete entire walls or individual segments
- Deleting a segment splits the wall into separate objects when needed
- Zone validation runs after wall deletion
- Zones outside wall boundaries are visually highlighted
- Warning system indicates when there are zones outside walls
- Deletion operations can be undone/redone