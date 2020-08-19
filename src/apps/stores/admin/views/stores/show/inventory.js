import PropTypes from 'prop-types'
import React from 'react'

class Inventory extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    products: PropTypes.array,
    store: PropTypes.object
  }

  render() {
    const { products } = this.props
    return (
      <div className="maha-table">
        <table>
          <thead>
            <tr>
              <td>Title</td>
              <td className="collapsing">Inventory</td>
            </tr>
          </thead>
          <tbody>
            { products.map((product, index) => [
              product.variants.map((variant, vindex) => (
                <tr key={`product_${index}_variant_${vindex}`}>
                  <td>
                    { product.title }<br />
                    { variant.options.map(option => {
                      return `${option.option}: ${option.value}`
                    }).join(', ') }
                  </td>
                  <td className="right aligned">
                    { variant.inventory_quantity || 'unlimited' }
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
    )
  }

}

export default Inventory
