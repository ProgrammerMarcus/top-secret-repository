import { Areas, Professions, Teams, Types } from '../enums'
import { GameTile } from './GameTile'
import { GamePiece } from './GamePiece'
import type { AIAction } from './AIAction'
import { runMiniMax } from './MiniMax'

/**
 * Contains the state of the game and methods for manipulating the board
 */
export class GameBoard {
  turn: Teams
  width
  height
  tiles: GameTile[]
  pieces: GamePiece[]
  gameOver: boolean = false
  constructor(
    width: number,
    height: number,
    tiles: GameTile[] = [],
    pieces: GamePiece[] = [],
    turn: Teams = Teams.White
  ) {
    this.width = width
    this.height = height
    this.tiles = tiles
    this.pieces = pieces
    this.turn = turn
  }
  /**
   * Get a tile at x y
   * @param x The x coordinate
   * @param y The y coordinate
   * @returns The tile at the x and y coordinate
   */
  getTile = (x: number, y: number) => {
    const tile = this.tiles.find((p) => p.x === x && p.y === y)
    if (tile && tile.area !== Areas.None) {
      return tile
    } else {
      return undefined
    }
  }
  /**
   * Adds a tile to the game
   * @param x The x coordinate
   * @param y The y coordinate
   * @param type Type of tile
   * @param area Type of area
   * @param rotate How much rotation
   */
  addTile = (
    x: number,
    y: number,
    type: Types = Types.Grass,
    area: Areas = Areas.Regular,
    rotate: number = 0
  ) => {
    this.tiles.push(new GameTile(x, y, type, area, rotate))
  }
  /**
   * Get a piece
   * @param x The x coordinate
   * @param y The y coordinate
   * @returns The piece at x y
   */
  getPiece = (x: number, y: number) => {
    return this.pieces.find((p) => p.x === x && p.y === y)
  }
  /**
   * Add a piece to game board
   * @param x The x coordinate
   * @param y The y coordinate
   * @param team The team the piece belongs to
   * @param profession The type of piece
   */
  addPiece = (x: number, y: number, team: Teams, profession: Professions) => {
    this.pieces.push(new GamePiece(x, y, team, profession))
  }
  /**
   * Remove a piece from the board
   * @param x The x coordinate
   * @param y The y coordinate
   */
  removePiece = (x: number, y: number) => {
    const index = this.pieces.findIndex((p) => p.x === x && p.y === y)
    if (this.pieces[index].profession === Professions.King) {
      this.gameOver = true
    }
    this.pieces.splice(index, 1)
  }
  /**
   * Reset any highlighted tiles to their non-highlighted state
   */
  resetHighlights = () => {
    for (const h of this.tiles.filter((o) => o.highlight)) {
      h.highlight = false
    }
  }
  /**
   * Calculate the value of the pieces of the specified team
   * @param checkTeam The team
   * @param checkPieces The pieces
   * @returns The total value of the pieces
   */
  calculateValue(checkTeam: number, checkPieces: GamePiece[]) {
    return checkPieces
      .filter((p) => p.team === checkTeam)
      .map((p) => p.profession)
      .reduce((a, b) => a + b)
  }

  cloneBoard = (source: GameBoard = this) => {
    // "copy" is required due to vue proxy
    const clone: GameBoard = new GameBoard(this.width, this.height, [], [], this.turn)
    clone.tiles = [...source.tiles].map((t) => {
      return new GameTile(t.x, t.y, t.type, t.area, t.rotate)
    })
    clone.pieces = [...source.pieces].map((p) => {
      return new GamePiece(p.x, p.y, p.team, p.profession, p.id)
    })
    return clone
  }

  complexAI = (): AIAction | null => {
    return runMiniMax(this)
  }

  simpleAI = (): AIAction | null => {
    const clone = this.cloneBoard(this)
    let bestList: AIAction[] = []
    for (const p of clone.pieces.filter((p: GamePiece) => p.team === this.turn)) {
      const tilesWithHighlights = clone.showMoves(p.x, p.y)
      if (tilesWithHighlights) {
        clone.tiles = tilesWithHighlights
        for (const t of clone.tiles.filter((t: GameTile) => t.highlight)) {
          const cloneClone = this.cloneBoard()
          cloneClone.pieces = cloneClone.movePiece(p.x, p.y, t.x, t.y)
          const test = {
            id: p.id,
            fromX: p.x,
            fromY: p.y,
            toX: t.x,
            toY: t.y,
            score:
              cloneClone.calculateValue(cloneClone.turn, cloneClone.pieces) -
              cloneClone.calculateValue(-cloneClone.turn, cloneClone.pieces)
          }
          if (bestList.length && bestList[0].score > test.score) {
            bestList = []
            bestList.push(test)
          } else if (!bestList.length || bestList[0].score === test.score) {
            bestList.push(test)
          }
        }
      }
    }
    if (bestList.length) {
      return bestList[Math.floor(Math.random() * bestList.length)]
    }
    return null
  }
  /**
   * Move a piece on the board and removes piece on collision.
   * @param fromX Move from this coordinate
   * @param fromY Move from this coordinate
   * @param toX Move to this coordinate
   * @param toY Move to this coordinate
   * @returns All the pieces
   */
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
      console.error(fromX, fromY, 'Piece is undefined, cannot move.')
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
  /**
   * Checks in xy direction until top
   * @param options The tiles to check to mark for availability
   * @param target The piece to check
   * @param x Offset in x direction
   * @param y Offset in y direction
   */
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
  /**
   * Moves {limit} tiles in xy direction or until stop
   * @param options The tiles to check to mark for availability
   * @param target The piece to check
   * @param x Offset in x direction
   * @param y Offset in y direction
   * @param limit Maximum movement
   */
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
  /**
   * Checks if there are any obstacles to jump over
   * @param options The tiles to check to mark for availability
   * @param target The piece to check
   */
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
  /**
   * Highlights the tiles available for movement
   * @param x The x-coordinate for the piece to check the moves of
   * @param y The y-coordinate for the piece to check the moves of
   * @returns Highlighted tiles or false if no moves
   */
  showMoves = (x: number, y: number): GameTile[] | false => {
    this.resetHighlights()
    const target = this.getPiece(x, y)
    const options: GameTile[] = []
    if (target) {
      if (target.profession === Professions.Pawn) {
        this.checkRush(options, target, 1, 0, 1)
        this.checkEnemy(options, target, 1, -1)
        this.checkEnemy(options, target, 1, 1)
        // this.checkRun(options, target) disabled due to lack of auto adjustment
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
      } else if (target.profession === Professions.Axeman) {
        this.checkNoneOrEnemy(options, target, 0, 1)
        this.checkEnemy(options, target, 1, 1)
        this.checkNoneOrEnemy(options, target, 1, 0)
        this.checkNoneOrEnemy(options, target, 0, -1)
        this.checkNoneOrEnemy(options, target, -1, 0)
        this.checkEnemy(options, target, -1, 1)
        this.checkEnemy(options, target, -1, -1)
        this.checkEnemy(options, target, 1, -1)
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
