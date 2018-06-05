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
    rotation?: any;
    octant?: number;
    z?: number;
    zoom?: Number;
  }
  
  declare type PointType = 'nw' | 'ne' | 'se' | 'sw' | 'n' | 'e' | 's' | 'w';
  