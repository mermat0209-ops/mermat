export type ToolType = 'select' | 'point' | 'line' | 'ray' | 'segment' | 'protractor' | 'eraser';

export interface Point2D {
  x: number;
  y: number;
  label?: string;
  id?: string;
}

export interface GeometricElement {
  id: string;
  type: 'point' | 'line' | 'ray' | 'segment';
  p1: Point2D;
  p2?: Point2D; // For lines, rays, segments
  label?: string;
  color?: string;
  length?: number;
}

export type AngleType = 'dar' | 'dik' | 'genis' | 'dogru';

export interface AngleQuestion {
  id: string;
  title: string;
  scenario: string;
  structureName: string;
  svgScene: string;
  angleValue: number;
  correctType: AngleType;
  points: { vertex: Point2D; arm1: Point2D; arm2: Point2D };
  explanation: string;
  hint: string;
}

export interface RoadMission {
  id: string;
  title: string;
  concept: 'paralel' | 'dik' | 'kesisen';
  description: string;
  pedagogicalNote: string;
  baseRoad: { x1: number; y1: number; x2: number; y2: number; name: string };
  targetPoints: Point2D[];
  correctPairs: [number, number][]; // Index pairs in targetPoints
  symbolNote: string;
  hint: string;
}

export interface ConstructionMission {
  id: string;
  title: string;
  type: 'line' | 'ray' | 'segment';
  requiredLength?: number;
  description: string;
  startPoint?: Point2D;
  targetPoint?: Point2D;
  symbol: string;
  hint: string;
  realWorldContext: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}
