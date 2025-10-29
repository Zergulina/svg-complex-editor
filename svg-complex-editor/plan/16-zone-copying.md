# Task 16: Implement Zone Copying Functionality

## Objective
Implement zone copying functionality - click, copy button, placement.

## Detailed Steps

1. **Implement Zone Selection**
   - Allow users to click on a zone to select it
   - Provide visual indication of selected zone
   - Show hover UI with copy button when zone is hovered

2. **Implement Copy Button**
   - Add copy button to zone hover UI
   - Ensure button is visible but doesn't interfere with other interactions
   - Provide visual feedback when button is clicked

3. **Create Zone Copy**
   - When copy button is clicked, create a copy of the selected zone
   - Preserve all properties of the original zone (shape, text, icons, etc.)
   - Offset the copy slightly from original to make both visible

4. **Implement Clone Attachment to Mouse**
   - Attach the copied zone to the mouse cursor after copying
   - Show the zone following the mouse movement
   - Maintain the zone's visual appearance during movement

5. **Implement Placement Validation**
   - Check if the zone copy can be placed at the current mouse position
   - Validate that the zone would be inside walls
   - Validate that the zone would not intersect with other zones
   - Provide visual feedback for valid and invalid placement locations

6. **Implement Actual Placement**
   - When user clicks to place the copy, create a new zone at that location
   - Ensure the placement follows validation rules
   - Add the new zone to the canvas and selection

7. **Implement Cancellation**
   - Allow user to cancel the copy operation
   - Use Escape key to cancel placing the copied zone
   - Return to normal state when copy operation is cancelled

8. **Implement Visual Feedback**
   - Show translucent/ghost version of zone during movement
   - Change appearance when zone is in valid vs invalid placement location
   - Provide clear visual indication of the copy operation state

9. **Update Command Pattern**
   - Create appropriate command for zone copying operation
   - Ensure the copy operation can be undone/redone
   - Properly integrate with existing command history

## Acceptance Criteria
- Users can click on a zone and see a copy button
- Clicking the copy button creates a copy that follows the mouse
- Copy operation provides validation feedback during placement
- Zones are only placed in valid locations (inside walls, no intersection)
- Copy operation can be cancelled with Escape key
- Copy operation is added to undo/redo history