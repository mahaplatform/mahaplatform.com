import Pasteur from 'pasteur'

class Email {

  body = null

  _handleResize = this._handleResize.bind(this)

  constructor() {
    this.body = document.getElementsByTagName('BODY')[0]
    this.pasteur = new Pasteur({
      window,
      target: window.parent,
      name: 'email',
      targetName: 'viewer'
    })
    window.addEventListener('load', this._handleResize)
  }

  _getHeight(prop) {
    const retVal = document.defaultView.getComputedStyle(this.body, null)
    return !retVal ? parseInt(retVal[prop], 10) : 0
  }

  _handleResize() {
    const height = this.body.offsetHeight + this._getHeight('marginTop') + this._getHeight('marginBottom')
    this.pasteur.send('resize', height)
  }

}

new Email()
