import { useEffect, useState } from 'react';

// Type definitions for SVG.js and plugins
type SVG = any;
type SVGElement = any;

/**
 * A hook to safely load SVG.js library only on the client side
 */
export const useSVG = () => {
  const [SVG, setSVG] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Import SVG.js and plugins dynamically
      Promise.all([
        import('@svgdotjs/svg.js'),
        import('@svgdotjs/svg.draggable.js'),
        import('@svgdotjs/svg.select.js'),
        import('@svgdotjs/svg.resize.js'),
        import('@svgdotjs/svg.panzoom.js'),
      ]).then(([SVGModule, ...plugins]) => {
        // Initialize plugins
        const SVGConstructor = SVGModule.default;
        
        // Apply plugins
        plugins.forEach(plugin => {
          if (plugin.default) {
            SVGConstructor.use(plugin.default);
          }
        });
        
        setSVG(SVGConstructor);
        setIsLoaded(true);
      }).catch(error => {
        console.error('Failed to load SVG.js and plugins:', error);
      });
    }
  }, []);

  return { SVG, isLoaded };
};

/**
 * Helper function to initialize an SVG canvas
 */
export const initializeSVGCanvas = (containerId: string) => {
  if (typeof window === 'undefined') {
    console.warn('Cannot initialize SVG canvas on the server side');
    return null;
  }

  // Import everything dynamically since we're in the browser
  const SVG = (globalThis as any).SVG || (window as any).SVG;
  
  if (!SVG) {
    console.error('SVG.js library not available');
    return null;
  }

  const draw = SVG(containerId);
  return draw;
};

/**
 * Helper functions for creating different primitive types
 */
export const createWall = (canvas: any, points: { x: number, y: number }[], options: any = {}) => {
  if (!canvas) return null;
  
  // Create a path for the wall
  let pathData = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    pathData += ` L ${points[i].x} ${points[i].y}`;
  }
  
  const wall = canvas.path(pathData)
    .attr({
      fill: 'none',
      stroke: options.stroke || '#000000',
      strokeWidth: options.strokeWidth || 2,
    });
  
  // Make it draggable and selectable if plugins are available
  if (wall.draggable) wall.draggable();
  if (wall.selectize) wall.selectize();
  
  return wall;
};

export const createZone = (canvas: any, type: 'polygon' | 'ellipse', options: any = {}) => {
  if (!canvas) return null;
  
  let zone;
  
  if (type === 'ellipse') {
    zone = canvas.ellipse(options.rx * 2 || 100, options.ry * 2 || 50)
      .move(options.x - (options.rx || 50), options.y - (options.ry || 25));
  } else {
    // For polygon, generate points in a circular pattern
    const sides = options.sides || 3; // Default to triangle
    const centerX = options.x || 0;
    const centerY = options.y || 0;
    const radius = options.radius || 50;
    
    const points = [];
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 2; // Start from top
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points.push({ x, y });
    }
    
    let pathData = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      pathData += ` L ${points[i].x} ${points[i].y}`;
    }
    pathData += ' Z'; // Close the path
    
    zone = canvas.path(pathData)
      .attr({
        fill: options.fill || 'rgba(200, 200, 255, 0.5)',
        stroke: options.stroke || '#333333',
        strokeWidth: options.strokeWidth || 1,
      });
  }
  
  // Make it draggable and selectable if plugins are available
  if (zone.draggable) zone.draggable();
  if (zone.selectize) zone.selectize();
  if (zone.resize) zone.resize();
  
  return zone;
};

export const createText = (canvas: any, content: string, options: any = {}) => {
  if (!canvas) return null;
  
  const text = canvas.text(content)
    .move(options.x || 0, options.y || 0)
    .attr({
      fill: options.fill || '#000000',
      fontSize: options.fontSize || 16,
      fontFamily: options.fontFamily || 'Arial',
    });
  
  // Make it draggable if plugin is available
  if (text.draggable) text.draggable();
  
  return text;
};

export const createIcon = (canvas: any, iconPath: string, options: any = {}) => {
  if (!canvas) return null;
  
  // Create an image or use a symbol for the icon
  const icon = canvas.image(iconPath)
    .size(options.width || 32, options.height || 32)
    .move(options.x || 0, options.y || 0);
  
  // Make it draggable if plugin is available
  if (icon.draggable) icon.draggable();
  
  return icon;
};

export const createBackgroundImage = (canvas: any, imageUrl: string, options: any = {}) => {
  if (!canvas) return null;
  
  const bgImage = canvas.image(imageUrl)
    .size(options.width || canvas.width(), options.height || canvas.height())
    .move(options.x || 0, options.y || 0);
  
  // Make it draggable and selectable if plugins are available
  if (bgImage.draggable) bgImage.draggable();
  if (bgImage.selectize) bgImage.selectize();
  
  return bgImage;
};

/**
 * Helper function to manipulate existing elements
 */
export const updateElementPosition = (element: any, x: number, y: number) => {
  if (element && element.move) {
    element.move(x, y);
  }
};

export const updateElementSize = (element: any, width: number, height: number) => {
  if (element && element.size) {
    element.size(width, height);
  }
};

export const removeElement = (element: any) => {
  if (element && element.remove) {
    element.remove();
  }
};

export const setElementVisibility = (element: any, visible: boolean) => {
  if (element && element.style) {
    element.style('display', visible ? 'block' : 'none');
  }
};

export const setElementOpacity = (element: any, opacity: number) => {
  if (element && element.opacity) {
    element.opacity(opacity);
  }
};

/**
 * Type definitions for our canvas state
 */
export interface Position {
  x: number;
  y: number;
}

export interface Viewport {
  position: Position;
  zoom: number;
  rotation: number;
}

export type PrimitiveType = 'wall' | 'zone' | 'text' | 'icon' | 'background';

export interface CanvasElement {
  id: string;
  type: PrimitiveType;
  position: Position;
  properties: Record<string, any>;
  locked?: boolean;
  visible?: boolean;
}

export interface CanvasState {
  elements: CanvasElement[];
  viewport: Viewport;
  selectedElement: string | null;
  currentTool: PrimitiveType | null;
}