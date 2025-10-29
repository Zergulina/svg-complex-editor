# Task 8: Implement Zone Validation

## Objective
Implement zone validation - must be inside walls, no intersection with other zones.

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

## Acceptance Criteria
- Zones cannot be placed outside wall boundaries
- Zones cannot intersect with other zones
- Visual feedback is provided for invalid placements
- Real-time validation occurs during zone movement
- Validation state persists when saving/reloading