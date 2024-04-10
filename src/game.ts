import grass from './assets/tiles/tile_grass.png'
import waterCorner from './assets/tiles/tile_water_corner.png'
import waterMiddle from './assets/tiles/tile_water_middle.png'
import pawnBlack from './assets/pawn_b.png'
import pawnWhite from './assets/pawn_w.png'

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
  White = -1,
  Black = 1
}

export class GameTile {
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

export class GamePiece {
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
    this.board = board
    if (profession === Professions.Pawn) {
      if (this.team === Teams.White) {
        this.image = pawnWhite
      } else if (this.team === Teams.Black) {
        this.image = pawnBlack
      }
    }
  }
}

export class GameBoard {
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
    return this.tiles.find((p) => p.x === x && p.y === y)
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
    return this.pieces.find((p) => p.x === x && p.y === y)
  }
  addPiece = (x: number, y: number, team: Teams, profession: Professions) => {
    this.pieces.push(new GamePiece(x, y, this, team, profession))
  }
  removePiece = (x: number, y: number) => {
    const index = this.pieces.findIndex((p) => p.x === x && p.y === y)
    console.log(this.pieces[index])
    this.pieces.splice(index, 1)
  }
  resetHighlights = () => {
    for (const h of this.tiles.filter((o) => o.highlight)) {
      h.highlight = false
    }
  }
  movePiece = (fromX: number, fromY: number, toX: number, toY: number) => {
    const piece = this.getPiece(fromX, fromY)
    if (piece) {
      const otherPiece = this.getPiece(toX, toY)
      if (otherPiece) {
        if (otherPiece.team === piece.team) {
          return [...this.pieces]
        } else if (otherPiece.team !== piece.team) {
          this.removePiece(toX, toY)
        }
      }
      piece.x = toX
      piece.y = toY
      this.resetHighlights()
      return [...this.pieces]
    } else {
      console.error('Piece is undefined, cannot move.')
      return this.pieces
    }
  }
  showMoves = (x: number, y: number): GameTile[] | false => {
    this.resetHighlights()
    const target = this.getPiece(x, y)
    const options: GameTile[] = []
    if (target) {
      if (target.profession === Professions.Pawn) {
        const front = this.getTile(target.x, target.y + 1 * target.team)
        if (front && !this.getPiece(target.x, target.y + 1 * target.team)) {
          options.push(front)
        }
        const left = this.getTile(target.x - 1, target.y + 1 * target.team)
        if (left && this.getPiece(target.x - 1, target.y + 1 * target.team)) {
          options.push(left)
        }
        const right = this.getTile(target.x + 1, target.y + 1 * target.team)
        if (right && this.getPiece(target.x + 1, target.y + 1 * target.team)) {
          options.push(right)
        }
        const far = this.getTile(target.x, target.y + 2 * target.team)
        if ((y === 2 || y === 7) && far && !this.getPiece(target.x, target.y + 2 * target.team)) {
          options.push(far)
        }
        for (const option of options) {
          if (option) option.highlight = true
        }
      }
    }
    if (options.length) {
      return [...this.tiles]
    } else {
      return false
    }
  }
}

export default GameBoard
