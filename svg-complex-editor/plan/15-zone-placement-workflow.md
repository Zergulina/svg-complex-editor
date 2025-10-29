# Task 15: Implement Zone Placement Workflow

## Objective
Implement zone placement workflow - shape selection, placement inside walls.

## Detailed Steps

1. **Implement Shape Selection UI**
   - Create UI for selecting zone shape (polygon or ellipse)
   - For polygon selection, allow specifying number of sides (3-100)
   - Provide visual preview of selected shape
   - Add quick selection options for common shapes (triangle, square, pentagon, etc.)

2. **Implement Zone Placement Tool**
   - Create tool for placing zones on the canvas
   - Allow user to specify position for the zone
   - Provide visual preview of zone during placement
   - Show zone dimensions while placing

3. **Implement Zone Validation During Placement**
   - Check if zone would be placed inside wall boundaries
   - Check if zone would intersect with existing zones
   - Provide visual feedback for valid and invalid placement locations
   - Show live validation as user moves zone for placement

4. **Implement Zone Configuration**
   - Allow specifying text label for the zone
   - Allow selecting culture icon for the zone
   - Allow adding additional icons to the zone
   - Provide UI for configuring these properties during or after placement

5. **Implement Zone Sizing**
   - Allow adjusting zone size during placement
   - Provide manual size input options
   - Maintain aspect ratio for ellipses when applicable

6. **Implement Zone Snapping**
   - Add snapping functionality to align zones with walls or other elements
   - Allow grid snapping if enabled
   - Provide visual indicators for snapping points

7. **Implement Placement Constraints**
   - Ensure zones cannot be placed outside wall boundaries
   - Prevent placement where zones would overlap with existing zones
   - Show clear visual feedback when placement is invalid

8. **User Guidance**
   - Provide tooltips or guidance during zone placement
   - Show examples of proper zone placement
   - Add visual indicators for placement constraints

## Acceptance Criteria
- Users can select zone shape (polygon with specified sides or ellipse)
- Users can place zones on the canvas with real-time validation
- Zones cannot be placed outside wall boundaries
- Zones cannot overlap with existing zones
- Users can configure text labels and icons during placement
- Zone sizing and positioning works as expected