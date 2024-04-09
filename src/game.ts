import grass from './assets/tiles/tile_grass.png'
import waterCorner from './assets/tiles/tile_water_corner.png'
import waterMiddle from './assets/tiles/tile_water_middle.png'
import pawn from './assets/pawn.png'

export enum Types {
  Grass,
  WaterCorner,
  WaterMiddle
}

export enum Areas {
  Regular
}

export enum Professions {
  Pawn
}

export enum Teams {
  White,
  Black
}

class GameTile {
  rotate
  type
  area
  highlight = false
  board
  x
  y
  image
  constructor(
    x: number,
    y: number,
    board: GameBoard,
    type: Types = Types.Grass,
    area: Areas = Areas.Regular,
    rotate: number = 0
  ) {
    this.rotate = rotate
    this.type = type
    this.board = board
    this.x = x
    this.y = y
    this.area = area
    if (type === Types.WaterCorner) {
      this.image = waterCorner
    } else if (type === Types.WaterMiddle) {
      this.image = waterMiddle
    } else {
      this.image = grass
    }
  }
}

class GamePiece {
  team
  profession
  x
  y
  image
  board
  constructor(
    x: number,
    y: number,
    board: GameBoard,
    team: Teams = Teams.White,
    profession: Professions = Professions.Pawn
  ) {
    this.team = team
    this.x = x
    this.y = y
    this.profession = profession
    this.image = pawn
    this.board = board
  }
}

class GameBoard {
  width
  height
  tiles: GameTile[]
  pieces: GamePiece[]
  constructor(width: number, height: number, tiles: GameTile[] = [], pieces: GamePiece[] = []) {
    this.width = width
    this.height = height
    this.tiles = tiles
    this.pieces = pieces
  }
  getTile = (x: number, y: number) => {
    return this.tiles[x * y - 1]
  }
  addTile = (
    x: number,
    y: number,
    type: Types = Types.Grass,
    area: Areas = Areas.Regular,
    rotate: number = 0
  ) => {
    this.tiles.push(new GameTile(x, y, this, type, area, rotate))
  }
  updateTile = (x: number, y: number, tile: GameTile) => {
    this.tiles[x * y - 1] = tile
  }
  getPiece = (x: number, y: number) => {
    return this.pieces[x * y - 1]
  }
  addPiece = (x: number, y: number, team: Teams, profession: Professions) => {
    this.pieces.push(new GamePiece(x, y, this, team, profession))
  }
  removePiece = (x: number, y: number) => {
    this.pieces = this.pieces.filter((p) => p.x === x && p.y === y)
  }

  showMoves = (x: number, y: number): void => {
    const target = this.getPiece(x, y)
    if (target.profession === Professions.Pawn) {
      const updated = this.getTile(target.x, target.y)
      updated.highlight = true
      this.updateTile(target.x, target.y, updated)
    }
  }
}

export default GameBoard
