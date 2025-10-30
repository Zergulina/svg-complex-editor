"use client";

import React, { useEffect, useRef, useState } from 'react';
import { SVG, Svg } from '@svgdotjs/svg.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Define types for our primitives
type PrimitiveType = 'wall' | 'zone' | 'text' | 'icon' | 'background';

interface CanvasElement {
  id: string;
  type: PrimitiveType | 'icon-text';
  element: any;
}

type CanvasState = {
  elements: CanvasElement[];
  selectedElementId: string | null;
  viewBox: { x: number; y: number; width: number; height: number };
  scale: number;
};

interface CanvasProps {
  onSelectionChange: (elementId: string | null) => void;
  onCanvasChange: (state: CanvasState) => void;
  currentTool: PrimitiveType | null;
}

interface GridSettings {
  enabled: boolean;
  spacing: number;
  color: string;
  opacity: number;
}

const Canvas: React.FC<CanvasProps> = ({ onSelectionChange, onCanvasChange, currentTool }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<Svg>(null);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    elements: [],
    selectedElementId: null,
    viewBox: { x: 0, y: 0, width: 800, height: 600 },
    scale: 1
  });
  const [gridSettings, setGridSettings] = useState<GridSettings>({
    enabled: true,
    spacing: 50,
    color: '#cccccc',
    opacity: 0.5
  });

  // Initialize SVG canvas
  useEffect(() => {
    if (containerRef.current && !svgRef.current) {
      const draw: Svg = SVG().addTo(containerRef.current).size('100%', '100%');
      svgRef.current = draw;

      // Create a group for all canvas elements - this group will contain all the drawn elements
      const canvasGroup = draw.group().attr({ id: 'canvas-elements' });
      
      // Create a group for the grid
      const gridGroup = draw.group().attr({ id: 'grid' });
      
      // Handle clicks on the canvas background to deselect elements
      draw.on('click', (e: Event) => {
        const event = e as MouseEvent;
        // Deselect any selected element when clicking on canvas background
        if (event.target === draw.node || event.target === containerRef.current || (event.target as Node).nodeName === 'svg') {
          setCanvasState(prev => ({ ...prev, selectedElementId: null }));
          onSelectionChange(null);
        }
      });
      
      // Handle clicks specifically on elements to select them
      draw.on('click', (e: Event) => {
        const event = e as MouseEvent;
        // Check if the clicked element or one of its ancestors has the 'element' class
        let target = event.target as HTMLElement;
        
        // Traverse up the DOM tree to find an SVG element with the 'element' class
        while (target && target !== draw.node) {
          if (target.classList && target.classList.contains('element') && target.id) {
            event.stopPropagation(); // Prevent the click from bubbling to the canvas background
            
            const elementId = target.id;
            
            setCanvasState(prev => ({ ...prev, selectedElementId: elementId }));
            onSelectionChange(elementId);
            
            // Highlight the selected element
            highlightElement(elementId);
            return;
          }
          target = target.parentElement as HTMLElement;
        }
      });
      
      // Set initial viewbox to show a reasonable area
      draw.viewbox(0, 0, 800, 600);

      // Set up zoom and pan with enhanced drag functionality
      let isDragging = false;
      let isPanning = false;
      let startPanX = 0;
      let startPanY = 0;
      let startMouseX = 0;
      let startMouseY = 0;

      // Mouse wheel zoom
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        
        const rect = draw.node.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Get current viewbox
        const viewBox = draw.viewbox();
        const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
        
        // Calculate new dimensions
        const newWidth = viewBox.width / zoomFactor;
        const newHeight = viewBox.height / zoomFactor;
        
        // Calculate new position to zoom toward mouse
        const newViewX = viewBox.x + (mouseX / rect.width) * (viewBox.width - newWidth);
        const newViewY = viewBox.y + (mouseY / rect.height) * (viewBox.height - newHeight);
        
        // Apply the new viewbox
        draw.viewbox(newViewX, newViewY, newWidth, newHeight);
        
        // Update canvas state
        setCanvasState(prev => ({
          ...prev,
          viewBox: { x: newViewX, y: newViewY, width: newWidth, height: newHeight },
          scale: prev.scale * (1 / zoomFactor)
        }));
      };

      // Enhanced mouse down - handle both middle mouse button and left mouse button drag for panning
      const handleMouseDown = (e: MouseEvent) => {
        // Middle mouse button or space+left click for panning
        if (e.button === 1 || (e.button === 0 && e.getModifierState('Space'))) {
          isPanning = true;
          startMouseX = e.clientX;
          startMouseY = e.clientY;
          const vb = draw.viewbox();
          startPanX = vb.x;
          startPanY = vb.y;
          draw.node.style.cursor = 'grabbing';
          e.preventDefault();
        } else if (e.button === 0) {
          // Left mouse button - check if clicking on canvas background (not on elements) for drag panning
          if (e.target === draw.node || e.target === containerRef.current || (e.target as Node).nodeName === 'svg') {
            isDragging = true;
            startMouseX = e.clientX;
            startMouseY = e.clientY;
            const vb = draw.viewbox();
            startPanX = vb.x;
            startPanY = vb.y;
            draw.node.style.cursor = 'grabbing';
            e.preventDefault();
          }
        }
      };

      const handleMouseMove = (e: MouseEvent) => {
        // Handle panning with middle mouse or space+drag
        if (isPanning || isDragging) {
          const rect = draw.node.getBoundingClientRect();
          const dx = (e.clientX - startMouseX) * (draw.viewbox().width / rect.width);
          const dy = (e.clientY - startMouseY) * (draw.viewbox().height / rect.height);
          
          draw.viewbox(
            startPanX - dx,
            startPanY - dy,
            draw.viewbox().width,
            draw.viewbox().height
          );
          
          // Update canvas state
          setCanvasState(prev => ({
            ...prev,
            viewBox: { 
              x: startPanX - dx, 
              y: startPanY - dy, 
              width: prev.viewBox.width, 
              height: prev.viewBox.height 
            }
          }));
        }
      };

      const handleMouseUp = () => {
        if (isPanning || isDragging) {
          isPanning = false;
          isDragging = false;
          draw.node.style.cursor = 'default';
        }
      };

      // Add event listeners
      draw.node.addEventListener('wheel', handleWheel, { passive: false });
      draw.node.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      // Store the event handlers for cleanup
      (draw.node as any).svgCanvasEventHandlers = {
        wheel: handleWheel,
        mousedown: handleMouseDown,
        mousemove: handleMouseMove,
        mouseup: handleMouseUp
      };
      
      // Draw initial grid
      drawGrid(draw, gridGroup);
    }

    return () => {
      if (svgRef.current) {
        // Remove event listeners
        const eventHandlers = (svgRef.current.node as any).svgCanvasEventHandlers;
        if (eventHandlers) {
          svgRef.current.node.removeEventListener('wheel', eventHandlers.wheel);
          svgRef.current.node.removeEventListener('mousedown', eventHandlers.mousedown);
          document.removeEventListener('mousemove', eventHandlers.mousemove);
          document.removeEventListener('mouseup', eventHandlers.mouseup);
        }
        
        svgRef.current.clear();
      }
    };
  }, []);

  // Update canvas when tool changes
  useEffect(() => {
    if (svgRef.current) {
      const canvasGroup = svgRef.current.findOne('#canvas-elements');
      if (!canvasGroup) return;

      // Clear any active drawing states
      canvasGroup.off('click.wall');
      canvasGroup.off('click.zone');
      canvasGroup.off('click.text');
      canvasGroup.off('click.icon');
      canvasGroup.off('click.background');

      // Handle tool-specific actions
      switch (currentTool) {
        case 'wall':
          console.log('Wall tool selected');
          setupWallDrawing(canvasGroup);
          break;
        case 'zone':
          console.log('Zone tool selected');
          setupZoneDrawing(canvasGroup);
          break;
        case 'text':
          console.log('Text tool selected');
          setupTextDrawing(canvasGroup);
          break;
        case 'icon':
          console.log('Icon tool selected');
          setupIconDrawing(canvasGroup);
          break;
        case 'background':
          console.log('Background tool selected');
          setupBackgroundDrawing(canvasGroup);
          break;
        default:
          break;
      }
    }
  }, [currentTool]);

  // Define types for SVG elements
  type SvgElement = any; // SVG.js doesn't have perfect TypeScript support

  // Set up drawing functionality for each primitive type
  const setupWallDrawing = (canvasGroup: any) => {
    // For now, just allow user to click to create a simple wall-like element
    canvasGroup.off('click.wall');
    canvasGroup.on('click.wall', (e: Event) => {
      const event = e as MouseEvent;
      if (event.target !== canvasGroup.node) return; // Only respond to clicks on canvas, not elements
      
      // Get the click position in SVG coordinates
      const pt = canvasGroup.node.createSVGPoint();
      pt.x = event.clientX;
      pt.y = event.clientY;
      const cursorPt = pt.matrixTransform(canvasGroup.node.getScreenCTM().inverse());
      
      // Create placeholder for wall element (a polygon)
      const wall = canvasGroup.polygon([
        [cursorPt.x - 40, cursorPt.y - 5],
        [cursorPt.x + 40, cursorPt.y - 5], 
        [cursorPt.x + 40, cursorPt.y + 5],
        [cursorPt.x - 40, cursorPt.y + 5]
      ]).fill('none').stroke({ width: 2, color: '#8B4513' }).addClass('element').attr({ id: `wall-${Date.now()}` });
      
      // Add to elements in state
      setCanvasState(prev => ({
        ...prev,
        elements: [...prev.elements, { id: wall.attr('id'), type: 'wall', element: wall }]
      }));
      
      console.log('Wall element created');
    });
  };

  const setupZoneDrawing = (canvasGroup: any) => {
    canvasGroup.off('click.zone');
    canvasGroup.on('click.zone', (e: Event) => {
      const event = e as MouseEvent;
      if (event.target !== canvasGroup.node) return; // Only respond to clicks on canvas, not elements
      
      // Get the click position in SVG coordinates
      const pt = canvasGroup.node.createSVGPoint();
      pt.x = event.clientX;
      pt.y = event.clientY;
      const cursorPt = pt.matrixTransform(canvasGroup.node.getScreenCTM().inverse());
      
      // Create placeholder for zone element (an ellipse)
      const zone = canvasGroup.ellipse(80, 60).move(cursorPt.x - 40, cursorPt.y - 30)
        .fill('none').stroke({ width: 2, color: '#228B22' }).addClass('element').attr({ id: `zone-${Date.now()}` });
      
      // Add to elements in state
      setCanvasState(prev => ({
        ...prev,
        elements: [...prev.elements, { id: zone.attr('id'), type: 'zone', element: zone }]
      }));
      
      console.log('Zone element created');
    });
  };

  const setupTextDrawing = (canvasGroup: any) => {
    canvasGroup.off('click.text');
    canvasGroup.on('click.text', (e: Event) => {
      const event = e as MouseEvent;
      if (event.target !== canvasGroup.node) return; // Only respond to clicks on canvas, not elements
      
      // Get the click position in SVG coordinates
      const pt = canvasGroup.node.createSVGPoint();
      pt.x = event.clientX;
      pt.y = event.clientY;
      const cursorPt = pt.matrixTransform(canvasGroup.node.getScreenCTM().inverse());
      
      // Create placeholder for text element
      const text = canvasGroup.text('Sample Text').move(cursorPt.x, cursorPt.y)
        .font({ size: 16, family: 'Arial' }).addClass('element').attr({ id: `text-${Date.now()}` });
      
      // Add to elements in state
      setCanvasState(prev => ({
        ...prev,
        elements: [...prev.elements, { id: text.attr('id'), type: 'text', element: text }]
      }));
      
      console.log('Text element created');
    });
  };

  const setupIconDrawing = (canvasGroup: any) => {
    canvasGroup.off('click.icon');
    canvasGroup.on('click.icon', (e: Event) => {
      const event = e as MouseEvent;
      if (event.target !== canvasGroup.node) return; // Only respond to clicks on canvas, not elements
      
      // Get the click position in SVG coordinates
      const pt = canvasGroup.node.createSVGPoint();
      pt.x = event.clientX;
      pt.y = event.clientY;
      const cursorPt = pt.matrixTransform(canvasGroup.node.getScreenCTM().inverse());
      
      // Create placeholder for icon element (a circle with an icon-like appearance)
      const icon = canvasGroup.circle(30).move(cursorPt.x - 15, cursorPt.y - 15)
        .fill('#FFD700').stroke({ width: 2, color: '#000' }).addClass('element').attr({ id: `icon-${Date.now()}` });
      
      // Add a small 'i' inside the circle to represent an icon
      const iconText = canvasGroup.text('i').move(cursorPt.x - 5, cursorPt.y - 9)
        .font({ size: 16, family: 'Arial' }).addClass('element').attr({ id: `icon-text-${Date.now()}` });
      
      // Add to elements in state
      setCanvasState(prev => ({
        ...prev,
        elements: [
          ...prev.elements, 
          { id: icon.attr('id'), type: 'icon', element: icon },
          { id: iconText.attr('id'), type: 'icon-text', element: iconText }
        ]
      }));
      
      console.log('Icon element created');
    });
  };

  const setupBackgroundDrawing = (canvasGroup: any) => {
    // Backgrounds are typically full canvas size elements
    canvasGroup.off('click.background');
    canvasGroup.on('click.background', (e: Event) => {
      const event = e as MouseEvent;
      if (event.target !== canvasGroup.node) return; // Only respond to clicks on canvas, not elements
      
      // Get the click position in SVG coordinates
      const pt = canvasGroup.node.createSVGPoint();
      pt.x = event.clientX;
      pt.y = event.clientY;
      const cursorPt = pt.matrixTransform(canvasGroup.node.getScreenCTM().inverse());
      
      // For now, just add a background-like rectangle that covers a portion of the canvas
      const bg = canvasGroup.rect(200, 150).move(cursorPt.x - 100, cursorPt.y - 75)
        .fill('#f0f0f0').stroke({ width: 1, color: '#ccc' }).opacity(0.5)
        .addClass('element').attr({ id: `bg-${Date.now()}` });
      
      // Add to elements in state
      setCanvasState(prev => ({
        ...prev,
        elements: [...prev.elements, { id: bg.attr('id'), type: 'background', element: bg }]
      }));
      
      console.log('Background element created');
    });
  };

  // Update canvas state when it changes
  useEffect(() => {
    onCanvasChange(canvasState);
  }, [canvasState, onCanvasChange]);

  // Highlight selected element
  const highlightElement = (elementId: string) => {
    if (!svgRef.current) return;
    
    // Remove highlight from previously selected element
    const canvasGroup = svgRef.current.findOne('#canvas-elements');
    if (!canvasGroup) return;
    
    // Find all elements that might be highlighted and remove highlight
    canvasGroup.each(function(this: any) {
      const el = this;
      const elType = el.type || (el.node ? el.node.nodeName : 'unknown');
      
      if (['path', 'polygon', 'circle', 'ellipse', 'rect'].includes(elType)) {
        // Reset to original stroke
        if (el.attr('data-original-stroke')) {
          el.stroke({ 
            color: el.attr('data-original-stroke'), 
            width: parseInt(el.attr('data-original-stroke-width')) || 2 
          });
          el.attr('data-original-stroke', null);
          el.attr('data-original-stroke-width', null);
        } else {
          el.stroke({ color: '#000', width: 2 });
        }
      } else if (elType === 'text') {
        // Reset text style if it was highlighted
        if (el.attr('data-original-font')) {
          el.font({ fill: el.attr('data-original-font') });
          el.attr('data-original-font', null);
        } else {
          el.font({ fill: '#000' });
        }
      }
    });
    
    // Add highlight to selected element
    const element: any = canvasGroup.findOne('#' + elementId);
    if (element) {
      const elementType = element.type || (element.node ? element.node.nodeName : 'unknown');
      
      if (['path', 'polygon', 'circle', 'ellipse', 'rect'].includes(elementType)) {
        // Store original stroke to restore later
        const strokeObj = element.stroke() || {};
        const originalStroke = strokeObj.color || '#000';
        const originalStrokeWidth = strokeObj.width || 2;
        
        element.attr({ 'data-original-stroke': originalStroke });
        element.attr({ 'data-original-stroke-width': originalStrokeWidth.toString() });
        
        // Apply highlight
        element.stroke({ color: '#ff0000', width: 4 });
      } else if (elementType === 'text') {
        // Store original font to restore later
        const fontObj = element.font() || {};
        const originalFont = fontObj.fill || '#000';
        element.attr({ 'data-original-font': originalFont });
        
        // Apply highlight to text
        element.font({ fill: '#ff0000' });
      }
    }
  };

  // Draw grid to cover the entire visible area plus some padding for panning
  const drawGrid = (draw: Svg, gridGroup: any) => {
    if (!gridSettings.enabled) {
      gridGroup.clear();
      return;
    }

    gridGroup.clear();
    
    const vb = draw.viewbox();
    const width = vb.width;
    const height = vb.height;
    const x = vb.x;
    const y = vb.y;
    
    // Calculate start and end points for grid lines based on viewbox with extra coverage
    // This ensures the grid covers the visible area plus some extra for panning
    const extraCoverage = Math.max(width, height) * 2; // 2x the largest dimension
    const startX = Math.floor((x - extraCoverage / 2) / gridSettings.spacing) * gridSettings.spacing;
    const endX = Math.ceil((x + width + extraCoverage / 2) / gridSettings.spacing) * gridSettings.spacing;
    const startY = Math.floor((y - extraCoverage / 2) / gridSettings.spacing) * gridSettings.spacing;
    const endY = Math.ceil((y + height + extraCoverage / 2) / gridSettings.spacing) * gridSettings.spacing;
    
    // Draw vertical grid lines
    for (let x_pos = startX; x_pos <= endX; x_pos += gridSettings.spacing) {
      gridGroup.line(x_pos, startY, x_pos, endY)
        .stroke({ width: 1, color: gridSettings.color, opacity: gridSettings.opacity });
    }
    
    // Draw horizontal grid lines
    for (let y_pos = startY; y_pos <= endY; y_pos += gridSettings.spacing) {
      gridGroup.line(startX, y_pos, endX, y_pos)
        .stroke({ width: 1, color: gridSettings.color, opacity: gridSettings.opacity });
    }
  };

  // Update grid when grid settings change
  useEffect(() => {
    if (svgRef.current) {
      const gridGroup = svgRef.current.findOne('#grid');
      if (gridGroup) {
        drawGrid(svgRef.current, gridGroup);
      }
    }
  }, [gridSettings]);

  // Redraw grid when viewbox changes
  useEffect(() => {
    if (svgRef.current) {
      const gridGroup = svgRef.current.findOne('#grid');
      if (gridGroup) {
        drawGrid(svgRef.current, gridGroup);
      }
    }
  }, [canvasState.viewBox]);

  // Toggle grid visibility
  const toggleGrid = () => {
    setGridSettings(prev => ({ ...prev, enabled: !prev.enabled }));
  };

  // Handle grid settings changes
  const handleGridSpacingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGridSettings(prev => ({ ...prev, spacing: parseInt(e.target.value) || 50 }));
  };

  const handleGridColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGridSettings(prev => ({ ...prev, color: e.target.value }));
  };

  const handleGridOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGridSettings(prev => ({ ...prev, opacity: parseFloat(e.target.value) || 0.5 }));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Canvas container */}
      <div 
        ref={containerRef} 
        className="flex-1 bg-white border rounded-lg overflow-hidden w-full"
        style={{ minHeight: '500px' }}
      />
      
      {/* Grid Controls */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Grid Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Button 
              onClick={toggleGrid} 
              variant={gridSettings.enabled ? "default" : "outline"}
              size="sm"
            >
              {gridSettings.enabled ? "Hide Grid" : "Show Grid"}
            </Button>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="grid-spacing">Spacing: {gridSettings.spacing}px</Label>
            <Input
              id="grid-spacing"
              type="range"
              min="10"
              max="100"
              value={gridSettings.spacing}
              onChange={handleGridSpacingChange}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="grid-color">Color</Label>
            <Input
              id="grid-color"
              type="color"
              value={gridSettings.color}
              onChange={handleGridColorChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="grid-opacity">Opacity: {Math.round(gridSettings.opacity * 100)}%</Label>
            <Input
              id="grid-opacity"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={gridSettings.opacity}
              onChange={handleGridOpacityChange}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Canvas;