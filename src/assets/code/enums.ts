export enum Difficulties {
  Easy,
  Normal
}

/**
 * Types of tiles
 */
export enum Types {
  Grass,
  WaterCorner,
  WaterMiddle,
  Rock,
  Bush,
  Log,
  Stone,
  WaterStoneMiddle,
  WaterStoneCorner,
  TreeTop,
  TreeBottom,
  stoneMiddle
}

/**
 * Types of areas available
 */
export enum Areas {
  Regular,
  None
}

/**
 * The various "professions" of the pieces and their value
 */
export enum Professions {
  Pawn = 10,
  King = 9999,
  Archer = 26,
  Queen = 50,
  Bishop = 27,
  Knight = 25,
  Rook = 30,
  Axeman = 20
}

/**
 * The teams available
 */
export enum Teams {
  White = -1,
  Black = 1
}
