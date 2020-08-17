import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class Summary extends React.Component {

  static propTypes = {
    items: PropTypes.array,
    subtotal: PropTypes.number,
    tax: PropTypes.number,
    total: PropTypes.number
  }

  render() {
    const { items, subtotal, tax, total } = this.props
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
                      <img src={ item.image } />
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
            { items.length === 0 &&
              <tr>
                <td colSpan="4">The cart is empty</td>
              </tr>
            }
          </tbody>
          <tfoot>
            { tax > 0 &&
              <tr>
                <td colSpan="3">Subtotal</td>
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
              <td colSpan="3">Total</td>
              <td>{ numeral(total).format('0.00') }</td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }

}

export default Summary
