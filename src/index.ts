import { Editor } from './lib/editor'
import { Tool } from './lib/tool'
import { times } from 'lodash';

export class PhotoEditor {
  private editor: Editor;
  private diameterConfig: HTMLElement
  private diameterDisplay: HTMLElement
  constructor() {
    this.editor = new Editor({
      id: 'demo'
    })

    this.diameterConfig = document.getElementById('diameter-config')
    this.diameterDisplay = document.getElementById('diameter-display')

    this.editor.canvas.addEventListener('mousedown', (e) => {
      this.editor.onStart(e)
    })

    this.editor.canvas.addEventListener('mousemove', (e) => {
      this.editor.onMove(e)
    })

    window.addEventListener('mouseup', (e) => {
      this.editor.onEnd(e)
    })

    document.querySelectorAll('#tools > div').forEach((ele) => {
      ele.addEventListener('click', () => {
        this.chooseTool((ele as HTMLElement).dataset.tool)
      })
    })

    document.getElementById('clear').addEventListener('click', () => {
      this.editor.clear()
    })

    this.diameterConfig.addEventListener('input', (e) => {
      const value = Number((e.target as HTMLInputElement).value)
      this.editor.setWidth(value)
      this.diameterDisplay.setAttribute('style',
        `width:${value * 2}px;height:${value * 2}px;`)
    })
  }

  chooseTool(name: string) {
    const tool = this.editor.getToolByName(name)
    if (tool) {
      this.editor.chooseTool(tool)
    }
    if (name === 'diameter') {
      this.diameterConfig.setAttribute('style', 'display: block;');
    } else {
      this.diameterConfig.setAttribute('style', 'display: none;');
    }
  }
}

const photoEditor = new PhotoEditor()