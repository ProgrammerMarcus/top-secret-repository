import { GameBoard } from '@/assets/code/classes/GameBoard'
import type { GameMap } from '@/assets/code/types/GameMap'
import { Types, Professions, Teams, Areas } from '@/assets/code/enums'
import mapImage from '@/assets/menu/maps/mines.webp'

export const mines: GameMap = {
  image: mapImage,
  name: 'Mines',
  identifier: '4',
  generate: function (): GameBoard {
    const board = new GameBoard(9, 7)
    for (let x = 1; x <= board.width; x++) {
      for (let y = 1; y <= board.height; y++) {
        if (x === 2) {
          board.addTile(x, y, Types.stoneMiddle)
        } else if (x == 1) {
          board.addTile(x, y, Types.Stone)
        } else if (x > 7) {
          board.addTile(x, y, Types.Grass)
        } else if ((x % 2 === 0 && y % 3 !== 0) || (x % 4 !== 0 && y % 4 === 0)) {
          board.addTile(x, y, Types.Rock, Areas.None)
        } else {
          board.addTile(x, y)
        }
      }
    }

    board.addPiece(9, 4, Teams.White, Professions.King)
    board.addPiece(1, 4, Teams.Black, Professions.King)

    board.addPiece(7, 5, Teams.White, Professions.Archer)
    board.addPiece(3, 5, Teams.Black, Professions.Archer)

    board.addPiece(7, 6, Teams.White, Professions.Axeman)
    board.addPiece(3, 6, Teams.Black, Professions.Axeman)

    board.addPiece(7, 3, Teams.White, Professions.Knight)
    board.addPiece(3, 3, Teams.Black, Professions.Knight)

    board.addPiece(7, 1, Teams.White, Professions.Rook)
    board.addPiece(3, 1, Teams.Black, Professions.Rook)

    board.addPiece(7, 2, Teams.White, Professions.Pawn)
    board.addPiece(3, 2, Teams.Black, Professions.Pawn)

    board.addPiece(7, 7, Teams.White, Professions.Pawn)
    board.addPiece(3, 7, Teams.Black, Professions.Pawn)

    return board
  }
}
