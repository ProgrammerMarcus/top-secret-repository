import grass from './assets/tiles/tile_grass.png'
import waterCorner from './assets/tiles/tile_water_corner.png'
import waterMiddle from './assets/tiles/tile_water_middle.png'
import pawnBlack from './assets/pawn_b.png'
import pawnWhite from './assets/pawn_w.png'
import kingBlack from './assets/king_b.png'
import kingWhite from './assets/king_w.png'
import archerBlack from './assets/archer_b.png'
import archerWhite from './assets/archer_w.png'

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
  Archer
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
      } else if (target.profession === Professions.King) {
        const front = this.getTile(target.x, target.y + 1)
        if (front && this.getPiece(target.x, target.y + 1)?.team !== target.team) {
          options.push(front)
        }
        const frontLeft = this.getTile(target.x - 1, target.y + 1)
        if (frontLeft && this.getPiece(target.x - 1, target.y + 1)?.team !== target.team) {
          options.push(frontLeft)
        }
        const frontRight = this.getTile(target.x + 1, target.y + 1)
        if (frontRight && this.getPiece(target.x + 1, target.y + 1)?.team !== target.team) {
          options.push(frontRight)
        }
        const left = this.getTile(target.x - 1, target.y)
        if (left && this.getPiece(target.x - 1, target.y)?.team !== target.team) {
          options.push(left)
        }
        const right = this.getTile(target.x + 1, target.y)
        if (right && this.getPiece(target.x + 1, target.y)?.team !== target.team) {
          options.push(right)
        }
        const back = this.getTile(target.x, target.y - 1)
        if (back && this.getPiece(target.x, target.y - 1)?.team !== target.team) {
          options.push(back)
        }
        const backLeft = this.getTile(target.x - 1, target.y - 1)
        if (backLeft && this.getPiece(target.x - 1, target.y - 1)?.team !== target.team) {
          options.push(backLeft)
        }
        const backRight = this.getTile(target.x + 1, target.y - 1)
        if (backRight && this.getPiece(target.x + 1, target.y - 1)?.team !== target.team) {
          options.push(backRight)
        }
      } else if (target.profession === Professions.Archer) {
        const front = this.getTile(target.x, target.y + 2)
        if (front && this.getPiece(target.x, target.y + 2)?.team !== target.team) {
          options.push(front)
        }
        const frontLeft = this.getTile(target.x - 2, target.y + 2)
        if (frontLeft && this.getPiece(target.x - 2, target.y + 2)?.team !== target.team) {
          options.push(frontLeft)
        }
        const frontRight = this.getTile(target.x + 2, target.y + 2)
        if (frontRight && this.getPiece(target.x + 2, target.y + 2)?.team !== target.team) {
          options.push(frontRight)
        }
        const left = this.getTile(target.x - 2, target.y)
        if (left && this.getPiece(target.x - 2, target.y)?.team !== target.team) {
          options.push(left)
        }
        const right = this.getTile(target.x + 2, target.y)
        if (right && this.getPiece(target.x + 2, target.y)?.team !== target.team) {
          options.push(right)
        }
        const back = this.getTile(target.x, target.y - 2)
        if (back && this.getPiece(target.x, target.y - 2)?.team !== target.team) {
          options.push(back)
        }
        const backLeft = this.getTile(target.x - 2, target.y - 2)
        if (backLeft && this.getPiece(target.x + 2, target.y - 2)?.team !== target.team) {
          options.push(backLeft)
        }
        const backRight = this.getTile(target.x + 2, target.y - 2)
        if (backRight && this.getPiece(target.x + 2, target.y - 2)?.team !== target.team) {
          options.push(backRight)
        }
        const frontLeftCenter = this.getTile(target.x - 1, target.y + 2)
        if (frontLeftCenter && this.getPiece(target.x - 1, target.y + 2)?.team !== target.team) {
          options.push(frontLeftCenter)
        }
        const frontRightCenter = this.getTile(target.x + 1, target.y + 2)
        if (frontRightCenter && this.getPiece(target.x + 1, target.y + 2)?.team !== target.team) {
          options.push(frontRightCenter)
        }
        const rightTopCenter = this.getTile(target.x + 2, target.y + 1)
        if (rightTopCenter && this.getPiece(target.x + 2, target.y + 1)?.team !== target.team) {
          options.push(rightTopCenter)
        }
        const leftTopCenter = this.getTile(target.x - 2, target.y + 1)
        if (leftTopCenter && this.getPiece(target.x - 2, target.y + 1)?.team !== target.team) {
          options.push(leftTopCenter)
        }
        const rightBottomCenter = this.getTile(target.x + 2, target.y - 1)
        if (rightBottomCenter && this.getPiece(target.x + 2, target.y - 1)?.team !== target.team) {
          options.push(rightBottomCenter)
        }
        const leftBottomCenter = this.getTile(target.x - 2, target.y - 1)
        if (leftBottomCenter && this.getPiece(target.x - 2, target.y + 2)?.team !== target.team) {
          options.push(leftBottomCenter)
        }
        const backCenterLeft = this.getTile(target.x - 1, target.y - 2)
        if (backCenterLeft && this.getPiece(target.x + 2, target.y - 2)?.team !== target.team) {
          options.push(backCenterLeft)
        }
        const backRightCenter = this.getTile(target.x + 1, target.y - 2)
        if (backRightCenter && this.getPiece(target.x + 2, target.y - 2)?.team !== target.team) {
          options.push(backRightCenter)
        }
        const nearFront = this.getTile(target.x, target.y + 1)
        if (nearFront && !this.getPiece(target.x, target.y + 1)) {
          options.push(nearFront)
        }
        const nearFrontLeft = this.getTile(target.x - 1, target.y + 1)
        if (nearFrontLeft && !this.getPiece(target.x - 1, target.y + 1)) {
          options.push(nearFrontLeft)
        }
        const nearFrontRight = this.getTile(target.x + 1, target.y + 1)
        if (nearFrontRight && !this.getPiece(target.x + 1, target.y + 1)) {
          options.push(nearFrontRight)
        }
        const nearLeft = this.getTile(target.x - 1, target.y)
        if (nearLeft && !this.getPiece(target.x - 1, target.y)) {
          options.push(nearLeft)
        }
        const nearRight = this.getTile(target.x + 1, target.y)
        if (nearRight && !this.getPiece(target.x + 1, target.y)) {
          options.push(nearRight)
        }
        const nearBack = this.getTile(target.x, target.y - 1)
        if (nearBack && !this.getPiece(target.x, target.y - 1)) {
          options.push(nearBack)
        }
        const nearBackLeft = this.getTile(target.x - 1, target.y - 1)
        if (nearBackLeft && !this.getPiece(target.x - 1, target.y - 1)) {
          options.push(nearBackLeft)
        }
        const nearBackRight = this.getTile(target.x + 1, target.y - 1)
        if (nearBackRight && !this.getPiece(target.x + 1, target.y - 1)) {
          options.push(nearBackRight)
        }
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
