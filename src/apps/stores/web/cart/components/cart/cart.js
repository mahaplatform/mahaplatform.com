import { Button, Image, Loader } from '@client'
import PropTypes from 'prop-types'
import Pasteur from 'pasteur'
import numeral from 'numeral'
import React from 'react'
import _ from 'lodash'

class Cart extends React.Component {

  static contextTypes = {
    analytics: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    cart: PropTypes.object,
    code: PropTypes.string,
    items: PropTypes.array,
    products: PropTypes.array,
    shipping: PropTypes.number,
    Store: PropTypes.object,
    status: PropTypes.string,
    subtotal: PropTypes.number,
    tax: PropTypes.number,
    total: PropTypes.number,
    variants: PropTypes.array,
    onFetch: PropTypes.func,
    onRemoveCart: PropTypes.func,
    onSave: PropTypes.func
  }

  pasteur = null

  _handleAdd = this._handleAdd.bind(this)
  _handleCheckout = this._handleCheckout.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleClose = this._handleClose.bind(this)
  _handleDiscard = this._handleDiscard.bind(this)
  _handleRemove = this._handleRemove.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { items, shipping, status, subtotal, tax, total } = this.props
    if(_.isEqual(['pending', 'loading'], status)) return <Loader />
    return (
      <div className="maha-cart">
        <div className="maha-cart-header">
          <div className="maha-cart-header-icon" onClick={ this._handleClose }>
            <i className="fa fa-times" />
          </div>
          <div className="maha-cart-header-title">
            Cart
          </div>
        </div>
        <div className="maha-cart-body">
          <table>
            <thead>
              <tr>
                <td />
                <td>Product</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              { items.map((item, index) => (
                <tr key={`product_${item.id}`}>
                  <td onClick={ this._handleRemove.bind(this, item.code) }>
                    <span>x</span>
                  </td>
                  <td>
                    <div className="maha-cart-product">
                      <div className="maha-cart-product-image">
                        { item.thumbnail ?
                          <Image { ...this._getThumbnail(item) } /> :
                          <div className="maha-cart-product-icon">
                            <i className="fa fa-shopping-bag" />
                          </div>
                        }
                      </div>
                      <div className="maha-cart-product-details">
                        <div className="maha-cart-product-name">
                          { item.title } x { item.quantity }
                        </div>
                        { item.options.length > 0 &&
                          <div className="maha-cart-product-options">
                            { item.options.map(option => {
                              return `${option.option}: ${option.value}`
                            }).join(', ') }
                          </div>
                        }
                      </div>
                    </div>
                  </td>
                  <td>{ numeral(item.quantity * item.price).format('0.00') }</td>
                </tr>
              )) }
              { shipping > 0 &&
                <tr>
                  <td colSpan="2">Shipping / Handling</td>
                  <td>{ numeral(shipping).format('0.00') }</td>
                </tr>
              }
              { items.length === 0 &&
                <tr>
                  <td colSpan="3">The cart is empty</td>
                </tr>
              }
            </tbody>
            { items.length > 0 &&
              <tfoot>
                { tax > 0 &&
                  <tr>
                    <th colSpan="2">Subtotal</th>
                    <td>{ numeral(subtotal).format('0.00') }</td>
                  </tr>
                }
                { tax > 0 &&
                  <tr>
                    <td colSpan="2">Tax</td>
                    <td>{ numeral(tax).format('0.00') }</td>
                  </tr>
                }
                <tr>
                  <th colSpan="2">Total</th>
                  <td>{ numeral(total).format('0.00') }</td>
                </tr>
              </tfoot>
            }
          </table>
          { items.length > 0 &&
            <div className="link" onClick={ this._handleClear }>
              Empty cart
            </div>
          }
        </div>
        <div className="maha-cart-footer">
          <Button { ...this._getCheckout() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { code, Store } = this.props
    this.props.onFetch(Store.code, code)
    this.pasteur = new Pasteur({
      window,
      target: window.parent,
      name: 'cart',
      targetName: 'store'
    })
    this.pasteur.on('add', this._handleAdd)
    this.pasteur.on('clear', this._handleClear)
    this.pasteur.on('discard', this._handleDiscard)
    this.pasteur.on('remove', this._handleRemove)
    this.pasteur.on('update', this._handleUpdate)
    this.pasteur.send('ready')
  }

  componentDidUpdate(prevProps) {
    const { cart } = this.props
    if(!_.isEqual(cart, prevProps.cart)) {
      this.pasteur.send('change', cart)
    }
  }

  _getCheckout() {
    const { items } = this.props
    return {
      disabled: items.length === 0,
      color: 'red',
      label: 'Checkout',
      handler: items.length > 0 ? this._handleCheckout : null
    }
  }

  _getThumbnail(item) {
    return {
      src: item.thumbnail ? item.thumbnail.path : null,
      transforms: { fit: 'cover', w: 30, h: 30 }
    }
  }

  async _handleCheck(variantCode) {
    const { Store } = this.props
    return await new Promise((resolve, reject) => {
      this.context.network.request({
        method: 'get',
        endpoint: `/api/stores/stores/${Store.code}/products/${variantCode}/check`,
        onFailure: ({ error }) => reject(error),
        onSuccess: ({ data }) => resolve(data)
      })
    })
  }

  async _handleAdd({ code, quantity }) {
    const { cart, Store, items, variants } = this.props
    const variant = variants.find(variant => {
      return variant.code === code
    })
    if(!variant) {
      throw new Error('unable to find variant')
    }
    const item = items.find(item => {
      return item.code === code
    })
    const exists = item !== undefined
    if(variant.max_per_order && exists && item.quantity >= variant.max_per_order) {
      throw new Error(`you are only allowed ${variant.max_per_order} per order`)
    }
    const available = await this._handleCheck(code)
    if(!available) throw new Error('there are no more items left in stock')
    this.props.onSave(Store.code, this.props.code, {
      items: [
        ...cart.items.map(item => ({
          ...item,
          quantity: item.quantity + (item.code === code ? quantity : 0)
        })),
        ...!exists ? [{
          code: variant.code,
          price: variant.fixed_price,
          quantity
        }] : []
      ]
    })
    this.context.analytics.trackAddToCart(variant.code, variant.title, variant.categories, variant.fixed_price, quantity, 'USD')
  }

  _handleCheckout() {
    this.pasteur.send('checkout')
  }

  _handleClear() {
    const { code, Store } = this.props
    this.props.onSave(Store.code, code, {
      items: []
    })
  }

  _handleDiscard() {
    this.props.onRemoveCart()
  }

  _handleClose() {
    this.pasteur.send('close')
  }

  _handleRemove(variantCode) {
    const { cart, code, Store, variants } = this.props
    const variant = variants.find(variant => {
      return variant.code === variantCode
    })
    const item = cart.items.find(item => {
      return item.code === variantCode
    })
    this.props.onSave(Store.code, code, {
      items: cart.items.filter(item => {
        return item.code !== variantCode
      })
    })
    this.context.analytics.trackRemoveFromCart(variant.code, variant.title, variant.categories, item.price, item.quantity, 'USD')
  }

  async _handleUpdate(variantCode, increment) {
    const { cart, code, Store } = this.props
    if(increment > 0) return await this._handleAdd(variantCode)
    this.props.onSave(Store.code, code, {
      items: cart.items.map(item => ({
        ...item,
        quantity: item.quantity - (item.code === variantCode ? 1 : 0)
      })).filter(item => {
        return item.quantity > 0
      })
    })
  }
}

export default Cart
