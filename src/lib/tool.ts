export class Tool {
  protected canvas: HTMLCanvasElement
  protected context: CanvasRenderingContext2D
  public color: string
  public width: number

  constructor(options: ToolOptions) {
    this.canvas = options.canvas
    this.context = options.context
    this.color = options.color
    this.width = options.width
  }

  start(e: MouseEvent) { }
  move(e: MouseEvent) { }
  end(e: MouseEvent) { }

  drawFunc(draw: Function) {
    this.context.save()
    this.context.beginPath()
    this.context.strokeStyle = this.color
    this.context.lineWidth = this.width

    draw()

    this.context.stroke()
    this.context.restore()
  }

  drawLine(x1: number, y1: number, x2: number, y2: number) {
    this.drawFunc(() => {
      this.context.moveTo(x1, y1)
      this.context.lineTo(x2, y2)
      this.context.closePath()
    })
  }

  drawRect(x1: number, y1: number, x2: number, y2: number) {
    this.drawFunc(() => {
      const X1 = Math.min(x1, x2)
      const Y1 = Math.min(y1, y2)
      const X2 = Math.max(x1, x2)
      const Y2 = Math.max(y1, y2)
      this.context.rect(X1, Y1, X2 - X1, Y2 - Y1)
    })
  }

  drawEllipsis(x1: number, y1: number, x2: number, y2: number) {
    this.drawFunc(() => {
      const centerX = (x1 + x2) / 2
      const centerY = (y1 + y2) / 2
      const radiusX = Math.abs(x1 - x2) / 2
      const radiusY = Math.abs(y1 - y2) / 2
      this.context.ellipse(centerX, centerY, radiusX, radiusY,
        0, 0, 2 * Math.PI)
    })
  }

  drawText(text: string, x: number, y: number) {
    this.drawFunc(() => {
      this.context.fillStyle = this.color
      this.context.font = `${this.width / 10 * 60}px serif`
      this.context.fillText(text, x, y, this.canvas.width)
    })
  }
}