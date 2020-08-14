import Emitter from './emitter'
import Pasteur from 'pasteur'

class Cart extends Emitter {

  catalog = null
  code = null
  db = null
  pasteur = null
  items = []

  _handleFetchItems = this._handleFetchItems.bind(this)

  constructor(config) {
    super()
    this.catalog = config.catalog
    this.code = config.code
    this._handleInit()
  }

  addItem(code) {
    const variants = this.catalog.getVariants()
    const variant = variants.find(variant => {
      return variant.code === code
    })
    if(!variant) throw new Error('unable to find variant')
    const exists = this.items.find(item => {
      return item.code === code
    }) !== undefined
    this._handleSetItems([
      ...this.items.map(item => ({
        ...item,
        quantity: item.quantity + (item.code === code ? 1 : 0)
      })),
      ...!exists ? [{
        code: variant.code,
        price: variant.fixed_price,
        quantity: 1
      }] : []
    ])
  }

  clearItems() {
    this.pasteur.send('clear', null, (cart) => {
      this.items = []
      this.emit('change')
    })
  }

  getCount() {
    return this.items.reduce((count, item) => {
      return count + item.quantity
    }, 0)
  }

  getItems() {
    const variants = this.catalog.getVariants()
    return this.items.map(item => ({
      ...item,
      ...variants.find(variant => {
        return variant.code === item.code
      })
    }))
  }

  removeItem(code) {
    this._handleSetItems(this.items.filter(item => {
      return item.code !== code
    }))
  }

  updateItem(code, increment) {
    this._handleSetItems(this.items.map(item => ({
      ...item,
      quantity: item.quantity + increment
    })).filter(item => {
      return item.quantity > 0
    }))
  }

  _handleInit() {
    const iframe = document.createElement('iframe')
    iframe.src = `${process.env.WEB_HOST}/stores/stores/${this.code}/cart`
    iframe.frameBorder = 0
    iframe.style.width = 0
    iframe.style.height = 0
    document.body.appendChild(iframe)
    this.pasteur = new Pasteur({
      window,
      target: iframe.contentWindow,
      name: 'cart',
      targetName: 'cartStore'
    })
    this.pasteur.on('ready', this._handleFetchItems)
  }

  _handleFetchItems() {
    this.pasteur.send('get', null, (cart) => {
      this._handleSetItems(cart ? cart.items : [])
    })
  }

  _handleSetItems(items) {
    this.pasteur.send('set', {
      items
    }, (cart) => {
      this.items = cart.items
      this.emit('change')
    })
  }

}

export default Cart
