import CheckoutButton from './components/checkout_button'
import CartButton from './components/cart_button'
import AddButton from './components/add_button'
import Cart from './models/cart'

class Store {

  cart = null
  components = []
  products = [
    { id: 1, code: 'abc', title: 'Socks', image: 'https://assets.bombas.com/image/fetch/c_crop,h_3040,w_3040/b_rgb:F5F5F5,c_scale,w_1068/f_auto,q_auto/https://cdn.shopify.com/s/files/1/1119/5850/products/big-bird-layflat-product-transparent_7833310c-93c4-47cb-8c61-eca6c16feb84.png%3Fv%3D1590521851', fixed_price: 15.00, tax_rate: 0.00, options: [ { option: 'Color', value: 'orange'}, { option: 'Size', value: 'medium' } ] },
    { id: 1, code: 'def', title: 'Shoes', image: 'https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw679b3e97/images/a_107_white/M9621_A_107X1_white.jpg?sw=71', fixed_price: 25.00, tax_rate: 0.00, options: [ { option: 'Color', value: 'red'}, { option: 'Size', value: '12.5' } ] },
    { id: 1, code: 'ghi', title: 'Belt', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/35c0b91b-4c60-47bf-bdfe-db3547c156fe/flat-edge-acu-fit-mens-golf-belt-vZwNH6.jpg', fixed_price: 35.00, tax_rate: 0.00, options: [ { option: 'Color', value: 'black'} ] },
    { id: 1, code: 'jkl', title: 'Suspenders', image: 'https://www.duluthtrading.com/dw/image/v2/BBNM_PRD/on/demandware.static/-/Sites-dtc-master-catalog/default/dwfcc70fa6/images/large/21125_BLK.jpg?sw=600&sh=600&sm=fit', fixed_price: 45.00, tax_rate: 0.00, options: [] }
  ]

  constructor(config) {
    this.cart = new Cart({
      code: config.code,
      products: this.products
    })
    document.addEventListener('DOMContentLoaded', this._handleInit, false)
  }

  createComponent(type, config) {
    const Component = this._getCreator(type)
    const element = document.querySelectorAll(`[data-id="${config.code}"]`)[0]
    const component = new Component(element, this.cart, config)
    this.components.push(component)
  }

  getCart() {
    return this.cart
  }

  getProducts() {
    return this.products
  }

  _getCreator(type) {
    if(type === 'checkoutButton') return CheckoutButton
    if(type === 'cartButton') return CartButton
    if(type === 'addButton') return AddButton
  }

}

export default Store
