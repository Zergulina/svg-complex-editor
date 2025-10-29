# Task 10: Implement Zone Validation

## Objective
Implement zone validation - must be inside walls, no intersection with other zones.

## Primitives Overview
- Wall: Polygon with variable width and extrusion capability
- Zone: Polygon or ellipse with text and icon support, must be inside walls
- Text: For general annotations and room names
- Icon: For vegetables, warnings, alerts, and culture indicators
- Background Image: Uploadable images that can be scaled and positioned

## Detailed Steps

1. **Implement Inside-Walls Check**
   - Create algorithm to check if a zone is completely inside wall boundaries
   - For polygon zones, check that all vertices are inside walls
   - For ellipse zones, check that boundary points are inside walls
   - Handle complex wall shapes (including concave shapes)

2. **Implement Zone Intersection Check**
   - Create algorithm to check if zones intersect with each other
   - Calculate intersection between polygon zones
   - Calculate intersection between ellipse zones
   - Calculate intersection between polygon and ellipse zones
   - Prevent creation or movement of zones that would cause intersections

3. **Visual Feedback for Validation**
   - Provide visual feedback when zone is outside walls
   - Show visual warning when zones would intersect
   - Highlight invalid zones in a different color
   - Prevent placement of invalid zones

4. **Real-time Validation**
   - Implement real-time validation during zone movement
   - Prevent dragging zones outside walls
   - Prevent dragging zones to intersect with other zones
   - Show preview of placement with validation feedback

5. **Validation State Management**
   - Track validation state for each zone
   - Save validation state to ensure warnings persist
   - Implement function to revalidate all zones when walls change

6. **Performance Optimization**
   - Optimize validation algorithms for performance
   - Use spatial indexing if needed for large numbers of zones
   - Consider caching results where appropriate

## Data Types
```typescript
interface ZoneValidationResult {
  isValid: boolean;
  errors: ZoneValidationError[];
}

type ZoneValidationError = 
  | 'OUTSIDE_WALLS'
  | 'INTERSECTS_OTHER_ZONE'
  | 'INVALID_SHAPE';

interface ValidationCache {
  [zoneId: string]: ZoneValidationResult;
  lastValidatedAt: Date;
}
```

## Algorithm
1. For zone creation/movement:
   - Calculate potential new position/shape for the zone
   - Run inside-walls validation:
     * For each wall, determine if zone is inside using point-in-polygon tests
     * For ellipses, sample multiple boundary points to check containment
   - Run intersection validation:
     * Compare against all other zones using geometric intersection algorithms
     * Handle polygon-polygon, polygon-ellipse, and ellipse-ellipse cases
   - Update visual feedback based on validation results
2. For real-time validation during drag:
   - Calculate zone preview at current mouse position
   - Run validation on preview without modifying actual zone
   - Update visual styling of preview (e.g., red outline for invalid)
3. For wall changes:
   - When walls are modified, revalidate all zones
   - Update validation cache for affected zones
4. For validation cache:
   - Cache results for each zone with timestamp
   - Invalidate cache when related elements change
   - Recalculate only when necessary to maintain performance

## Acceptance Criteria
- Zones cannot be placed outside wall boundaries
- Zones cannot intersect with other zones
- Visual feedback is provided for invalid placements
- Real-time validation occurs during zone movement
- Validation state persists when saving/reloading
- Performance remains acceptable with multiple zones
- Zone validation is integrated with command pattern for undo/redo