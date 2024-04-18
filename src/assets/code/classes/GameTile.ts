import { Areas, Types } from '../enums'

// images
import grass from '@/assets/tiles/tile_grass.png'
import waterCorner from '@/assets/tiles/tile_water_corner.png'
import waterMiddle from '@/assets/tiles/tile_water_middle.png'
import bush from '@/assets/tiles/tile_bush.png'
import rock from '@/assets/tiles/tile_rock.png'
import log from '@/assets/tiles/tile_log.png'
import stone from '@/assets/tiles/tile_stone.png'
import waterStoneCorner from '@/assets/tiles/tile_water_stone_corner.png'
import waterStoneMiddle from '@/assets/tiles/tile_water_stone_middle.png'
import treeTop from '@/assets/tiles/tile_tree_top.png'
import treeBottom from '@/assets/tiles/tile_tree_bottom.png'
import stoneMiddle from '@/assets/tiles/tile_stone_middle.png'

/**
 * Class representing the tiles on the board.
 */
export class GameTile {
  rotate
  type
  area
  highlight = false
  x
  y
  image
  constructor(
    x: number,
    y: number,
    type: Types = Types.Grass,
    area: Areas = Areas.Regular,
    rotate: number = 0
  ) {
    this.rotate = rotate
    this.type = type
    this.x = x
    this.y = y
    this.area = area
    switch (type) {
      case Types.WaterCorner:
        this.image = waterCorner
        break
      case Types.WaterMiddle:
        this.image = waterMiddle
        break
      case Types.Rock:
        this.image = rock
        break
      case Types.Log:
        this.image = log
        break
      case Types.Stone:
        this.image = stone
        break
      case Types.WaterStoneCorner:
        this.image = waterStoneCorner
        break
      case Types.WaterStoneMiddle:
        this.image = waterStoneMiddle
        break
      case Types.TreeTop:
        this.image = treeTop
        break
      case Types.TreeBottom:
        this.image = treeBottom
        break
      case Types.Bush:
        this.image = bush
        break
      case Types.StoneCorner:
        this.image = stoneMiddle
        break
      default:
        this.image = grass
    }
  }
}
