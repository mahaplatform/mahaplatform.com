import { Image } from '@client'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class Summary extends React.Component {

  static propTypes = {
    items: PropTypes.array,
    shipping: PropTypes.number,
    subtotal: PropTypes.number,
    tax: PropTypes.number,
    total: PropTypes.number
  }

  render() {
    const { items, shipping, subtotal, tax, total } = this.props
    return (
      <div className="maha-cart">
        <table>
          <thead>
            <tr>
              <td>Product</td>
              <td>Qty</td>
              <td>Price</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody>
            { items.map((item, index) => (
              <tr key={`product_${index}`}>
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
                <td>{ item.quantity }</td>
                <td>{ numeral(item.price).format('0.00') }</td>
                <td>{ numeral(item.quantity * item.price).format('0.00') }</td>
              </tr>
            )) }
            { shipping > 0 &&
              <tr>
                <td colSpan="3">Shipping / Handling</td>
                <td>{ numeral(shipping).format('0.00') }</td>
              </tr>
            }
            { items.length === 0 &&
              <tr>
                <td colSpan="4">The cart is empty</td>
              </tr>
            }
          </tbody>
          <tfoot>
            { tax > 0 &&
              <tr>
                <th colSpan="3">Subtotal</th>
                <td>{ numeral(subtotal).format('0.00') }</td>
              </tr>
            }
            { tax > 0 &&
              <tr>
                <td colSpan="3">Tax</td>
                <td>{ numeral(tax).format('0.00') }</td>
              </tr>
            }
            <tr>
              <th colSpan="3">Total</th>
              <td>{ numeral(total).format('0.00') }</td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }

  _getThumbnail(item) {
    return {
      src: item.thumbnail ? item.thumbnail.path : null,
      transforms: { fit: 'cover', w: 30, h: 30 }
    }
  }

}

export default Summary
