# Task 11: Create Text Primitive

## Objective
Create text primitive for general annotations (naming rooms).

## Primitives Overview
- Wall: Polygon with variable width and extrusion capability
- Zone: Polygon or ellipse with text and icon support, must be inside walls
- Text: For general annotations and room names
- Icon: For vegetables, warnings, alerts, and culture indicators
- Background Image: Uploadable images that can be scaled and positioned

## Detailed Steps

1. **Define Text Data Structure**
   - Create a Text class/structure that holds text content, position, font properties, etc.
   - Include properties for position (x, y coordinates), text content, font size, color, etc.
   - Add properties for text alignment and styling options

2. **Create Text Rendering Logic**
   - Implement function to render text as SVG text elements
   - Handle positioning of text on the canvas
   - Ensure text is readable with appropriate contrast against background

3. **Implement Text Creation**
   - Create function to add a text element to the canvas
   - Allow specifying initial position and text content
   - Set default font properties (size, color, family)
   - Integrate with command pattern for undo/redo

4. **Implement Text Editing**
   - Allow users to edit text content after creation
   - Provide UI for modifying text properties (font size, color, etc.)
   - Implement double-click to edit functionality or similar

5. **Implement Text Positioning**
   - Allow moving text elements around the canvas
   - Provide visual handles for position adjustment
   - Ensure text remains readable after positioning

6. **Text Styling Options**
   - Implement options for font family, size, color
   - Add text alignment options (left, center, right)
   - Consider options for background highlighting if needed

7. **Integration with Other Elements**
   - Ensure text elements can be layered appropriately with other primitives
   - Handle selection and manipulation of text elements
   - Consider interaction with other elements (walls, zones, etc.)

## Data Types
```typescript
interface TextElement {
  id: string;
  position: Position;
  content: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor?: string;
  alignment: 'left' | 'center' | 'right';
  rotation?: number;
  createdAt: Date;
  updatedAt: Date;
}

interface TextProperties {
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor?: string;
  padding: number;
  borderRadius: number;
}
```

## Algorithm
1. When text tool is selected:
   - Initialize temporary text creation mode
   - Show text input options in toolbar/sidebar
2. On canvas click:
   - Create temporary text element at click position
   - Show text input field with default content
3. On text input:
   - Update temporary text element with user input
   - Adjust size based on content length
4. On confirmation (Enter key or click away):
   - Finalize text creation
   - Create AddElementCommand for the new text
   - Add text to canvas and command history
5. For text editing:
   - On double-click text element, show editable input field
   - On text change, create ModifyElementCommand
6. For text rendering:
   - Position SVG text element at specified coordinates
   - Apply font properties and styling
   - Add background rectangle if needed for readability

## Acceptance Criteria
- Text elements can be created on the canvas
- Text content can be edited after creation
- Text elements can be positioned anywhere on the canvas
- Text has appropriate styling options (font, size, color)
- Text elements can be selected and manipulated
- Text creation is integrated with command pattern for undo/redo
- Text remains readable with appropriate contrast