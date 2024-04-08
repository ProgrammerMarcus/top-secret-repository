import grass from './assets/tiles/tile_grass.png'
import waterCorner from './assets/tiles/tile_water_corner.png'
import waterMiddle from './assets/tiles/tile_water_middle.png'
import pawn from './assets/pawn.png'

enum Types {
  Grass
}

enum Professions {
  Pawn
}

enum Teams {
  White,
  Black
}

class GameBoard {
  width
  height
  grid: GameTile[]
  constructor(width: number, height: number, grid: GameTile[]) {
    this.width = width
    this.height = height
    this.grid = grid
  }
}

class GameMove {
  #x
  #y
  constructor(x: number, y: number) {
    this.#x = x
    this.#y = y
  }
  playMove = (board: GameBoard): GameBoard => {
    return board
  }
}

class GameTile {
  image
  rotate
  type
  constructor(image: string, rotate: number = 0, type: Types = Types.Grass) {
    this.image = image
    this.rotate = rotate
    this.type = type
  }
}

class GamePiece {
  team
  profession
  image
  x
  y
  constructor(team: Teams, profession: Professions, image: string, x: number, y: number) {
    this.team = team
    this.image = image
    this.x = x
    this.y = y
    this.profession = profession
  }
  availableMoves = (board: GameTile): GameMove[] => {
    console.log('unimplemented', board)
    return []
  }
}

export const pieces = [new GamePiece(Teams.White, Professions.Pawn, pawn, 1, 2)]

export const board = new GameBoard(8, 8, [
  // 1
  new GameTile(waterCorner, 90),
  new GameTile(waterMiddle, 90),
  new GameTile(waterMiddle, 90),
  new GameTile(waterMiddle, 90),
  new GameTile(waterMiddle, 90),
  new GameTile(waterMiddle, 90),
  new GameTile(waterMiddle, 90),
  new GameTile(waterCorner, 180),
  // 2
  new GameTile(waterMiddle, 0),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(waterMiddle, 180),
  // 3
  new GameTile(waterMiddle, 0),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(waterMiddle, 180),
  // 4
  new GameTile(waterMiddle, 0),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(waterMiddle, 180),
  // 5
  new GameTile(waterMiddle, 0),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(waterMiddle, 180),
  // 6
  new GameTile(waterMiddle, 0),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(waterMiddle, 180),
  // 7
  new GameTile(waterMiddle, 0),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(grass),
  new GameTile(waterMiddle, 180),
  // 8
  new GameTile(waterCorner, 0),
  new GameTile(waterMiddle, 270),
  new GameTile(waterMiddle, 270),
  new GameTile(waterMiddle, 270),
  new GameTile(waterMiddle, 270),
  new GameTile(waterMiddle, 270),
  new GameTile(waterMiddle, 270),
  new GameTile(waterCorner, 270)
])

export default board
