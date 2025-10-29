# Task 20: Add Validation Warnings

## Objective
Add validation warnings for improperly positioned zones and save their state.

## Primitives Overview
- Wall: Polygon with variable width and extrusion capability
- Zone: Polygon or ellipse with text and icon support, must be inside walls
- Text: For general annotations and room names
- Icon: For vegetables, warnings, alerts, and culture indicators
- Background Image: Uploadable images that can be scaled and positioned

## Detailed Steps

1. **Implement Validation State Tracking**
   - Track which zones are properly positioned inside walls
   - Track which zones are outside wall boundaries (invalid zones)
   - Store this validation state in the zone data structure
   - Maintain validation state when saving/reloading

2. **Implement Visual Warning System**
   - Create visual indicators for zones that are outside walls
   - Change appearance of invalid zones (different color, border, etc.)
   - Optionally add warning icons on invalid zones
   - Ensure warnings are visible but not distracting

3. **Implement Canvas-Level Validation Status**
   - Track overall validation status of the canvas (OK vs not OK)
   - Store this status so it persists through save/reload operations
   - Show canvas status in UI when appropriate

4. **Implement Save-Time Warnings**
   - Check for invalid zones when user attempts to save
   - Show warning dialog if there are zones outside walls
   - Allow saving to proceed despite warnings
   - Indicate that the saved file contains validation issues

5. **Implement Load-Time Validation Checking**
   - When loading a file, check if it contains validation issues
   - Highlight any invalid zones after loading
   - Preserve the validation status from the saved file

6. **Implement Validation Rechecking**
   - Allow manual revalidation of all zones
   - Automatically revalidate when walls are modified (added, removed, changed)
   - Update validation warnings when elements are moved

7. **Implement Validation Report**
   - Create UI to list all validation issues
   - Allow users to navigate to invalid zones easily
   - Provide information about why each zone is invalid

8. **Optimize Validation Performance**
   - Cache validation results when appropriate
   - Only revalidate what's necessary when elements change
   - Use spatial indexing if needed for efficient validation

9. **User Guidance**
   - Provide hints about how to fix validation issues
   - Show which walls zones should be positioned within
   - Explain the impact of having zones outside walls

## Data Types
```typescript
interface CanvasValidationStatus {
  isValid: boolean;
  totalZones: number;
  invalidZones: number;
  validationIssues: ValidationIssue[];
  lastCheckedAt: Date;
}

interface ValidationIssue {
  elementId: string;
  elementType: PrimitiveType;
  errorType: ZoneValidationError;
  description: string;
  suggestedFix?: string;
  elementPosition: Position;
}

interface ValidationState {
  [elementId: string]: ZoneValidationResult;
  canvasStatus: CanvasValidationStatus;
  lastGlobalValidation: Date;
}
```

## Algorithm
1. For initial validation:
   - Run validation on all zones when canvas loads
   - Store validation results in validation state
   - Update visual appearance of invalid zones
   - Calculate overall canvas validation status
2. For zone-specific validation:
   - On zone creation, validate and store result
   - On zone movement, revalidate and update
   - On zone modification, revalidate and update
   - Update validation state and visual feedback
3. For wall-specific validation:
   - When a wall changes (moved, resized, deleted)
   - Revalidate all zones that were inside that wall
   - Update validation results and visual feedback
4. For save validation:
   - Check canvas validation status before saving
   - If invalid zones exist, show warning dialog
   - Allow user to proceed or fix issues before saving
   - Save validation state with the project
5. For load validation:
   - Load validation state from saved file
   - Apply visual styling to invalid zones
   - Update canvas validation status
6. For manual validation:
   - Provide button to revalidate entire canvas
   - Run validation on all elements
   - Update all visual feedback and status indicators
7. For validation reporting:
   - Create list of all validation issues
   - Show in separate UI panel
   - Allow clicking to jump to specific issues
8. For performance optimization:
   - Cache validation results
   - Use spatial indexing for faster zone-in-wall checks
   - Only revalidate affected zones when walls change

## Acceptance Criteria
- Zones outside walls are visually highlighted with warnings
- Validation state is preserved when saving and loading files
- Users are warned when saving files with validation issues
- Overall canvas validation status is tracked and available
- Option to revalidate and check all zones is available
- Performance is maintained even with validation checks
- Validation warnings are clear and actionable
- Validation status persists across save/load operations