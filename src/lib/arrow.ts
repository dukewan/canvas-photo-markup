import { Shape } from './shape'

export class Arrow extends Shape {
  private arrowHeadLegth = 20

  unDebouncedMove(e: MouseEvent) {
    if (this.isDrawing) {
      this.context.putImageData(this.beginState, 0, 0)
      const dx = e.offsetX - this.startX
      const dy = e.offsetY - this.startY
      const angle = Math.atan2(dy, dx)
      this.drawLine(this.startX, this.startY, e.offsetX, e.offsetY)
      this.drawLine(e.offsetX, e.offsetY,
        e.offsetX - this.arrowHeadLegth * Math.cos(angle - Math.PI / 5),
        e.offsetY - this.arrowHeadLegth * Math.sin(angle - Math.PI / 5))
      this.drawLine(e.offsetX, e.offsetY,
        e.offsetX - this.arrowHeadLegth * Math.cos(angle + Math.PI / 5),
        e.offsetY - this.arrowHeadLegth * Math.sin(angle + Math.PI / 5))
    }
  }
}