# Task 19: Add Validation Warnings

## Objective
Add validation warnings for improperly positioned zones and save their state.

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

## Acceptance Criteria
- Zones outside walls are visually highlighted with warnings
- Validation state is preserved when saving and loading files
- Users are warned when saving files with validation issues
- Overall canvas validation status is tracked and available
- Option to revalidate and check all zones is available
- Performance is maintained even with validation checks