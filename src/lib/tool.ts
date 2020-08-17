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
      this.context.rect(x1, y1, Math.abs(x2 - x1), Math.abs(y2 - y1))
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
}