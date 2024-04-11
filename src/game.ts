import grass from './assets/tiles/tile_grass.png'
import waterCorner from './assets/tiles/tile_water_corner.png'
import waterMiddle from './assets/tiles/tile_water_middle.png'
import pawnBlack from './assets/pawn_b.png'
import pawnWhite from './assets/pawn_w.png'
import kingBlack from './assets/king_b.png'
import kingWhite from './assets/king_w.png'
import archerBlack from './assets/archer_b.png'
import archerWhite from './assets/archer_w.png'
import queenBlack from './assets/queen_b.png'
import queenWhite from './assets/queen_w.png'
import bishopBlack from './assets/bishop_b.png'
import bishopWhite from './assets/bishop_w.png'
import knightBlack from './assets/knight_b.png'
import knightWhite from './assets/knight_w.png'
import rookBlack from './assets/rook_b.png'
import rookWhite from './assets/rook_w.png'

export enum Types {
  Grass,
  WaterCorner,
  WaterMiddle
}

export enum Areas {
  Regular
}

export enum Professions {
  Pawn,
  King,
  Archer,
  Queen,
  Bishop,
  Knight,
  Rook
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
  id
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
    this.id = board.pieces.length
    if (profession === Professions.Pawn) {
      if (this.team === Teams.White) {
        this.image = pawnWhite
      } else if (this.team === Teams.Black) {
        this.image = pawnBlack
      }
    } else if (profession === Professions.King) {
      if (this.team === Teams.White) {
        this.image = kingWhite
      } else if (this.team === Teams.Black) {
        this.image = kingBlack
      }
    } else if (profession === Professions.Archer) {
      if (this.team === Teams.White) {
        this.image = archerWhite
      } else if (this.team === Teams.Black) {
        this.image = archerBlack
      }
    } else if (profession === Professions.Queen) {
      if (this.team === Teams.White) {
        this.image = queenWhite
      } else if (this.team === Teams.Black) {
        this.image = queenBlack
      }
    } else if (profession === Professions.Bishop) {
      if (this.team === Teams.White) {
        this.image = bishopWhite
      } else if (this.team === Teams.Black) {
        this.image = bishopBlack
      }
    } else if (profession === Professions.Knight) {
      if (this.team === Teams.White) {
        this.image = knightWhite
      } else if (this.team === Teams.Black) {
        this.image = knightBlack
      }
    } else if (profession === Professions.Rook) {
      if (this.team === Teams.White) {
        this.image = rookWhite
      } else if (this.team === Teams.Black) {
        this.image = rookBlack
      }
    }
  }
}

export class GameBoard {
  turn: Teams = Teams.White
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

