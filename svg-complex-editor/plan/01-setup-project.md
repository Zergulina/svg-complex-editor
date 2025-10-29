# Task 1: Setup Project Structure

## Objective
Setup the Next.js project with TypeScript and configure ShadCN UI components.

## Primitives Overview
- Wall: Polygon with variable width and extrusion capability
- Zone: Polygon or ellipse with text and icon support, must be inside walls
- Text: For general annotations and room names
- Icon: For vegetables, warnings, alerts, and culture indicators
- Background Image: Uploadable images that can be scaled and positioned

## Detailed Steps

1. **Initialize Next.js Project with TypeScript**
   - Ensure the project is created with Next.js and TypeScript
   - Verify package.json includes necessary dependencies
   - Check tsconfig.json for proper TypeScript configuration

2. **Install ShadCN UI Components**
   - Run the ShadCN installation command to add necessary dependencies
   - Configure the components directory as needed
   - Install required dependencies like Radix UI and Tailwind CSS

3. **Configure ShadCN Components**
   - Run ShadCN CLI to initialize components
   - Select the components that will be needed (buttons, dialogs, etc.)
   - Ensure proper integration with Tailwind CSS

4. **Setup Project Structure**
   - Organize components, lib, app directories as per the existing structure
   - Ensure proper configuration of next.config.ts
   - Verify postcss.config.mjs and eslint.config.mjs are properly configured

## Data Types
```typescript
type PrimitiveType = 'wall' | 'zone' | 'text' | 'icon' | 'background';

interface Position {
  x: number;
  y: number;
}

interface Dimensions {
  width: number;
  height: number;
}
```

## Acceptance Criteria
- Project successfully compiles without errors
- ShadCN components can be imported and used in components
- TypeScript is properly configured with Next.js
- Tailwind CSS is working correctly with the application