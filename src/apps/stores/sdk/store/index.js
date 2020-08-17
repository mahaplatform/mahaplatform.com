import CheckoutButton from './components/checkout_button'
import CartButton from './components/cart_button'
import AddButton from './components/add_button'
import Emitter from './emitter'
import Catalog from './catalog'
import Checkout from './checkout'
import Cart from './cart'

class Store extends Emitter {

  catalog = null
  cart = null
  checkout = null
  config = null
  components = []

  constructor(config) {
    super()
    this.config = config
    this.checkout = new Checkout({
      code: config.code
    })
    this._handleInit()
  }

  createComponent(type, config) {
    const Component = this._getCreator(type)
    const element = document.querySelectorAll(`[data-id="${config.code}"]`)[0]
    const component = new Component(element, this.cart, this.checkout, config)
    this.components.push(component)
  }

  getCart() {
    return this.cart
  }

  init() {
    this._handleFetch()
  }

  _getCreator(type) {
    if(type === 'checkoutButton') return CheckoutButton
    if(type === 'cartButton') return CartButton
    if(type === 'addButton') return AddButton
  }

  _handleFetch() {
    this.catalog = new Catalog([
      { id: 1, code: 'abc', title: 'Socks', description: 'blah blah blah blah blah blah', variants: [
        { id: 1, code: 'abc', image: 'https://assets.bombas.com/image/fetch/c_crop,h_3040,w_3040/b_rgb:F5F5F5,c_scale,w_1068/f_auto,q_auto/https://cdn.shopify.com/s/files/1/1119/5850/products/big-bird-layflat-product-transparent_7833310c-93c4-47cb-8c61-eca6c16feb84.png%3Fv%3D1590521851', fixed_price: 15.00, tax_rate: 0.00, options: [ { option: 'Color', value: 'red'}, { option: 'Size', value: 'medium' } ] },
        { id: 1, code: 'def', image: 'https://assets.bombas.com/image/fetch/c_crop,h_3040,w_3040/b_rgb:F5F5F5,c_scale,w_1068/f_auto,q_auto/https://cdn.shopify.com/s/files/1/1119/5850/products/big-bird-layflat-product-transparent_7833310c-93c4-47cb-8c61-eca6c16feb84.png%3Fv%3D1590521851', fixed_price: 15.00, tax_rate: 0.00, options: [ { option: 'Color', value: 'orange'}, { option: 'Size', value: 'medium' } ] }
      ] },
      { id: 1, code: 'def', title: 'Shoes', description: 'blah blah blah blah blah blah', variants: [
        { id: 1, code: 'ghi', image: 'https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw679b3e97/images/a_107_white/M9621_A_107X1_white.jpg?sw=71', fixed_price: 25.00, tax_rate: 0.00, options: [ { option: 'Color', value: 'red'}, { option: 'Size', value: '11' } ] },
        { id: 1, code: 'jkl', image: 'https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw679b3e97/images/a_107_white/M9621_A_107X1_white.jpg?sw=71', fixed_price: 25.00, tax_rate: 0.00, options: [ { option: 'Color', value: 'red'}, { option: 'Size', value: '12' } ] }
      ] },
      { id: 1, code: 'ghi', title: 'Belt', description: 'blah blah blah blah blah blah', variants: [
        { id: 1, code: 'mno', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/35c0b91b-4c60-47bf-bdfe-db3547c156fe/flat-edge-acu-fit-mens-golf-belt-vZwNH6.jpg', fixed_price: 35.00, tax_rate: 0.00, options: [ { option: 'Color', value: 'black'} ] },
        { id: 1, code: 'pqr', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/35c0b91b-4c60-47bf-bdfe-db3547c156fe/flat-edge-acu-fit-mens-golf-belt-vZwNH6.jpg', fixed_price: 35.00, tax_rate: 0.00, options: [ { option: 'Color', value: 'brown'} ] }
      ] },
      { id: 1, code: 'jkl', title: 'Suspenders', description: 'blah blah blah blah blah blah', variants: [
        { id: 1, code: 'stu', image: 'https://www.duluthtrading.com/dw/image/v2/BBNM_PRD/on/demandware.static/-/Sites-dtc-master-catalog/default/dwfcc70fa6/images/large/21125_BLK.jpg?sw=600&sh=600&sm=fit', fixed_price: 45.00, tax_rate: 0.00, options: [] }
      ] }
    ])
    this.cart = new Cart({
      code: this.config.code,
      checkout: this.checkout,
      catalog: this.catalog
    })
    this.emit('ready')
  }

  _handleInit() {
    const stylesheet = document.createElement('link')
    stylesheet.rel = 'stylesheet'
    stylesheet.type = 'text/css'
    stylesheet.href = `${process.env.WEB_HOST}/css/store.css`
    document.head.appendChild(stylesheet)
  }

}

export default Store
