# Task 19: Implement Save/Load Functionality

## Objective
Implement save/load functionality to/from file.

## Primitives Overview
- Wall: Polygon with variable width and extrusion capability
- Zone: Polygon or ellipse with text and icon support, must be inside walls
- Text: For general annotations and room names
- Icon: For vegetables, warnings, alerts, and culture indicators
- Background Image: Uploadable images that can be scaled and positioned

## Detailed Steps

1. **Define Data Structure for Serialization**
   - Create a comprehensive data structure that captures the entire canvas state
   - Include all primitives (walls, zones, text, icons, background images)
   - Store positions, properties, relationships, and validation states
   - Include canvas viewport state (position, zoom level)

2. **Implement Save Functionality**
   - Create function to serialize all canvas elements to JSON format
   - Include metadata like version information for compatibility
   - Handle file saving through browser's file system API
   - Implement file naming and saving dialog

3. **Implement Load Functionality**
   - Create function to deserialize JSON data back to canvas state
   - Parse the stored data structure and recreate all canvas elements
   - Validate file format and handle errors gracefully
   - Handle file loading through browser's file input

4. **Handle Complex Element Relationships**
   - Properly serialize relationships between walls and zones
   - Store validation states of zones (whether they're inside walls)
   - Preserve command history state if needed
   - Handle references between different elements correctly

5. **Implement Error Handling**
   - Handle corrupted or incompatible save files
   - Provide user-friendly error messages for loading failures
   - Validate file format before attempting to load
   - Implement fallback mechanisms for version mismatches

6. **Implement File Format**
   - Define a standard file format (likely JSON) for save files
   - Include version information to handle future format changes
   - Document the file format for potential external use

7. **Optimize Performance**
   - Optimize serialization for large projects
   - Consider compression if file sizes become too large
   - Optimize deserialization for quick loading

8. **Integrate with Toolbar**
   - Connect save/load functionality to toolbar buttons
   - Provide visual feedback during save/load operations
   - Handle "unsaved changes" warning when appropriate

9. **Validate Loaded Content**
   - Revalidate zones after loading to ensure they're positioned correctly
   - Check that all relationships are preserved after loading
   - Run validation checks on loaded elements

## Data Types
```typescript
interface CanvasSaveData {
  version: string;
  createdAt: Date;
  updatedAt: Date;
  elements: CanvasElement[];
  viewport: Viewport;
  commandHistory?: CommandHistory;
  validationStates: {
    [elementId: string]: ZoneValidationResult;
  };
  metadata: {
    name: string;
    description?: string;
    author?: string;
  };
}

interface SaveOptions {
  includeCommandHistory: boolean;
  includeValidationStates: boolean;
  format: 'json' | 'custom';
}
```

## Algorithm
1. For save operation:
   - Collect all canvas elements into a structured format
   - Include viewport state (position, zoom)
   - Include command history if option is enabled
   - Include validation states for all elements
   - Serialize to JSON with proper versioning
   - Trigger file download with appropriate name
2. For load operation:
   - Open file selection dialog
   - Read selected file as text
   - Parse JSON data and validate format/version
   - Check for compatibility issues
   - Clear current canvas state
   - Recreate all elements from saved data
   - Restore viewport state
   - Restore command history if available
   - Revalidate all elements after loading
3. For error handling:
   - Validate file format before processing
   - Show error messages for invalid files
   - Implement fallback for version mismatches
   - Handle corrupted files gracefully
4. For performance optimization:
   - Implement progressive loading for large files
   - Consider compression for large projects
   - Optimize JSON serialization for speed
5. For validation after load:
   - Run validation on all loaded zones
   - Update visual state for any invalid zones
   - Store validation results in appropriate data structures

## Acceptance Criteria
- Canvas state can be saved to a file in JSON format
- Saved files include all elements (walls, zones, text, icons, background images)
- Files can be loaded to restore the exact canvas state
- Validation states are preserved through save/load operations
- Error handling is in place for corrupted or incompatible files
- Save/load operations are integrated with the toolbar
- Performance is acceptable for large projects
- File versioning allows for future format changes
- Loaded content is properly validated