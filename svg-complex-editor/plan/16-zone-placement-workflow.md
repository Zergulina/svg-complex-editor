# Task 16: Implement Zone Placement Workflow

## Objective
Implement zone placement workflow - shape selection, placement inside walls.

## Primitives Overview
- Wall: Polygon with variable width and extrusion capability
- Zone: Polygon or ellipse with text and icon support, must be inside walls
- Text: For general annotations and room names
- Icon: For vegetables, warnings, alerts, and culture indicators
- Background Image: Uploadable images that can be scaled and positioned

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

## Data Types
```typescript
interface ZonePlacementState {
  isPlacing: boolean;
  selectedShape: ZoneShapeType;
  sidesCount: number; // For polygon zones
  previewZone: Zone | null;
  validationFeedback: ZoneValidationResult | null;
  textLabel: string;
  cultureIcon: string | null;
  additionalIcons: string[];
  zoneColor: string;
}

interface PlacementConstraints {
  allowOutsideWalls: boolean;
  allowZoneOverlap: boolean;
  minSize: Dimensions;
  maxSize: Dimensions;
}
```

## Algorithm
1. Initialize zone placement state with default values
2. For shape selection:
   - Show shape options in sidebar/tool panel
   - Update placement state when user selects a shape
   - For polygons, allow specifying number of sides (3-100)
3. For zone placement:
   - When zone tool is selected, enter placement mode
   - Create temporary zone preview at mouse position
   - Update preview position on mouse move
   - Run validation on preview position/shape
4. For validation feedback:
   - Check if zone is inside any wall boundary
   - Check if zone intersects with existing zones
   - Update preview styling (green for valid, red for invalid)
   - Show error messages for validation failures
5. For zone confirmation:
   - On mouse click, if placement is valid, create the zone
   - Apply configured properties (text, icons, color)
   - Create AddElementCommand for the new zone
   - Exit placement mode
6. For zone configuration:
   - Show property panel during placement
   - Allow real-time updates to text, icons, colors
   - Update preview as properties change
7. For constraints enforcement:
   - Validate all constraints before allowing placement
   - Show clear feedback when constraints are violated
   - Guide user toward valid placement areas

## Acceptance Criteria
- Users can select zone shape (polygon with specified sides or ellipse)
- Users can place zones on the canvas with real-time validation
- Zones cannot be placed outside wall boundaries
- Zones cannot overlap with existing zones
- Users can configure text labels and icons during placement
- Zone sizing and positioning works as expected
- Placement workflow provides clear guidance and feedback
- All zone placement operations are integrated with command pattern