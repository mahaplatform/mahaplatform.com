import Pasteur from 'pasteur'

class Form {

  pasteur = null

  _handleInit = this._handleInit.bind(this)
  _handleResize = this._handleResize.bind(this)

  constructor() {
    document.addEventListener('DOMContentLoaded', this._handleInit, false)
  }

  _getBodyStyle(prop) {
    const el = document.body
    const retVal = document.defaultView.getComputedStyle(el, null)
    return !retVal ? parseInt(retVal[prop], 10) : 0
  }

  _handleInit() {
    this.pasteur = new Pasteur({
      window,
      target: window.parent,
      name: 'form',
      targetName: 'embed',
      services: {
        form: {}
      }
    })
    this._handleResize()
  }

  _handleResize() {
    const height = document.body.offsetHeight + this._getBodyStyle('marginTop') + this._getBodyStyle('marginBottom') + 40
    this.pasteur.send('embed', 'resize', height)
  }

}

new Form()
