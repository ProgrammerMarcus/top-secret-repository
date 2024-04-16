// images
import pawnBlack from '@/assets/pieces/pawn_b.webp'
import pawnWhite from '@/assets/pieces/farmer_w.webp'
import kingBlack from '@/assets/pieces/fire_b.webp'
import kingWhite from '@/assets/pieces/king_w.webp'
import archerBlack from '@/assets/pieces/archer_b.webp'
import archerWhite from '@/assets/pieces/leaf_w.webp'
import queenBlack from '@/assets/pieces/aristocrat_b.webp'
import queenWhite from '@/assets/pieces/princess_w.webp'
import bishopBlack from '@/assets/pieces/jester_b.webp'
import bishopWhite from '@/assets/pieces/priestess_w.webp'
import knightBlack from '@/assets/pieces/stranger_b.webp'
import knightWhite from '@/assets/pieces/captain_w.webp'
import rookBlack from '@/assets/pieces/metal_b.webp'
import rookWhite from '@/assets/pieces/shady_w.webp'
import { Professions, Teams } from '../enums'

/**
 * Class representing the pieces on the board.
 */
export class GamePiece {
  team
  profession
  x
  y
  image
  id
  constructor(
    x: number,
    y: number,
    team: Teams = Teams.White,
    profession: Professions = Professions.Pawn,
    id: number = Math.random() // replace this
  ) {
    this.team = team
    this.x = x
    this.y = y
    this.profession = profession
    this.id = id
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
