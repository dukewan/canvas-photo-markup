import { Tool } from './tool'
import { debounce } from 'lodash'

export class Arrow extends Tool {
  private isDrawing: boolean = false
  private startX: number = 0
  private startY: number = 0
  private beginState: ImageData
  private debouncedMove = debounce(this.unDebouncedMove, 5)
  private arrowHeadLegth = 20

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

  end(e: MouseEvent) {
    if (this.isDrawing) {
      this.unDebouncedMove(e)
      this.startX = 0
      this.startY = 0
      this.isDrawing = false
    }
  }
}