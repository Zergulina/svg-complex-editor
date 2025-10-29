"use client"
import React, { useEffect, useRef } from "react";
import { SVG } from "@svgdotjs/svg.js";
import '@svgdotjs/svg.draggable.js';
import '@svgdotjs/svg.panzoom.js'
import '@svgdotjs/svg.select.js'
import '@svgdotjs/svg.resize.js'

const SvgComponent = () => {
  const svgContainer = useRef(null);

  useEffect(() => {
    if (svgContainer.current) {
      const draw = SVG().addTo(svgContainer.current).size('100%', 600).viewbox('0 0 2000 2000').panZoom(({ zoomMin: 0.5, zoomMax: 2 }));

      const rect = draw.rect(100, 100).attr({ fill: '#f06' }).move(50, 50).draggable();
      draw.rect(100, 20).attr({ fill: "blue" }).move(200, 200);

      const svgNode = rect.node; // Получаем DOM-элемент <svg>

      svgNode.addEventListener('mouseenter', () => {
        svgNode.style.cursor = 'grab';
      });

      svgNode.addEventListener('mouseleave', () => {
        svgNode.style.cursor = 'default';
      });

      svgNode.addEventListener('mousedown', () => {
        svgNode.style.cursor = 'grabbing';
        rect.select().resize();
      });

      svgNode.addEventListener('mouseup', () => {
        svgNode.style.cursor = 'grab';
      });

      svgNode.addEventListener('unfocus', () => {
        rect.select(false);
      });
      draw.polygon("350,50 283,250 450,122 250,122 416,250")
        .select()
        .pointSelect()
        .resize();

    }
  }, []);

  return <div ref={svgContainer} style={{ border: '1px solid #ccc' }} />;
}

export default function Home() {
  return (
    <div >
      <main >
        <SvgComponent />
      </main>
    </div>
  );
}
