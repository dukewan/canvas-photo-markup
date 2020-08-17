import { Editor } from './lib/editor'

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
  }
}

new PhotoEditor()