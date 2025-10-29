# Task 14: Create Background Image Editor

## Objective
Create background image editor - scale, position, overlay multiple images to combine large images.

## Primitives Overview
- Wall: Polygon with variable width and extrusion capability
- Zone: Polygon or ellipse with text and icon support, must be inside walls
- Text: For general annotations and room names
- Icon: For vegetables, warnings, alerts, and culture indicators
- Background Image: Uploadable images that can be scaled and positioned

## Detailed Steps

1. **Define Background Image Data Structure**
   - Create a BackgroundImage class/structure that holds image URL/source, position, scale, etc.
   - Include properties for position (x, y coordinates), scale, rotation, opacity
   - Add properties for layer order and positioning

2. **Implement Image Upload**
   - Create UI for uploading background images
   - Support common image formats (JPG, PNG, SVG, etc.)
   - Implement client-side validation for file types and sizes

3. **Implement Image Positioning**
   - Allow positioning of uploaded images on the canvas
   - Implement drag functionality to move images around
   - Provide coordinate inputs for precise positioning

4. **Implement Image Scaling**
   - Allow scaling of uploaded images
   - Provide uniform scaling and independent width/height scaling
   - Maintain aspect ratio option during scaling

5. **Implement Image Rotation**
   - Add rotation functionality for background images
   - Allow specifying rotation angle in degrees
   - Provide easy rotation controls (90° increments, free rotation)

6. **Implement Layer Management**
   - Enable multiple background images to be layered
   - Allow changing the z-order of background images
   - Provide opacity controls for each image

7. **Implement Image Overlay Functionality**
   - Allow precise positioning to overlay multiple images
   - Provide alignment tools to match up multiple images
   - Show visual guides when aligning multiple images

8. **Background Image Management**
   - Implement ability to add multiple background images
   - Allow selecting, moving, and removing individual background images
   - Provide visual indication of active background image

9. **Performance Optimization**
   - Optimize rendering of multiple background images
   - Consider using CSS background properties for better performance
   - Implement lazy loading if needed for large images

## Data Types
```typescript
interface BackgroundImage {
  id: string;
  src: string;
  position: Position;
  dimensions: Dimensions;
  rotation: number;
  opacity: number;
  zIndex: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface BackgroundImageProperties {
  opacity: number;
  rotation: number;
  lockAspectRatio: boolean;
  visible: boolean;
}
```

## Algorithm
1. For image upload:
   - Show file selection dialog
   - Validate file type and size
   - Create temporary image element
   - Add to background images list with default properties
2. For image positioning:
   - On drag start, record initial position and mouse coordinates
   - On drag, calculate new position based on mouse movement
   - Update image position in real-time
   - On drag end, create ModifyElementCommand
3. For image scaling:
   - Show resize handles at corners and edges
   - On dragging handle, adjust dimensions while maintaining aspect ratio if locked
   - Update image in real-time
   - On release, create ModifyElementCommand
4. For layer management:
   - Show z-index controls in properties panel
   - On z-index change, reorder images in rendering order
   - Create ModifyElementCommand for z-index changes
5. For multiple image alignment:
   - Show alignment guides when moving images near others
   - Provide snap-to functionality for precise alignment
   - Highlight alignment points

## Acceptance Criteria
- Background images can be uploaded and placed on the canvas
- Images can be positioned, scaled, and rotated
- Multiple images can be layered with adjustable opacity
- Images can be precisely aligned and overlaid
- Background images do not interfere with foreground elements
- Background image operations are integrated with command pattern for undo/redo
- Performance remains acceptable with multiple background images