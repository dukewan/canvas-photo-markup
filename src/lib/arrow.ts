import { Shape } from './shape'

export class Arrow extends Shape {
  private arrowHeadLegth = 20

  unDebouncedMove(e: MouseEvent | TouchEvent) {
    const { offsetX, offsetY } = this.getOffset(e)

    if (this.isDrawing) {
      this.context.putImageData(this.beginState, 0, 0)
      const dx = offsetX - this.startX
      const dy = offsetY - this.startY
      const angle = Math.atan2(dy, dx)
      this.drawLine(this.startX, this.startY, offsetX, offsetY)
      this.drawLine(offsetX, offsetY,
        offsetX - this.arrowHeadLegth * Math.cos(angle - Math.PI / 5),
        offsetY - this.arrowHeadLegth * Math.sin(angle - Math.PI / 5))
      this.drawLine(offsetX, offsetY,
        offsetX - this.arrowHeadLegth * Math.cos(angle + Math.PI / 5),
        offsetY - this.arrowHeadLegth * Math.sin(angle + Math.PI / 5))
    }
  }
}