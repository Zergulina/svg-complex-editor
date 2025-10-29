import { CanvasState, CanvasElement } from '@/lib/svg/svg-utils';

/**
 * Serialize the canvas state to JSON for saving
 */
export const serializeCanvasState = (state: CanvasState): string => {
  return JSON.stringify(state, null, 2);
};

/**
 * Deserialize the canvas state from JSON for loading
 */
export const deserializeCanvasState = (jsonString: string): CanvasState => {
  try {
    const parsed = JSON.parse(jsonString);
    
    // Validate the structure to ensure it matches CanvasState
    if (!parsed.elements || !parsed.viewport || !parsed.selectedElement || !parsed.currentTool) {
      throw new Error('Invalid canvas state structure');
    }
    
    // Additional validation could be added here
    
    return parsed as CanvasState;
  } catch (error) {
    console.error('Error deserializing canvas state:', error);
    // Return a default state if deserialization fails
    return {
      elements: [],
      viewport: {
        position: { x: 0, y: 0 },
        zoom: 1,
        rotation: 0,
      },
      selectedElement: null,
      currentTool: null,
    };
  }
};

/**
 * Export canvas as SVG string
 */
export const exportCanvasAsSVG = (canvasId: string): string | null => {
  if (typeof window === 'undefined') {
    console.warn('Cannot export canvas on the server side');
    return null;
  }
  
  const canvasElement = document.getElementById(canvasId);
  if (!canvasElement) {
    console.error(`Canvas with id ${canvasId} not found`);
    return null;
  }
  
  // Get the SVG element inside the canvas container
  const svgElement = canvasElement.querySelector('svg');
  if (!svgElement) {
    console.error(`No SVG element found in canvas with id ${canvasId}`);
    return null;
  }
  
  // Return the outer HTML of the SVG element
  return svgElement.outerHTML;
};

/**
 * Save canvas state to file
 */
export const saveCanvasToFile = (state: CanvasState, filename: string = 'canvas-state.json') => {
  const jsonString = serializeCanvasState(state);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Load canvas state from file
 */
export const loadCanvasFromFile = (callback: (state: CanvasState) => void) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = (event: any) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const state = deserializeCanvasState(content);
      callback(state);
    };
    reader.readAsText(file);
  };
  
  input.click();
};

/**
 * Validate if a zone is inside walls
 * This function would need to be implemented based on the specific requirements
 */
export const validateZoneInWalls = (zone: CanvasElement, walls: CanvasElement[]): boolean => {
  // This is a simplified implementation - actual implementation would require
  // complex geometry calculations to determine if a zone is inside walls
  console.log('Validating zone inside walls:', zone, walls);
  return true; // Placeholder implementation
};

/**
 * Check for overlapping zones
 * This function would need to be implemented based on the specific requirements
 */
export const checkOverlappingZones = (zones: CanvasElement[]): CanvasElement[] => {
  // This is a simplified implementation - actual implementation would require
  // complex geometry calculations to detect overlapping zones
  console.log('Checking for overlapping zones:', zones);
  return []; // Placeholder implementation
};

/**
 * Generate a unique ID for elements
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};