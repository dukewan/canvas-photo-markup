import { Shape } from './shape'

export class Ellipsis extends Shape {
  unDebouncedMove(e: MouseEvent | TouchEvent) {
    const { offsetX, offsetY } = this.getOffset(e)

    if (this.isDrawing) {
      this.context.putImageData(this.beginState, 0, 0)
      this.drawEllipsis(this.startX, this.startY, offsetX, offsetY)
    }
  }
}