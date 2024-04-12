// tiles
import grass from './assets/tiles/tile_grass.png'
import waterCorner from './assets/tiles/tile_water_corner.png'
import waterMiddle from './assets/tiles/tile_water_middle.png'
import bush from './assets/tiles/tile_bush.png'
import rock from './assets/tiles/tile_rock.png'
import log from './assets/tiles/tile_log.png'

// pieces
import pawnBlack from './assets/pieces/pawn_b.webp'
import pawnWhite from './assets/pieces/farmer_w.webp'
import kingBlack from './assets/pieces/fire_b.webp'
import kingWhite from './assets/pieces/king_w.webp'
import archerBlack from './assets/pieces/archer_b.webp'
import archerWhite from './assets/pieces/leaf_w.webp'
import queenBlack from './assets/pieces/aristocrat_b.webp'
import queenWhite from './assets/pieces/princess_w.webp'
import bishopBlack from './assets/pieces/jester_b.webp'
import bishopWhite from './assets/pieces/priestess_w.webp'
import knightBlack from './assets/pieces/stranger_b.webp'
import knightWhite from './assets/pieces/captain_w.webp'
import rookBlack from './assets/pieces/metal_b.webp'
import rookWhite from './assets/pieces/shady_w.webp'

export enum Types {
  Grass,
  WaterCorner,
  WaterMiddle,
  Rock,
  Bush,
  Log
}

export enum Areas {
  Regular,
  None
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
    } else if (type === Types.Rock) {
      this.image = rock
    } else if (type === Types.Log) {
      this.image = log
    } else if (type === Types.Bush) {
      this.image = bush
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
    const tile = this.tiles.find((p) => p.x === x && p.y === y)
    if (tile && tile.area !== Areas.None) {
      return tile
    } else {
      return undefined
    }
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
    const tile = this.getTile(target.x + x * target.team, target.y + y)
    if (tile && !this.getPiece(target.x + x * target.team, target.y + y)) {
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
    const tile = this.getTile(target.x + x * target.team, target.y + y)
    if (
      tile &&
      this.getPiece(target.x + x * target.team, target.y + y) &&
      this.getPiece(target.x + x * target.team, target.y + y)?.team !== target.team
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
    const tile = this.getTile(target.x + x * target.team, target.y + y)
    if (tile && this.getPiece(target.x + x * target.team, target.y + y)?.team !== target.team) {
      options.push(tile)
    }
  }
  checkDirection = (options: GameTile[], target: GamePiece, x: number = 0, y: number = 0): void => {
    for (let i = 1; i < this.tiles.length; i++) {
      const tile = this.getTile(target.x + x * i, target.y + y * i)
      if (tile && !this.getPiece(target.x + x * i, target.y + y * i)) {
        options.push(tile)
      } else if (
        tile &&
        this.getPiece(target.x + x * i, target.y + y * i) &&
        this.getPiece(target.x + x * i, target.y + y * i)?.team !== target.team
      ) {
        options.push(tile)
        break
      } else {
        break
      }
    }
  }
  checkRush = (
    options: GameTile[],
    target: GamePiece,
    x: number = 0,
    y: number = 0,
    limit: number
  ): void => {
    for (let i = 1; i < this.tiles.length; i++) {
      if (options.length >= limit) {
        break
      }
      const tile = this.getTile(target.x + x * i * target.team, target.y + y * i)
      if (tile && !this.getPiece(target.x + x * i * target.team, target.y + y * i)) {
        options.push(tile)
      } else if (tile && this.getPiece(target.x + x * i * target.team, target.y + y * i)) {
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
   */
  checkRun = (options: GameTile[], target: GamePiece): void => {
    const tile = this.getTile(target.x + 2 * target.team, target.y)
    if (
      (target.x === 3 || target.x === this.width - 2) &&
      tile &&
      this.getPiece(target.x + 2 * target.team, target.y) === undefined &&
      this.getPiece(target.x + 1 * target.team, target.y) === undefined
    ) {
      options.push(tile)
    }
  }
  checkLeap = (options: GameTile[], target: GamePiece): void => {
    const tile = this.getTile(target.x + 2 * target.team, target.y)
    if (
      tile &&
      this.getPiece(target.x + 2 * target.team, target.y) === undefined &&
      this.getTile(target.x + 1 * target.team, target.y) === undefined
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
        this.checkRush(options, target, 1, 0, 1)
        this.checkEnemy(options, target, -1, 1)
        this.checkEnemy(options, target, 1, 1)
        this.checkRun(options, target)
        this.checkLeap(options, target)
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
