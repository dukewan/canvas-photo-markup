import { Arrow } from './arrow'
import { Ellipsis } from './ellipsis'
import { Rectangle } from './rectangle'
import { Pen } from './pen'
import { Mosaic } from './mosaic'
import { Text } from './text'
import { Diameter } from './diameter'
import { Color } from './color'
import { Tool } from './tool'

export class Editor {
  private arrowTool: Arrow
  private ellipsisTool: Ellipsis
  private rectangleTool: Rectangle
  private penTool: Pen
  private mosaicTool: Mosaic
  private textTool: Text
  private diameterTool: Diameter
  private colorTool: Color
  private currentTool: Tool
  public canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private color: string = 'red'
  private width: number = 2
  private image: HTMLImageElement
  private filename: string

  constructor(options: EditorOptions) {
    this.canvas = document.getElementById(options.id) as HTMLCanvasElement
    this.context = this.canvas.getContext('2d')

    const toolOptions = {
      canvas: this.canvas,
      context: this.context,
      color: this.color,
      width: this.width
    }

    this.arrowTool = new Arrow(toolOptions)
    this.ellipsisTool = new Ellipsis(toolOptions)
    this.rectangleTool = new Rectangle(toolOptions)
    this.penTool = new Pen(toolOptions)
    this.mosaicTool = new Mosaic(toolOptions)
    this.textTool = new Text(toolOptions)
    this.diameterTool = new Diameter(toolOptions)
    this.colorTool = new Color(toolOptions)
    this.currentTool = this.arrowTool
  }

  public clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    if (this.image) {
      this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height)
    }
  }

  public save() {
    const data = this.canvas.toDataURL('image/png')
    const filename = this.filename
      + `_${new Date().getFullYear()}`
      + `${new Date().getMonth()}`
      + `${new Date().getDate()}`
      + `${new Date().getHours()}`
      + `${new Date().getMinutes()}`
      + `.png`
    this.downloadImage(data, filename)
  }

  public getToolByName(name: string): Tool | undefined {
    switch (name) {
      case 'arrow':
        return this.arrowTool
      case 'ellipsis':
        return this.ellipsisTool
      case 'rectangle':
        return this.rectangleTool
      case 'pen':
        return this.penTool
      case 'mosaic':
        return this.mosaicTool
      case 'text':
        return this.textTool
      case 'color':
        return this.colorTool
      case 'diameter':
        return this.diameterTool
    }
    return undefined
  }

  public chooseTool(tool: Tool) {
    this.currentTool = tool
    this.currentTool.color = this.color
    this.currentTool.width = this.width

    if (this.currentTool === this.textTool) {
      this.textTool.change('')
    }
  }

  public setImage(img: HTMLImageElement, filename: string) {
    this.image = img
    this.filename = filename
    if (img.width > this.canvas.width) {
      this.canvas.height = img.height
        * (this.canvas.width / img.width)
    } else {
      this.canvas.width = img.width
      this.canvas.height = img.height
    }
    this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
  }

  public setColor(color: string) {
    this.color = color
  }

  public setWidth(width: number) {
    this.width = width
  }

  public onStart(e: MouseEvent) {
    this.currentTool.start(e)
  }

  public onMove(e: MouseEvent) {
    this.currentTool.move(e)
  }

  public onEnd(e: MouseEvent) {
    this.currentTool.end(e)
  }

  public onChange(value: any) {
    if (this.currentTool === this.textTool) {
      this.textTool.change(value)
    }
  }

  public downloadImage(data: string, filename = 'untitled.png') {
    const a = document.createElement('a')
    a.href = data
    a.download = filename
    document.body.appendChild(a)
    a.click()
  }
}