import { Editor } from './lib/editor'
import { Tool } from './lib/tool'
import { times } from 'lodash';

export class PhotoEditor {
  private editor: Editor;
  private diameterConfig: HTMLElement
  private diameterDisplay: HTMLElement
  private colorConfig: HTMLElement
  private colorDisplay: HTMLElement
  private inputFile: HTMLInputElement
  constructor() {
    this.editor = new Editor({
      id: 'demo'
    })

    this.editor.canvas.width = document.body.clientWidth

    this.diameterConfig = document.getElementById('diameter-config')
    this.diameterDisplay = document.getElementById('diameter-display')
    this.colorConfig = document.getElementById('color-config')
    this.colorDisplay = document.getElementById('color-display')
    this.inputFile = document.getElementById('choose-file') as HTMLInputElement

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
        document.querySelectorAll('#tools > div').forEach((toolEle) => {
          toolEle.classList.remove('selected')
        })
        ele.classList.add('selected')
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

    this.colorConfig.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('color')) {
        const value = (e.target as HTMLElement).dataset.color
        this.editor.setColor(value)
        this.colorDisplay.setAttribute('style', `background-color:${value};`)
      }
    })

    this.inputFile.addEventListener('change', () => {
      this.chooseFile()
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
    if (name === 'color') {
      this.colorConfig.setAttribute('style', 'display: flex;');
    } else {
      this.colorConfig.setAttribute('style', 'display: none;');
    }
  }

  chooseFile() {
    if (this.inputFile.files.length > 0) {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(this.inputFile.files[0])
      fileReader.onload = () => {
        const img = new Image()
        img.src = fileReader.result as string
        img.onload = () => {
          this.editor.canvas.width = document.body.clientWidth
          this.editor.setImage(img)
        }
      }
    }
  }
}

const photoEditor = new PhotoEditor()