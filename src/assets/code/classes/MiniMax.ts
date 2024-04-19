import type { AINode } from '../types/AINode'
import { AIAction } from './AIAction'
import { GameBoard } from './GameBoard'

/**
 * Calculate the value of the pieces of the specified team
 * @param checkTeam The team
 * @param checkPieces The pieces
 * @returns The total value of the pieces
 */
function calculateScore(board: GameBoard): number {
  return (
    board.pieces
      .filter((p) => p.team === board.turn)
      .map((p) => p.profession)
      .reduce((a, b) => a + b, 0) -
    board.pieces
      .filter((p) => p.team === -board.turn)
      .map((p) => p.profession)
      .reduce((a, b) => a + b, 0)
  )
}

function findChildren(parent: AINode): AINode[] {
  const children: AINode[] = []
  for (const piece of parent.board.pieces.filter((p) => p.team === parent.board.turn)) {
    const clone = parent.board.cloneBoard(parent.board)
    clone.turn = -clone.turn
    clone.showMoves(piece.x, piece.y)
    for (const tile of clone.tiles.filter((t) => t.highlight)) {
      const cloneCopy = clone.cloneBoard(clone)
      cloneCopy.movePiece(piece.x, piece.y, tile.x, tile.y)
      children.push({
        score: 0,
        board: cloneCopy,
        children: [],
        parent: parent,
        fromX: piece.x,
        fromY: piece.y,
        toX: tile.x,
        toY: tile.y
      })
    }
  }
  const gameOvers = children.filter((c) => c.board.gameOver)
  if (gameOvers.length) {
    return gameOvers
  }
  return children
}

/**
 * Needs to add pruning to improve memory usage
 */
function miniMax(parent: AINode, depth: number, limit: number, max: boolean): AINode[] {
  if (depth !== limit) {
    parent.children = findChildren(parent)
    for (const child of parent.children) {
      miniMax(child, depth + 1, limit, !max)
    }
  } else {
    parent.score = calculateScore(parent.board)
  }
  if (parent.parent === null || parent.children.length !== 0) {
    if (max) {
      parent.score = parent.children
        .map((c) => c.score)
        .reduce((a, b) => {
          return Math.max(a, b)
        })
    } else {
      parent.score = parent.children
        .map((c) => c.score)
        .reduce((a, b) => {
          return Math.min(a, b)
        })
    }
  }

  return parent.children
}

export function runMiniMax(board: GameBoard): AIAction | null {
  const result = miniMax(
    { score: 0, board: board, children: [], parent: null, fromX: 0, fromY: 0, toX: 0, toY: 0 },
    0,
    2, // 4 or more seems to cause frequent out of memory error, 3 is risky but also dumb for some reason
    true
  )
  console.log(result)
  const top = result.reduce((a, b) => {
    if (a.score > b.score) {
      return a
    } else {
      return b
    }
  })
  console.log(top)
  const target = board.getPiece(top.fromX, top.fromY)
  if (target) return new AIAction(target.id, top.fromX, top.fromY, top.toX, top.toY, top.score)
  else return null
}
