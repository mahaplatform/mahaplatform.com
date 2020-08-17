import { Button, Image } from 'maha-client'
import PropTypes from 'prop-types'
import Pasteur from 'pasteur'
import numeral from 'numeral'
import React from 'react'
import _ from 'lodash'

class Cart extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    cart: PropTypes.object,
    items: PropTypes.array,
    products: PropTypes.array,
    status: PropTypes.string,
    Store: PropTypes.object,
    subtotal: PropTypes.number,
    tax: PropTypes.number,
    total: PropTypes.number,
    variants: PropTypes.array,
    onFetchProducts: PropTypes.func,
    onGetCart: PropTypes.func,
    onSetCart: PropTypes.func
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleCheckout = this._handleCheckout.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleClose = this._handleClose.bind(this)
  _handleRemove = this._handleRemove.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { items, status, subtotal, tax, total } = this.props
    if(status !== 'success') return null
    return (
      <div className="maha-cart">
        <div className="maha-cart-header">
          <div className="maha-cart-header-icon" onClick={ this._handleClose }>
            X
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
                <td>Qty</td>
                <td>Price</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              { items.map((item, index) => (
                <tr key={`product_${index}`}>
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
                          { item.title }
                        </div>
                        { item.options.length > 0 &&
                          <div className="maha-cart-product-options">
                            { item.options.map(option => {
                              return `${option.option}: ${option.value}`
                            }).join(', ')}
                          </div>
                        }
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="maha-cart-quantity">
                      <div className="maha-cart-quantity-control" onClick={ this._handleUpdate.bind(this, item.code, -1) }>-</div>
                      <div className="maha-cart-quantity-value">{ item.quantity }</div>
                      <div className="maha-cart-quantity-control" onClick={ this._handleUpdate.bind(this, item.code, 1) }>+</div>
                    </div>
                  </td>
                  <td>{ numeral(item.price).format('0.00') }</td>
                  <td>{ numeral(item.quantity * item.price).format('0.00') }</td>
                </tr>
              )) }
              { items.length === 0 &&
                <tr>
                  <td colSpan="5">The cart is empty</td>
                </tr>
              }
            </tbody>
            { items.length > 0 &&
              <tfoot>
                { tax > 0 &&
                  <tr>
                    <td colSpan="4">Subtotal</td>
                    <td>{ numeral(subtotal).format('0.00') }</td>
                  </tr>
                }
                { tax > 0 &&
                  <tr>
                    <td colSpan="4">Tax</td>
                    <td>{ numeral(tax).format('0.00') }</td>
                  </tr>
                }
                <tr>
                  <td colSpan="4">Total</td>
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
    const { Store } = this.props
    this.props.onFetchProducts(Store.code)
    this.props.onGetCart()
    this.pasteur = new Pasteur({
      window,
      target: window.parent,
      name: 'cartStore',
      targetName: 'cart'
    })
    this.pasteur.on('add', this._handleAdd)
    this.pasteur.on('clear', this._handleClear)
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

  _handleAdd(code) {
    const { items, variants } = this.props
    const variant = variants.find(variant => {
      return variant.code === code
    })
    if(!variant) throw new Error('unable to find variant')
    this.context.network.request({
      method: 'get',
      endpoint: `/api/stores/stores/maha/products/${code}/check`,
      onSuccess: () => {
        console.log('success!')
        // throw new Error('out of stock')
        const exists = items.find(item => {
          return item.code === code
        }) !== undefined
        this.props.onSetCart({
          items: [
            ...items.map(item => ({
              ...item,
              quantity: item.quantity + (item.code === code ? 1 : 0)
            })),
            ...!exists ? [{
              code: variant.code,
              price: variant.fixed_price,
              quantity: 1
            }] : []
          ]
        })
      }
    })

  }

  _handleChange() {
    const { cart } = this.props
    this.setState({
      items: cart.getItems()
    })
  }

  _handleCheckout() {
    this.pasteur.send('checkout')
  }

  _handleClear() {
    this.props.onSetCart({
      items: []
    })
  }

  _handleClose() {
    this.pasteur.send('close')
  }

  _handleRemove(code) {
    const { cart } = this.props
    this.props.onSetCart({
      items: cart.items.filter(item => {
        return item.code !== code
      })
    })
  }

  _handleUpdate(code, increment) {
    const { cart } = this.props
    this.props.onSetCart({
      items: cart.items.map(item => ({
        ...item,
        quantity: item.quantity + (item.code === code ? increment : 0)
      })).filter(item => {
        return item.quantity > 0
      })
    })
  }
}

export default Cart
