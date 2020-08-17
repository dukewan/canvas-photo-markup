import { Editor } from './lib/editor'
import { Tool } from './lib/tool'

export class PhotoEditor {
  private editor: Editor;
  constructor() {
    this.editor = new Editor({
      id: 'demo'
    })

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
  }

  chooseTool(name: string) {
    const tool = this.editor.getToolByName(name)
    if (tool) {
      this.editor.chooseTool(tool)
    }
  }
}

const photoEditor = new PhotoEditor()