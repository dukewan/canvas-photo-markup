import { Shape } from './shape'

export class Mosaic extends Shape {
  private colors: Array<string> = ['#fff', 'gray', '#cccccc', '#3a3a3a']

  start(e: MouseEvent) {
    this.isDrawing = true
    this.beginState =
      this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
  }

  move(e: MouseEvent) {
    this.debouncedMove(e)
  }

  unDebouncedMove(e: MouseEvent) {
    if (this.isDrawing) {
      const color = this.colors[Math.floor(Math.random() * 4)]
      this.drawRectFilled(color,
        e.offsetX, e.offsetY, this.width * 2, this.width * 2)
    }
  }

  end(e: MouseEvent) {
    if (this.isDrawing) {
      this.unDebouncedMove(e)
      this.isDrawing = false
    }
  }
}