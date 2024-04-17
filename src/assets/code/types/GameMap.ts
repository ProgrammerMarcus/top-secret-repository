import type { GameBoard } from '../classes/GameBoard'

export type GameMap = {
  image: String
  name: String
  generate: () => GameBoard
}
