declare interface Point {
    left: number;
    top: number;
  }
  
  declare interface Rect {
    active?: boolean,
    left: number;
    top: number;
    width: number;
    height: number;
    rotation?: number;
    octant?: number;
    z?: number;
  }
  
  declare type PointType = 'nw' | 'ne' | 'se' | 'sw' | 'n' | 'e' | 's' | 'w';
  