import localforage from 'localforage'

class Cart {

  db = null
  listeners = []
  products = []
  store = null

  constructor(store) {
    this.db = localforage.createInstance({
      name: 'store',
      storeName: store.code
    })
    this.store = store
    this.loadProducts()
  }

  on(event, handler) {
    this.listeners.push({
      event,
      handler
    })
  }

  addProduct(code) {
    const product = this.store.products.find(product => {
      return product.code === code
    })
    if(!product) throw new Error('unable to find product')
    const exists = this.products.find(item => {
      return item.code === code
    }) !== undefined
    this.setProducts([
      ...this.products.map(item => ({
        ...item,
        quantity: item.quantity + (item.code === code ? 1 : 0)
      })),
      ...!exists ? [{
        code: product.code,
        price: product.fixed_price,
        quantity: 1
      }] : []
    ])
  }

  getCount() {
    return this.products.reduce((count, product) => {
      return count + product.quantity
    }, 0)
  }

  getProducts() {
    return this.products.map(item => {
      const product = this.store.products.find(product => {
        return product.code === item.code
      })
      return {
        ...product,
        ...item
      }
    })
  }

  loadProducts() {
    this.db.getItem('cart', (err, cart) => {
      this.setProducts(cart ? cart.products : [])
    })
  }

  removeProduct(code) {
    this.setProducts(this.products.filter(product => {
      return product.code !== code
    }))
  }

  setProducts(products) {
    this.db.setItem('cart', {
      products
    }, (err, cart) => {
      this.products = cart.products
      this._emit('change')
    })
  }

  updateProduct(code, increment) {
    this.setProducts(this.products.map(product => ({
      ...product,
      quantity: product.quantity + increment
    })).filter(product => {
      return product.quantity > 0
    }))
  }

  _emit(event) {
    this.listeners.filter(listener => {
      return listener.event === event
    }).map(listener => {
      listener.handler()
    })
  }

}

export default Cart
