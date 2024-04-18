import { GameBoard } from '@/assets/code/classes/GameBoard'
import type { GameMap } from '@/assets/code/types/GameMap'
import { Types, Professions, Teams, Areas } from '@/assets/code/enums'
import mapImage from '@/assets/menu/maps/ambush.webp'

export const ambush: GameMap = {
  image: mapImage,
  name: 'Ambush',
  identifier: '3',
  generate: function (): GameBoard {
    const board = new GameBoard(8, 8)
    for (let x = 1; x <= board.width; x++) {
      for (let y = 1; y <= board.height; y++) {
        if (x === 4 && y === 6) {
          board.addTile(x, y, Types.TreeTop, Areas.None)
        } else if (x === 2 && y === 6) {
          board.addTile(x, y, Types.TreeBottom, Areas.None)
        } else if (x === 2 && y === 5) {
          board.addTile(x, y, Types.TreeTop, Areas.None)
        } else if (x === 7 && y === 5) {
          board.addTile(x, y, Types.TreeBottom, Areas.None)
        } else if (x === 7 && y === 4) {
          board.addTile(x, y, Types.TreeTop, Areas.None)
        } else if (x === 4 && y === 7) {
          board.addTile(x, y, Types.TreeBottom, Areas.None)
        } else if (x === 6 && y === 2) {
          board.addTile(x, y, Types.TreeTop, Areas.None)
        } else if (x === 6 && y === 3) {
          board.addTile(x, y, Types.TreeBottom, Areas.None)
        } else {
          board.addTile(x, y)
        }
      }
    }

    board.addPiece(5, 4, Teams.White, Professions.King)
    board.addPiece(4, 3, Teams.White, Professions.Axeman)
    board.addPiece(6, 5, Teams.White, Professions.Axeman)
    board.addPiece(5, 3, Teams.White, Professions.Archer)
    board.addPiece(5, 5, Teams.White, Professions.Archer)

    board.addPiece(2, 7, Teams.Black, Professions.Axeman)
    board.addPiece(1, 6, Teams.Black, Professions.Axeman)
    board.addPiece(3, 8, Teams.Black, Professions.Axeman)
    board.addPiece(8, 1, Teams.Black, Professions.Archer)
    board.addPiece(2, 2, Teams.Black, Professions.Bishop)
    board.addPiece(7, 7, Teams.Black, Professions.Bishop)
    board.addPiece(1, 8, Teams.Black, Professions.King)
    return board
  }
}
