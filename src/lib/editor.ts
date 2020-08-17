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
  private width: number = 5

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
}