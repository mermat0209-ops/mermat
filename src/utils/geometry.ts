import { Point2D, AngleType } from '../types/game';

export function calculateDistance(p1: Point2D, p2: Point2D): number {
  return Math.hypot(p2.x - p1.x, p2.y - p1.y);
}

// Calculate angle between vertex -> arm1 and vertex -> arm2 in degrees (0 to 180)
export function calculateAngleDeg(vertex: Point2D, arm1: Point2D, arm2: Point2D): number {
  const v1 = { x: arm1.x - vertex.x, y: arm1.y - vertex.y };
  const v2 = { x: arm2.x - vertex.x, y: arm2.y - vertex.y };

  const dot = v1.x * v2.x + v1.y * v2.y;
  const mag1 = Math.hypot(v1.x, v1.y);
  const mag2 = Math.hypot(v2.x, v2.y);

  if (mag1 === 0 || mag2 === 0) return 0;

  let cosTheta = dot / (mag1 * mag2);
  cosTheta = Math.max(-1, Math.min(1, cosTheta));
  const rad = Math.acos(cosTheta);
  return Math.round((rad * 180) / Math.PI);
}

export function classifyAngle(deg: number): AngleType {
  if (Math.abs(deg - 90) <= 1) return 'dik';
  if (Math.abs(deg - 180) <= 2) return 'dogru';
  if (deg < 90) return 'dar';
  return 'genis';
}

export function getAngleTypeName(type: AngleType): string {
  switch (type) {
    case 'dar':
      return 'Dar Açı (0° ile 90° arası)';
    case 'dik':
      return 'Dik Açı (Tam 90°)';
    case 'genis':
      return 'Geniş Açı (90° ile 180° arası)';
    case 'dogru':
      return 'Doğru Açı (Tam 180°)';
  }
}

// Check if two line segments are parallel
export function areParallel(
  l1p1: Point2D,
  l1p2: Point2D,
  l2p1: Point2D,
  l2p2: Point2D,
  tolerance = 0.08
): boolean {
  const dx1 = l1p2.x - l1p1.x;
  const dy1 = l1p2.y - l1p1.y;
  const dx2 = l2p2.x - l2p1.x;
  const dy2 = l2p2.y - l2p1.y;

  // Cross product of direction vectors
  const cross = dx1 * dy2 - dy1 * dx2;
  const mag1 = Math.hypot(dx1, dy1);
  const mag2 = Math.hypot(dx2, dy2);

  if (mag1 === 0 || mag2 === 0) return false;
  return Math.abs(cross / (mag1 * mag2)) < tolerance;
}

// Check if two line segments are perpendicular
export function arePerpendicular(
  l1p1: Point2D,
  l1p2: Point2D,
  l2p1: Point2D,
  l2p2: Point2D,
  tolerance = 0.08
): boolean {
  const dx1 = l1p2.x - l1p1.x;
  const dy1 = l1p2.y - l1p1.y;
  const dx2 = l2p2.x - l2p1.x;
  const dy2 = l2p2.y - l2p1.y;

  // Dot product of direction vectors
  const dot = dx1 * dx2 + dy1 * dy2;
  const mag1 = Math.hypot(dx1, dy1);
  const mag2 = Math.hypot(dx2, dy2);

  if (mag1 === 0 || mag2 === 0) return false;
  return Math.abs(dot / (mag1 * mag2)) < tolerance;
}

// Snap point to closest grid coordinate
export function snapToGrid(
  x: number,
  y: number,
  stepX = 40,
  stepY = 40,
  offsetX = 20,
  offsetY = 20
): { x: number; y: number } {
  const snappedX = Math.round((x - offsetX) / stepX) * stepX + offsetX;
  const snappedY = Math.round((y - offsetY) / stepY) * stepY + offsetY;
  return { x: snappedX, y: snappedY };
}
