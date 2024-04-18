import type { GameBoard } from '../classes/GameBoard'

export type GameMap = {
  image: string
  name: string
  identifier: string
  generate: () => GameBoard
}
