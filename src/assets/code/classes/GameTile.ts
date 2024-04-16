import { Areas, Types } from '../enums'

// images
import grass from '@/assets/tiles/tile_grass.png'
import waterCorner from '@/assets/tiles/tile_water_corner.png'
import waterMiddle from '@/assets/tiles/tile_water_middle.png'
import bush from '@/assets/tiles/tile_bush.png'
import rock from '@/assets/tiles/tile_rock.png'
import log from '@/assets/tiles/tile_log.png'

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
    if (type === Types.WaterCorner) {
      this.image = waterCorner
    } else if (type === Types.WaterMiddle) {
      this.image = waterMiddle
    } else if (type === Types.Rock) {
      this.image = rock
    } else if (type === Types.Log) {
      this.image = log
    } else if (type === Types.Bush) {
      this.image = bush
    } else {
      this.image = grass
    }
  }
}