  /**
   * Checks if there are no pieces on offset from target
   * @param options The tiles to check to mark for availability
   * @param target The piece to check
   * @param x Offset in x direction
   * @param y Offset in y direction
   */
  checkNone = (options: GameTile[], target: GamePiece, x: number = 0, y: number = 0): void => {
    const tile = this.getTile(target.x + x, target.y + y * target.team)
    if (tile && !this.getPiece(target.x + x, target.y + y * target.team)) {
      options.push(tile)
    }
  }
  /**
   * Checks if there is an enemy on offset from target
   * @param options The tiles to check to mark for availability
   * @param target The piece to check
   * @param x Offset in x direction
   * @param y Offset in y direction
   */
  checkEnemy = (options: GameTile[], target: GamePiece, x: number = 0, y: number = 0): void => {
    const tile = this.getTile(target.x + x, target.y + y * target.team)
    if (
      tile &&
      this.getPiece(target.x + x, target.y + y * target.team) &&
      this.getPiece(target.x + x, target.y + y * target.team)?.team !== target.team
    ) {
      options.push(tile)
    }
  }
  /**
   * Checks if there is an enemy on offset from target
   * @param options The tiles to check to mark for availability
   * @param target The piece to check
   * @param x Offset in x direction
   * @param y Offset in y direction
   */
  checkNoneOrEnemy = (
    options: GameTile[],
    target: GamePiece,
    x: number = 0,
    y: number = 0
  ): void => {
    const tile = this.getTile(target.x + x, target.y + y * target.team)
    if (tile && this.getPiece(target.x + x, target.y + y * target.team)?.team !== target.team) {
      options.push(tile)
    }
  }
  checkDirection = (options: GameTile[], target: GamePiece, x: number = 0, y: number = 0): void => {
    for (let i = 1; i < this.tiles.length; i++) {
      const tile = this.getTile(target.x + x * i, target.y + y * target.team * i)
      if (tile && !this.getPiece(target.x + x * i, target.y + y * target.team * i)) {
        options.push(tile)
      } else if (
        tile &&
        this.getPiece(target.x + x * i, target.y + y * target.team * i) &&
        this.getPiece(target.x + x * i, target.y + y * target.team * i)?.team !== target.team
      ) {
        options.push(tile)
        break
      } else {
        break
      }
    }
  }
  /**
   * Checks if there is an enemy on offset from target
   * @param options The tiles to check to mark for availability
   * @param target The piece to check
   * @param x Offset in x direction
   * @param y Offset in y direction
   * @param startY Required position to allow
   */
  checkRun = (
    options: GameTile[],
    target: GamePiece,
    x: number = 0,
    y: number = 0,
    startY: number
  ): void => {
    const tile = this.getTile(target.x, target.y + 2 * target.team)
    if (
      (target.y === startY || target.y === this.height - startY + 1) &&
      tile &&
      this.getPiece(target.x + x, target.y + y * target.team) === undefined
    ) {
      options.push(tile)
    }
  }
  showMoves = (x: number, y: number): GameTile[] | false => {
    this.resetHighlights()
    const target = this.getPiece(x, y)
    const options: GameTile[] = []
    if (target) {
      if (target.profession === Professions.Pawn) {
        this.checkNone(options, target, 0, 1)
        this.checkEnemy(options, target, -1, 1)
        this.checkEnemy(options, target, 1, 1)
        this.checkRun(options, target, 0, 2, 2)
      } else if (target.profession === Professions.King) {
        this.checkNoneOrEnemy(options, target, 0, 1)
        this.checkNoneOrEnemy(options, target, 1, 1)
        this.checkNoneOrEnemy(options, target, 1, 0)
        this.checkNoneOrEnemy(options, target, 0, -1)
        this.checkNoneOrEnemy(options, target, -1, 0)
        this.checkNoneOrEnemy(options, target, -1, 1)
        this.checkNoneOrEnemy(options, target, -1, -1)
        this.checkNoneOrEnemy(options, target, 1, -1)
      } else if (target.profession === Professions.Archer) {
        this.checkNone(options, target, 0, 1)
        this.checkNone(options, target, 1, 0)
        this.checkNone(options, target, 0, -1)
        this.checkNone(options, target, -1, 0)
        this.checkEnemy(options, target, -1, 1)
        this.checkEnemy(options, target, -1, -1)
        this.checkEnemy(options, target, 1, 1)
        this.checkEnemy(options, target, 1, -1)
        this.checkEnemy(options, target, 2, 0)
        this.checkEnemy(options, target, 0, 2)
        this.checkEnemy(options, target, 0, -2)
        this.checkEnemy(options, target, -2, 0)
      } else if (target.profession === Professions.Queen) {
        this.checkDirection(options, target, 1, 1)
        this.checkDirection(options, target, -1, 1)
        this.checkDirection(options, target, -1, -1)
        this.checkDirection(options, target, 1, -1)
        this.checkDirection(options, target, 1, 0)
        this.checkDirection(options, target, 0, 1)
        this.checkDirection(options, target, -1, 0)
        this.checkDirection(options, target, 0, -1)
      } else if (target.profession === Professions.Bishop) {
        this.checkDirection(options, target, 1, 1)
        this.checkDirection(options, target, -1, 1)
        this.checkDirection(options, target, -1, -1)
        this.checkDirection(options, target, 1, -1)
      } else if (target.profession === Professions.Knight) {
        this.checkNoneOrEnemy(options, target, 1, 2)
        this.checkNoneOrEnemy(options, target, 1, -2)
        this.checkNoneOrEnemy(options, target, -1, 2)
        this.checkNoneOrEnemy(options, target, -1, -2)
        this.checkNoneOrEnemy(options, target, 2, 1)
        this.checkNoneOrEnemy(options, target, 2, -1)
        this.checkNoneOrEnemy(options, target, -2, 1)
        this.checkNoneOrEnemy(options, target, -2, -1)
      } else if (target.profession === Professions.Rook) {
        this.checkDirection(options, target, 1, 0)
        this.checkDirection(options, target, 0, 1)
        this.checkDirection(options, target, -1, 0)
        this.checkDirection(options, target, 0, -1)
      }
      for (const option of options) {
        if (option) option.highlight = true
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
