import { Tool } from './tool'

export class Pen extends Tool {
  private isDrawing: boolean = false;
  private startX: number = 0;
  private startY: number = 0;

  start(e: MouseEvent) {
    this.startX = e.offsetX
    this.startY = e.offsetY
    this.isDrawing = true
  }

  move(e: MouseEvent) {
    if (this.isDrawing) {
      this.drawLine(this.startX, this.startY, e.offsetX, e.offsetY)
      this.startX = e.offsetX
      this.startY = e.offsetY
    }
  }

  end(e: MouseEvent) {
    if (this.isDrawing) {
      this.drawLine(this.startX, this.startY, e.offsetX, e.offsetY)
      this.startX = 0
      this.startY = 0
      this.isDrawing = false
    }
  }
}