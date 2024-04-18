import type { GameBoard } from '../classes/GameBoard'

export type AINode = {
  score: number
  board: GameBoard
  parent: AINode | null
  children: AINode[]
  fromX: number
  fromY: number
  toX: number
  toY: number
}
