import PropTypes from 'prop-types'
import React from 'react'

class Inventory extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    products: PropTypes.array
  }

  render() {
    const { products } = this.props
    return (
      <div className="stores-inventoryfield">
        <div className="maha-table">
          <table>
            <thead>
              <tr>
                <td>Title</td>
                <td className="collapsing">Policy</td>
                <td className="collapsing">Quantity</td>
              </tr>
            </thead>
            <tbody>
              { products.map((product, index) => [
                product.variants.map((variant, vindex) => (
                  <tr key={`product_${index}_variant_${vindex}`}>
                    <td>
                      { product.title } { variant.options.length > 0 &&
                        <span>({ variant.options.map(option => {
                          return `${option.option}: ${option.value}`
                        }).join(', ') })</span>
                      }
                    </td>
                    <td>{ variant.inventory_policy }</td>
                    <td className="right aligned">
                      { variant.inventory_quantity }
                    </td>
                  </tr>
                ))
              ]) }
              { products.length === 0 &&
                <tr>
                  <td colSpan="2" className="center">
                    This store doesnt yet have any products
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}

export default Inventory
