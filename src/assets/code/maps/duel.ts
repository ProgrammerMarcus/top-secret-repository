import { GameBoard } from '@/assets/code/classes/GameBoard'
import type { GameMap } from '@/assets/code/types/GameMap'
import { Types, Professions, Teams } from '@/assets/code/enums'
import mapImage from '@/assets/menu/maps/classic.webp'

export const duel: GameMap = {
  image: mapImage,
  name: 'Duel',
  identifier: '5',
  generate: function (): GameBoard {
    const board = new GameBoard(8, 8)
    for (let x = 1; x <= board.width; x++) {
      for (let y = 1; y <= board.height; y++) {
        if ((x % 3 === 0 && y % 2 !== 0) || (x % 2 !== 0 && y % 2 === 0)) {
          board.addTile(x, y)
        } else {
          board.addTile(x, y, Types.Stone)
        }
      }
    }

    for (let i = 0; i < 8; i++) {
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

    for (let i = 0; i < 8; i++) {
      board.addPiece(7, i + 1, Teams.White, Professions.Pawn)
    }
    board.addPiece(8, 4, Teams.White, Professions.King)
    board.addPiece(8, 1, Teams.White, Professions.Rook)
    board.addPiece(8, 8, Teams.White, Professions.Rook)
    board.addPiece(8, 5, Teams.White, Professions.Queen)
    board.addPiece(8, 3, Teams.White, Professions.Bishop)
    board.addPiece(8, 6, Teams.White, Professions.Bishop)
    board.addPiece(8, 7, Teams.White, Professions.Knight)
    board.addPiece(8, 2, Teams.White, Professions.Knight)

    return board
  }
}
