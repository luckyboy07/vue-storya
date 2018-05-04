declare interface Point {
    left: number;
    top: number;
  }
  
  declare interface Rect {
    left: number;
    top: number;
    width: number;
    height: number;
    rotation?: number;
    octant?: number;
  }
  
  declare type PointType = 'nw' | 'ne' | 'se' | 'sw' | 'n' | 'e' | 's' | 'w';
  