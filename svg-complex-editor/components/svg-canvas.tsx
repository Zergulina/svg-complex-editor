'use client';

import React, { useEffect, useRef } from 'react';
import { useSVG } from '@/lib/svg/svg-utils';

interface SVGCanvasProps {
  id: string;
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

const SVGCanvas: React.FC<SVGCanvasProps> = ({ 
  id, 
  width = 800, 
  height = 600,
  children 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { SVG, isLoaded } = useSVG();

  useEffect(() => {
    if (isLoaded && containerRef.current && SVG) {
      // Import and initialize plugins
      Promise.all([
        import('@svgdotjs/svg.draggable.js'),
        import('@svgdotjs/svg.select.js'),
        import('@svgdotjs/svg.resize.js'),
        import('@svgdotjs/svg.panzoom.js'),
      ]).then(([draggable, select, resize, panzoom]) => {
        // Apply plugins to SVG
        SVG.use(draggable.default);
        SVG.use(select.default);
        SVG.use(resize.default);
        SVG.use(panzoom.default);
        
        // Initialize the SVG canvas after the component mounts
        const draw = SVG(containerRef.current);
        
        // Set up basic canvas properties
        if (draw) {
          draw.size(width, height);
          
          // Store the canvas reference in a global variable or pass it via context
          (window as any).svgCanvas = draw;
          
          // You can add any initial setup here
          console.log('SVG canvas initialized successfully with plugins');
        }
      }).catch(error => {
        console.error('Error loading plugins:', error);
        
        // Still initialize the canvas even if plugins fail to load
        const draw = SVG(containerRef.current);
        
        // Set up basic canvas properties
        if (draw) {
          draw.size(width, height);
          
          // Store the canvas reference in a global variable or pass it via context
          (window as any).svgCanvas = draw;
          
          console.log('SVG canvas initialized without plugins');
        }
      });
    }
  }, [isLoaded, width, height, SVG]);

  return (
    <div 
      id={id} 
      ref={containerRef} 
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        border: '1px solid #ccc',
        overflow: 'hidden'
      }}
    >
      {!isLoaded && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100%', 
          width: '100%',
          backgroundColor: '#f5f5f5'
        }}>
          Loading SVG Canvas...
        </div>
      )}
      {children}
    </div>
  );
};

export default SVGCanvas;