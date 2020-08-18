import { Tool } from './tool'

export class Pen extends Tool {
  private isDrawing: boolean = false;
  private startX: number = 0;
  private startY: number = 0;

  start(e: MouseEvent | TouchEvent) {
    const { offsetX, offsetY } = this.getOffset(e)

    this.startX = offsetX
    this.startY = offsetY
    this.isDrawing = true
  }

  move(e: MouseEvent | TouchEvent) {
    const { offsetX, offsetY } = this.getOffset(e)

    if (this.isDrawing) {
      this.drawLine(this.startX, this.startY, offsetX, offsetY)
      this.startX = offsetX
      this.startY = offsetY
    }
  }

  end(e: MouseEvent | TouchEvent) {
    const { offsetX, offsetY } = this.getOffset(e)

    if (this.isDrawing) {
      this.drawLine(this.startX, this.startY, offsetX, offsetY)
      this.startX = 0
      this.startY = 0
      this.isDrawing = false
    }
  }
}