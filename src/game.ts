import Placeholder from './assets/placeholder.png'

class GameBoard {
  #width
  #grid: GameTile[]
  constructor(width: number, grid: GameTile[]) {
    this.#width = width
    this.#grid = grid
  }
  setGrid = (grid: GameTile[]): void => {
    this.#grid = grid
  }
  getGrid = (): GameTile[] => {
    return this.#grid
  }
}

class GameMove {
  #x
  #y
  constructor(x: number, y: number) {
    this.#x = x
    this.#y = y
  }
  playMove = (board: GameBoard): GameBoard => {
    return board
  }
}

class GameTile {
  image
  constructor(image: string) {
    this.image = image
  }
  availableMoves = (board: GameTile): GameMove[] => {
    console.log('unimplemented', board)
    return []
  }
}

const board = new GameBoard(3, [
  new GameTile(Placeholder),
  new GameTile(Placeholder),
  new GameTile(Placeholder),
  new GameTile(Placeholder),
  new GameTile(Placeholder),
  new GameTile(Placeholder),
  new GameTile(Placeholder),
  new GameTile(Placeholder),
  new GameTile(Placeholder)
])

export default board
