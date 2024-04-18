import { GameBoard } from '@/assets/code/classes/GameBoard'
import type { GameMap } from '@/assets/code/types/GameMap'
import { Types, Areas, Professions, Teams } from '@/assets/code/enums'
import mapImage from '@/assets/menu/maps/classicplus.webp'

export const classicPlus: GameMap = {
  image: mapImage,
  name: 'Classic+',
  identifier: '2',
  generate: function (): GameBoard {
    const board = new GameBoard(13, 8)
    for (let x = 1; x <= board.width; x++) {
      for (let y = 1; y <= board.height; y++) {
        if (
          (x === 6 && y === 2) ||
          (y === 7 && x === 8) ||
          (y === 6 && x === 7) ||
          (x === 7 && y === 3)
        ) {
          board.addTile(x, y, Types.Rock, Areas.None, 0)
        } else {
          board.addTile(x, y)
        }
      }
    }

    for (let i = 1; i < 7; i++) {
      board.addPiece(2, i + 1, Teams.Black, Professions.Pawn)
    }
    board.addPiece(1, 4, Teams.Black, Professions.King)
    board.addPiece(1, 1, Teams.Black, Professions.Rook)
    board.addPiece(1, 8, Teams.Black, Professions.Rook)
    board.addPiece(1, 5, Teams.Black, Professions.Queen)
    board.addPiece(1, 3, Teams.Black, Professions.Bishop)
    board.addPiece(1, 6, Teams.Black, Professions.Bishop)
    board.addPiece(1, 7, Teams.Black, Professions.Knight)
    board.addPiece(1, 2, Teams.Black, Professions.Knight)
    board.addPiece(2, 1, Teams.Black, Professions.Archer)
    board.addPiece(2, 8, Teams.Black, Professions.Archer)

    for (let i = 1; i < 7; i++) {
      board.addPiece(12, i + 1, Teams.White, Professions.Pawn)
    }
    board.addPiece(13, 5, Teams.White, Professions.King)
    board.addPiece(13, 1, Teams.White, Professions.Rook)
    board.addPiece(13, 8, Teams.White, Professions.Rook)
    board.addPiece(13, 4, Teams.White, Professions.Queen)
    board.addPiece(13, 3, Teams.White, Professions.Bishop)
    board.addPiece(13, 6, Teams.White, Professions.Bishop)
    board.addPiece(13, 7, Teams.White, Professions.Knight)
    board.addPiece(13, 2, Teams.White, Professions.Knight)
    board.addPiece(12, 1, Teams.White, Professions.Archer)
    board.addPiece(12, 8, Teams.White, Professions.Archer)

    return board
  }
}
