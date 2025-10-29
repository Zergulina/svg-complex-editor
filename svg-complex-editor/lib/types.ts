/**
 * Type definitions for SVG Complex Editor primitives
 */

export type PrimitiveType = 'wall' | 'zone' | 'text' | 'icon' | 'background';

export interface Position {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface Wall {
  id: string;
  type: 'wall';
  points: Position[];
  width: number; // Thickness of the wall
  extrusion?: number; // Capability to extrude the wall
  color?: string;
  label?: string;
}

export interface Zone {
  id: string;
  type: 'zone';
  points: Position[]; // Polygon points or ellipse parameters
  shape: 'polygon' | 'ellipse';
  text?: string;
  icon?: string;
  color?: string;
  mustBeInsideWalls: boolean;
}

export interface Text {
  id: string;
  type: 'text';
  position: Position;
  content: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
}

export interface Icon {
  id: string;
  type: 'icon';
  position: Position;
  iconType: string; // 'vegetable' | 'warning' | 'alert' | 'culture' etc.
  size?: number;
  color?: string;
}

export interface BackgroundImage {
  id: string;
  type: 'background';
  url: string;
  position: Position;
  dimensions: Dimensions;
  scale: number;
  rotation?: number;
}

export type Primitive = Wall | Zone | Text | Icon | BackgroundImage;

/**
 * General primitive properties that all primitives share
 */
export interface BasePrimitive {
  id: string;
  type: PrimitiveType;
  position?: Position;
  rotation?: number;
  opacity?: number;
  locked?: boolean;
  visible?: boolean;
  tags?: string[];
}