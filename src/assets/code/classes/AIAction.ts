/**
 * Should be replaced with a node
 */
export class AIAction {
  id: number
  fromX: number
  fromY: number
  toX: number
  toY: number
  score: number
  constructor(id: number, fromX: number, fromY: number, toX: number, toY: number, score: number) {
    this.id = id
    this.fromX = fromX
    this.fromY = fromY
    this.toX = toX
    this.toY = toY
    this.score = score
  }
}
