import { Shape } from './shape'

export class Rectangle extends Shape {
  unDebouncedMove(e: MouseEvent | TouchEvent) {
    const { offsetX, offsetY } = this.getOffset(e)

    if (this.isDrawing) {
      this.context.putImageData(this.beginState, 0, 0)
      this.drawRect(this.startX, this.startY, offsetX, offsetY)
    }
  }
}