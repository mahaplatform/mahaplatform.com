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
              <td colSpan="2">Product</td>
              <td>Qty</td>
              <td>Price</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody>
            { items.map((item, index) => (
              <tr key={`product_${index}`}>
                <td>
                  <img src={ item.image } width="37" />
                </td>
                <td>
                  <strong>{ item.title }</strong>
                  { item.options.length > 0 &&
                    <div>
                      { item.options.map(option => {
                        return `${option.option}: ${option.value}`
                      }).join(', ')}
                    </div>
                  }
                </td>
                <td>{ item.quantity }</td>
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
        </table>
      </div>
    )
  }

}

export default Summary
