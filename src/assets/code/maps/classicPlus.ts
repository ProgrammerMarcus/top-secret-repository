import { GameBoard } from '@/assets/code/classes/GameBoard'
import type { GameMap } from '@/assets/code/types/GameMap'
import { Types, Areas, Professions, Teams } from '@/assets/code/enums'
import mapImage from '@/assets/menu/maps/classicplus.webp'

export const classicPlus: GameMap = {
  image: mapImage,
  name: 'Classic+',
  identifier: 2,
  generate: function (): GameBoard {
    const board = new GameBoard(15, 10)
    for (let x = 1; x <= board.width; x++) {
      for (let y = 1; y <= board.height; y++) {
        if (x === 1 && y === 1) {
          board.addTile(x, y, Types.WaterCorner, Areas.None, 90)
        } else if (x === board.width && y === 1) {
          board.addTile(x, y, Types.WaterCorner, Areas.None, 180)
        } else if (x === board.width && y === board.height) {
          board.addTile(x, y, Types.WaterCorner, Areas.None, 270)
        } else if (x === 1 && y === board.height) {
          board.addTile(x, y, Types.WaterCorner, Areas.None, 0)
        } else if (y === 1) {
          board.addTile(x, y, Types.WaterMiddle, Areas.None, 90)
        } else if (x === 1) {
          board.addTile(x, y, Types.WaterMiddle, Areas.None, 0)
        } else if (y === board.height) {
          board.addTile(x, y, Types.WaterMiddle, Areas.None, 270)
        } else if (x === board.width) {
          board.addTile(x, y, Types.WaterMiddle, Areas.None, 180)
        } else if (
          (x === 7 && y === 3) ||
          (y === 8 && x === 9) ||
          (y === 7 && x === 8) ||
          (x === 8 && y === 4)
        ) {
          board.addTile(x, y, Types.Rock, Areas.None, 0)
        } else if ((x === 6 && y === 9) || (x === 10 && y === 2)) {
          board.addTile(x, y, Types.Log, Areas.None, 0)
        } else {
          board.addTile(x, y)
        }
      }
    }

    for (let i = 2; i < 8; i++) {
      board.addPiece(3, i + 1, Teams.Black, Professions.Pawn)
    }
    board.addPiece(2, 5, Teams.Black, Professions.King)
    board.addPiece(2, 2, Teams.Black, Professions.Rook)
    board.addPiece(2, 9, Teams.Black, Professions.Rook)
    board.addPiece(2, 6, Teams.Black, Professions.Queen)
    board.addPiece(2, 4, Teams.Black, Professions.Bishop)
    board.addPiece(2, 7, Teams.Black, Professions.Bishop)
    board.addPiece(2, 8, Teams.Black, Professions.Knight)
    board.addPiece(2, 3, Teams.Black, Professions.Knight)
    board.addPiece(3, 2, Teams.Black, Professions.Archer)
    board.addPiece(3, 9, Teams.Black, Professions.Archer)

    for (let i = 2; i < 8; i++) {
      board.addPiece(13, i + 1, Teams.White, Professions.Pawn)
    }
    board.addPiece(14, 6, Teams.White, Professions.King)
    board.addPiece(14, 2, Teams.White, Professions.Rook)
    board.addPiece(14, 9, Teams.White, Professions.Rook)
    board.addPiece(14, 5, Teams.White, Professions.Queen)
    board.addPiece(14, 4, Teams.White, Professions.Bishop)
    board.addPiece(14, 7, Teams.White, Professions.Bishop)
    board.addPiece(14, 8, Teams.White, Professions.Knight)
    board.addPiece(14, 3, Teams.White, Professions.Knight)
    board.addPiece(13, 2, Teams.White, Professions.Archer)
    board.addPiece(13, 9, Teams.White, Professions.Archer)

    return board
  }
}
