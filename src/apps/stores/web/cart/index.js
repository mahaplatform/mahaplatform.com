import localforage from 'localforage'
import Pasteur from 'pasteur'

class Cart {

  _handleClear = this._handleClear.bind(this)
  _handleGet = this._handleGet.bind(this)
  _handleSet = this._handleSet.bind(this)

  constructor() {
    this.pasteur = new Pasteur({
      window,
      target: window.parent,
      name: 'cartStore',
      targetName: 'cart'
    })
    this.db = localforage.createInstance({
      name: 'store',
      storeName: window.code
    })
    this.pasteur.on('clear', this._handleClear)
    this.pasteur.on('get', this._handleGet)
    this.pasteur.on('set', this._handleSet)
    this.pasteur.send('ready')
  }

  async _handleClear() {
    return await this.db.setItem('cart', {
      cart: {}
    })
  }

  async _handleGet() {
    return await this.db.getItem('cart')
  }

  async _handleSet(cart) {
    return await this.db.setItem('cart', cart)
  }

}

new Cart()
