"use client";

import React, { useEffect, useRef, useState } from 'react';
import { SVG, Svg } from '@svgdotjs/svg.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Define types for our primitives
type PrimitiveType = 'wall' | 'zone' | 'text' | 'icon' | 'background';
export type ToolType = 'wall' | 'zone' | 'zone-polygon' | 'zone-ellipse' | 'text' | 'icon' | 'background';

export interface ZoneProperties {
  type: 'polygon' | 'ellipse';
  sides?: number;
  text?: string;
  borderColor: string;
  fillColor: string;
}

interface CanvasElement {
  id: string;
  type: PrimitiveType | 'icon-text';
  element: any;
  x: number;
  y: number;
  zoneProperties?: ZoneProperties; // Add zone properties to canvas elements
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
  currentTool: ToolType | null;
  zoneProperties?: ZoneProperties; // Add zone properties prop
}

interface GridSettings {
  enabled: boolean;
  spacing: number;
  color: string;
  opacity: number;
}

const Canvas: React.FC<CanvasProps> = ({ onSelectionChange, onCanvasChange, currentTool, zoneProperties }) => {
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

  // Refs for drag and pan state to avoid closure issues
  const isDraggingRef = useRef(false);
  const isPanningRef = useRef(false);
  const hasMouseMovedRef = useRef(false); // Track if mouse moved during press (to differentiate click vs drag)
  const startPanXRef = useRef(0);
  const startPanYRef = useRef(0);
  const startMouseXRef = useRef(0);
  const startMouseYRef = useRef(0);

  // Initialize SVG canvas
  useEffect(() => {
    if (containerRef.current && !svgRef.current) {
      const draw: Svg = SVG().addTo(containerRef.current).size('100%', '100%');
      svgRef.current = draw;

      // Create a group for the grid first (so it renders underneath)
      const gridGroup = draw.group().attr({ id: 'grid' });

      // Create a group for all canvas elements - this group will contain all the drawn elements
      const canvasGroup = draw.group().attr({ id: 'canvas-elements' });

      // Set initial viewbox to show a reasonable area
      draw.viewbox(0, 0, 800, 600);

      // Set up zoom and pan with enhanced drag functionality

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
        hasMouseMovedRef.current = false; // Reset mouse movement tracker
        startMouseXRef.current = e.clientX;
        startMouseYRef.current = e.clientY;

        // Middle mouse button or space+left click for panning
        if (e.button === 1 || (e.button === 0 && e.getModifierState('Space'))) {
          isPanningRef.current = true;
          const vb = draw.viewbox();
          startPanXRef.current = vb.x;
          startPanYRef.current = vb.y;
          e.preventDefault();
        } else if (e.button === 0) {
          // Left mouse button - check if clicking on canvas background (not on elements) for drag panning
          if ((e.target as SVGElement).nodeName === 'svg' || (e.target as SVGAElement).parentElement?.id === "grid" || e.target === containerRef.current) {
            isDraggingRef.current = true;
            const vb = draw.viewbox();
            startPanXRef.current = vb.x;
            startPanYRef.current = vb.y;
            e.preventDefault();
          }
        }
      };

      const handleMouseMove = (e: MouseEvent) => {
        // Check if mouse has moved significantly (threshold of 5px) to determine if it's a drag vs click
        if (!hasMouseMovedRef.current &&
          (Math.abs(e.clientX - startMouseXRef.current) > 5 || Math.abs(e.clientY - startMouseYRef.current) > 5)) {
          hasMouseMovedRef.current = true;
        }

        // Handle panning with middle mouse or space+drag
        if (isPanningRef.current || isDraggingRef.current) {
          const rect = draw.node.getBoundingClientRect();
          
          // Use a consistent scale factor for both axes to ensure uniform dragging
          // Calculate the average of both ratios to maintain consistent speed regardless of canvas aspect ratio
          const avgRatio = ((draw.viewbox().width / rect.width) + (draw.viewbox().height / rect.height)) / 2;
          const dx = (e.clientX - startMouseXRef.current) * avgRatio;
          const dy = (e.clientY - startMouseYRef.current) * avgRatio;

          draw.node.style.cursor = 'grabbing';

          draw.viewbox(
            startPanXRef.current - dx,
            startPanYRef.current - dy,
            draw.viewbox().width,
            draw.viewbox().height
          );

          // Update canvas state
          setCanvasState(prev => ({
            ...prev,
            viewBox: {
              x: startPanXRef.current - dx,
              y: startPanYRef.current - dy,
              width: prev.viewBox.width,
              height: prev.viewBox.height
            }
          }));
        }
      };

      const handleMouseUp = (e: MouseEvent) => {
        if (isPanningRef.current || (hasMouseMovedRef.current && isDraggingRef.current)) {
          console.log(`isPanning: ${isPanningRef.current}; isDragging: ${isDraggingRef.current}`);

          // return;
        } else if (!hasMouseMovedRef.current) {
          // Handle both primitive placement and element selection when mouse hasn't moved significantly
          const target = e.target as HTMLElement;

          // Check if clicked on an existing primitive element (but not on the grid)
          let clickedOnElement = false;
          let currentTarget = target as HTMLElement;
          let elementId: string | null = null;

          // Traverse up the DOM tree to find an element with the 'element' class
          // Also check if we clicked on the grid group itself
          while (currentTarget && currentTarget !== draw.node as Node) {
            if (currentTarget.classList && currentTarget.classList.contains('element') && currentTarget.id) {
              clickedOnElement = true;
              elementId = currentTarget.id;
              break;
            }
            currentTarget = currentTarget.parentElement as HTMLElement;
          }

          if (clickedOnElement && elementId) {
            // Clicked on an existing element - select it
            e.stopPropagation(); // Prevent the click from bubbling to the canvas background

            setCanvasState(prev => ({ ...prev, selectedElementId: elementId }));
            onSelectionChange(elementId);

            // Highlight the selected element
            highlightElement(elementId);
          } else {
            // Clicked on canvas background or grid - place primitive if tool is active, otherwise deselect
            if (target === draw.node as unknown as HTMLElement || 
                draw.node.contains(target as Node)) {
              // Mouse up was on canvas background without significant movement
              const activeTool = currentToolRef.current;
              if (activeTool) {
                // Place a primitive if a tool is active
                placePrimitive(e, activeTool);
              } else {
                // Deselect any selected element when clicking on canvas background with no active tool
                setCanvasState(prev => ({ ...prev, selectedElementId: null }));
                onSelectionChange(null);
              }
            }
          }
        }

        isPanningRef.current = false;
        draw.node.style.cursor = 'default';
        isDraggingRef.current = false;
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

  // Ensure both canvas elements and grid update when viewbox changes
  useEffect(() => {
    if (svgRef.current) {
      const gridGroup = svgRef.current.findOne('#grid');
      if (gridGroup) {
        drawGrid(svgRef.current, gridGroup);
      }
    }
  }, [canvasState.viewBox]);

  // Create a ref to track the current tool to avoid dependency issues in effects
  const currentToolRef = useRef<ToolType | null>(null);
  useEffect(() => {
    currentToolRef.current = currentTool;
  }, [currentTool]);

  // Create a ref to track the current zone properties to avoid closure issues
  const zonePropertiesRef = useRef<ZoneProperties | undefined>(undefined);
  useEffect(() => {
    zonePropertiesRef.current = zoneProperties;
  }, [zoneProperties]);

  // Update canvas state when it changes
  useEffect(() => {
    onCanvasChange(canvasState);
  }, [canvasState, onCanvasChange]);

  // Highlight selected element
  const highlightElement = (elementId: string) => {
    if (!svgRef.current) return;

    // Remove highlight from all elements and restore their original styles
    const canvasGroup = (svgRef.current as any).findOne('#canvas-elements');
    if (!canvasGroup) return;

    // Find all elements and reset them to their original state
    (canvasGroup as any).each(function (this: any) {
      console.log("aboba")
      const el = this;
      const elType = el.type || (el.node ? el.node.nodeName : 'unknown');

      if (['path', 'polygon', 'circle', 'ellipse', 'rect'].includes(elType)) {
        // Restore original stroke from stored data
        if (el.attr('data-original-stroke')) {
          el.stroke({
            color: el.attr('data-original-stroke'),
            width: parseInt(el.attr('data-original-stroke-width')) || 2
          });

        }
        // If no original stroke was stored, the element was created with its original appearance and doesn't need changes
      } else if (elType === 'text') {
        // Restore original font from stored data
        if (el.attr('data-original-font')) {
          el.font({ fill: el.attr('data-original-font') });
          // Remove the temporary stored attribute
        }
        // If no original font was stored, the element was created with its original appearance and doesn't need changes
      }
    });

    // Now highlight the selected element
    const element: any = (canvasGroup as any).findOne('#' + elementId);
    if (element) {
      const elementType = element.type || (element.node ? element.node.nodeName : 'unknown');

      if (['path', 'polygon', 'circle', 'ellipse', 'rect'].includes(elementType)) {
        // Store the current stroke properties before changing them (these should be the original values now)
        const strokeObj = element.stroke() || {};
        const originalStroke = strokeObj || '#000';
        const originalStrokeWidth = strokeObj.width || 2;

        console.log(element);

        // Store original values as attributes for later restoration
        element.attr({ 'data-original-stroke': originalStroke });
        element.attr({ 'data-original-stroke-width': originalStrokeWidth.toString() });

        // Apply highlight
        element.stroke({ color: '#ff0000', width: 4 });
      } else if (elementType === 'text') {
        // Store the current font properties before changing them
        const fontObj = element.font() || {};
        const originalFont = fontObj.fill || '#000';

        // Store original value as attribute for later restoration
        element.attr({ 'data-original-font': originalFont });

        // Apply highlight to text
        element.font({ fill: '#ff0000' });
      }
    }
  };

  // Function to place a primitive at the mouse position
  const placePrimitive = (e: MouseEvent, activeTool: ToolType) => {
    if (!svgRef.current) return;

    // Get canvas group to add elements to
    const canvasGroup = svgRef.current.findOne('#canvas-elements');
    if (!canvasGroup) return;

    // Get the click position in SVG coordinates
    const svgElement = svgRef.current.node as unknown as SVGSVGElement;
    const pt = svgElement.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svgElement.getScreenCTM();
    if (!ctm) return; // If CTM is null, we can't calculate the position
    const cursorPt = pt.matrixTransform(ctm.inverse());

    // Create the appropriate primitive based on the current tool
    let newElements: CanvasElement[] = [];
    let newElement: any = null;

    switch (activeTool) {
      case 'wall':
        // Create placeholder for wall element (a polygon)
        newElement = (canvasGroup as any).polygon([
          [cursorPt.x - 40, cursorPt.y - 5],
          [cursorPt.x + 40, cursorPt.y - 5],
          [cursorPt.x + 40, cursorPt.y + 5],
          [cursorPt.x - 40, cursorPt.y + 5]
        ]).fill('none').stroke({ width: 2, color: '#8B4513' }).addClass('element').attr({ 
          id: `wall-${Date.now()}`,
          'data-original-stroke': '#8B4513',
          'data-original-stroke-width': '2'
        });

        newElements.push({
          id: newElement.attr('id'),
          type: 'wall',
          element: newElement,
          x: cursorPt.x,
          y: cursorPt.y
        });
        break;

      case 'zone':
      case 'zone-polygon':
      case 'zone-ellipse':
        // Create zone element with user-selected properties
        // Use zoneProperties if available (from ZoneComponent), otherwise default values
        console.log(`hi from canvas ${zonePropertiesRef.current?.borderColor}`);
        const zoneProps: ZoneProperties = zonePropertiesRef.current ? {...zonePropertiesRef.current} : {
          type: 'ellipse',
          borderColor: '#228B22',
          fillColor: 'none'
        };

        // Override the type based on the active tool if specifically set
        const effectiveType = activeTool === 'zone-polygon' ? 'polygon' : 
                             activeTool === 'zone-ellipse' ? 'ellipse' : 
                             zoneProps.type;

        if (effectiveType === 'polygon' && zoneProps.sides !== undefined) {
          // Create polygon zone
          const sides = zoneProps.sides;
          const radius = 40; // Radius for the polygon
          const points = [];
          
          for (let i = 0; i < sides; i++) {
            const angle = (i * 2 * Math.PI) / sides - Math.PI / 2; // Start from top
            const x = cursorPt.x + radius * Math.cos(angle);
            const y = cursorPt.y + radius * Math.sin(angle);
            points.push([x, y]);
          }
          
          newElement = (canvasGroup as any).polygon(points)
            .fill(zoneProps.fillColor)
            .stroke({ width: 2, color: zoneProps.borderColor })
            .addClass('element')
            .attr({ 
              id: `zone-${Date.now()}`,
              'data-original-stroke': zoneProps.borderColor,
              'data-original-stroke-width': '2'
            });
        } else {
          // Create ellipse zone (default)
          newElement = (canvasGroup as any).ellipse(80, 60).move(cursorPt.x - 40, cursorPt.y - 30)
            .fill(zoneProps.fillColor)
            .stroke({ width: 2, color: zoneProps.borderColor })
            .addClass('element')
            .attr({ 
              id: `zone-${Date.now()}`,
              'data-original-stroke': zoneProps.borderColor,
              'data-original-stroke-width': '2'
            });
        }

        newElements.push({
          id: newElement.attr('id'),
          type: 'zone',
          element: newElement,
          x: cursorPt.x,
          y: cursorPt.y,
          zoneProperties: zoneProps // Store the zone properties with the element
        });
        break;

      case 'text':
        // Create placeholder for text element
        newElement = (canvasGroup as any).text('Sample Text').move(cursorPt.x, cursorPt.y)
          .font({ size: 16, family: 'Arial', fill: '#000' })
          .addClass('element')
          .attr({ 
            id: `text-${Date.now()}`,
            'data-original-font': '#000'
          });

        newElements.push({
          id: newElement.attr('id'),
          type: 'text',
          element: newElement,
          x: cursorPt.x,
          y: cursorPt.y
        });
        break;

      case 'icon':
        // Create placeholder for icon element (a circle with an icon-like appearance)
        newElement = (canvasGroup as any).circle(30).move(cursorPt.x - 15, cursorPt.y - 15)
          .fill('#FFD700')
          .stroke({ width: 2, color: '#000' })
          .addClass('element')
          .attr({ 
            id: `icon-${Date.now()}`,
            'data-original-stroke': '#000',
            'data-original-stroke-width': '2'
          });

        // Add a small 'i' inside the circle to represent an icon
        const iconText = (canvasGroup as any).text('i').move(cursorPt.x - 5, cursorPt.y - 9)
          .font({ size: 16, family: 'Arial', fill: '#000' })
          .addClass('element')
          .attr({ 
            id: `icon-text-${Date.now()}`,
            'data-original-font': '#000'
          });

        // Add both elements to the state
        newElements.push(
          {
            id: newElement.attr('id'),
            type: 'icon',
            element: newElement,
            x: cursorPt.x,
            y: cursorPt.y
          },
          {
            id: iconText.attr('id'),
            type: 'icon-text',
            element: iconText,
            x: cursorPt.x - 5,
            y: cursorPt.y - 9
          }
        );
        break;

      case 'background':
        // For now, just add a background-like rectangle that covers a portion of the canvas
        newElement = (canvasGroup as any).rect(200, 150).move(cursorPt.x - 100, cursorPt.y - 75)
          .fill('#f0f0f0')
          .stroke({ width: 1, color: '#ccc' })
          .opacity(0.5)
          .addClass('element')
          .attr({ 
            id: `bg-${Date.now()}`,
            'data-original-stroke': '#ccc',
            'data-original-stroke-width': '1'
          });

        newElements.push({
          id: newElement.attr('id'),
          type: 'background',
          element: newElement,
          x: cursorPt.x,
          y: cursorPt.y
        });
        break;
    }

    // Add the new elements to the state
    if (newElements.length > 0) {
      setCanvasState(prev => ({
        ...prev,
        elements: [...prev.elements, ...newElements]
      }));
    }

  };

  // Draw grid to cover the entire visible area plus some padding for panning
  const drawGrid = (draw: Svg, gridGroup: any) => {
    if (!gridSettings.enabled) {
      (gridGroup as any).clear();
      return;
    }

    (gridGroup as any).clear();

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
      (gridGroup as any).line(x_pos, startY, x_pos, endY)
        .stroke({ width: 1, color: gridSettings.color, opacity: gridSettings.opacity });
    }

    // Draw horizontal grid lines
    for (let y_pos = startY; y_pos <= endY; y_pos += gridSettings.spacing) {
      (gridGroup as any).line(startX, y_pos, endX, y_pos)
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
    <div className="h-full">
      {/* Canvas container */}
      <div
        ref={containerRef}
        className="h-full bg-white border overflow-hidden w-full"
      />
    </div>
  );
};

export default Canvas;