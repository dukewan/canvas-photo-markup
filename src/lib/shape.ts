import { Tool } from './tool'
import { debounce } from 'lodash'

export class Shape extends Tool {
  protected isDrawing: boolean = false
  protected startX: number = 0
  protected startY: number = 0
  protected debouncedMove = debounce(this.unDebouncedMove, 5)

  start(e: MouseEvent | TouchEvent) {
    const { offsetX, offsetY } = this.getOffset(e)
    this.startX = offsetX
    this.startY = offsetY

    this.isDrawing = true
    this.beginState =
      this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
  }

  move(e: MouseEvent | TouchEvent) {
    this.debouncedMove(e)
  }

  unDebouncedMove(e: MouseEvent | TouchEvent) { }

  end(e: MouseEvent | TouchEvent) {
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