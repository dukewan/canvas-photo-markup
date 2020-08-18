import { Shape } from './shape'

export class Text extends Shape {
  private str: string;

  public change(value: any) {
    if (value === '') {
      this.str = ''
      this.beginState = this.context.getImageData(0, 0,
        this.canvas.width, this.canvas.height)
    } else {
      this.str = value
      this.context.putImageData(this.beginState, 0, 0)
      this.drawText(this.str, this.canvas.width / 2, this.canvas.height / 2)
    }
  }

  start(e: MouseEvent) {
    this.isDrawing = true
  }

  unDebouncedMove(e: MouseEvent) {
    if (this.isDrawing) {
      this.context.putImageData(this.beginState, 0, 0)
      this.drawText(this.str, e.offsetX, e.offsetY)
    }
  }

  end(e: MouseEvent) {
    if (this.isDrawing) {
      this.unDebouncedMove(e)
      this.isDrawing = false
    }
  }
}