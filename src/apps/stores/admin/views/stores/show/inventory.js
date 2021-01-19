import VariantToken from '@apps/stores/admin/tokens/variant'
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
                <td className="collapsing" data-position="bottom center" data-inverted={ true } data-tooltip="Items in your warehouse">
                  In Stock
                </td>
                <td className="collapsing" data-position="bottom center" data-inverted={ true } data-tooltip="Items reserved in carts">
                  Reserved
                </td>
                <td className="collapsing" data-position="bottom center" data-inverted={ true } data-tooltip="Items ordered but not yet fulfilled">
                  Unfulfilled
                </td>
                <td className="collapsing" data-position="bottom center" data-inverted={ true } data-tooltip="Items available for sale">
                  On Hand
                </td>
              </tr>
            </thead>
            <tbody>
              { products.map((product, index) => [
                product.variants.map((variant, vindex) => (
                  <tr key={`product_${index}_variant_${vindex}`}>
                    <td className="unpadded">
                      <VariantToken product={ product } variant={ variant }/>
                    </td>
                    <td className="right aligned">
                      { variant.inventory_instock }
                    </td>
                    <td className="right aligned">
                      { variant.inventory_reserved }
                    </td>
                    <td className="right aligned">
                      { variant.inventory_unfulfilled }
                    </td>
                    <td className="right aligned">
                      { variant.inventory_onhand }
                    </td>
                  </tr>
                ))
              ]) }
              { products.length === 0 &&
                <tr>
                  <td colSpan="4" className="center">
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
