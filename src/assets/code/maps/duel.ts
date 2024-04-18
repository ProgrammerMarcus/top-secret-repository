import { GameBoard } from '@/assets/code/classes/GameBoard'
import type { GameMap } from '@/assets/code/types/GameMap'
import { Professions, Teams } from '@/assets/code/enums'
import mapImage from '@/assets/menu/maps/duel.webp'

export const duel: GameMap = {
  image: mapImage,
  name: 'Duel',
  identifier: '5',
  generate: function (): GameBoard {
    const board = new GameBoard(5, 5)
    for (let x = 1; x <= board.width; x++) {
      for (let y = 1; y <= board.height; y++) {
        board.addTile(x, y)
      }
    }

    for (let i = 0; i < 5; i++) {
      board.addPiece(2, i + 1, Teams.Black, Professions.Pawn)
    }
    for (let i = 0; i < 5; i++) {
      board.addPiece(4, i + 1, Teams.White, Professions.Pawn)
    }

    board.addPiece(1, 3, Teams.Black, Professions.King)
    board.addPiece(5, 3, Teams.White, Professions.King)

    board.addPiece(1, 2, Teams.Black, Professions.Queen)
    board.addPiece(5, 2, Teams.White, Professions.Queen)

    board.addPiece(1, 4, Teams.Black, Professions.Archer)
    board.addPiece(5, 4, Teams.White, Professions.Archer)

    board.addPiece(1, 5, Teams.Black, Professions.Axeman)
    board.addPiece(5, 5, Teams.White, Professions.Axeman)

    board.addPiece(1, 1, Teams.Black, Professions.Knight)
    board.addPiece(5, 1, Teams.White, Professions.Knight)

    return board
  }
}
