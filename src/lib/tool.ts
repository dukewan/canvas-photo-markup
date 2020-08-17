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

  drawLine(x1: number, y1: number, x2: number, y2: number) {
    this.context.save()
    this.context.beginPath()
    this.context.strokeStyle = this.color
    this.context.lineWidth = this.width
    this.context.moveTo(x1, y1)
    this.context.lineTo(x2, y2)
    this.context.closePath()
    this.context.stroke()
    this.context.restore()
  }
}