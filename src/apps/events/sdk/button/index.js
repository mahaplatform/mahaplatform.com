class Event {

  code = null
  label = null
  className = null
  button = null
  canvas = null
  iframe = null

  _handleInit = this._handleInit.bind(this)
  _handleOpen = this._handleOpen.bind(this)

  constructor(options = {}) {
    this.code = options.code
    this.label = options.label || 'Buy Tickets'
    this.className = options.className
    document.addEventListener('DOMContentLoaded', this._handleInit, false)
  }

  _handleInit() {
    const stylesheet = document.createElement('link')
    stylesheet.rel = 'stylesheet'
    stylesheet.type = 'text/css'
    stylesheet.href = `${process.env.WEB_HOST}/admin/css/button.css`
    document.head.appendChild(stylesheet)

    const buttons = document.querySelectorAll(`[data-event="${this.code}"]`)

    this.button = buttons[0]
    this.button.className = this.className
    this.button.innerHTML = this.label
    this.button.addEventListener('click', this._handleOpen, false)

    this.body = document.createElement('div')
    this.body.className = 'maha-events-button'
    document.body.appendChild(this.body)

    this.canvas = document.createElement('div')
    this.canvas.className = 'maha-events-button-canvas'
    this.body.appendChild(this.canvas)

    this.modal = document.createElement('div')
    this.modal.className = 'maha-events-button-modal'
    this.body.appendChild(this.modal)
  }

  _handleOpen() {
    this.body.className = 'maha-events-button open'
    this.iframe = document.createElement('iframe')
    this.iframe.src = `${process.env.WEB_HOST}/events/${this.code}`
    this.iframe.frameBorder = 0
    this.modal.appendChild(this.iframe)
  }

  _handleResize(height) {
    this.iframe.style.height = `${height}px`
  }

}

export default Event
