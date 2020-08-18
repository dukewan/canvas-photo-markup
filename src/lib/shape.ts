import { Tool } from './tool'
import { debounce } from 'lodash'

export class Shape extends Tool {
  protected isDrawing: boolean = false
  protected startX: number = 0
  protected startY: number = 0
  protected beginState: ImageData
  protected debouncedMove = debounce(this.unDebouncedMove, 5)

  start(e: MouseEvent) {
    this.startX = e.offsetX
    this.startY = e.offsetY
    this.isDrawing = true
    this.beginState =
      this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
  }

  move(e: MouseEvent) {
    this.debouncedMove(e)
  }

  unDebouncedMove(e: MouseEvent) { }

  end(e: MouseEvent) {
    if (this.isDrawing) {
      this.unDebouncedMove(e)
      this.startX = 0
      this.startY = 0
      this.isDrawing = false
    }
  }

  public setBeginState(state: ImageData) {
    this.beginState = state
  }
}