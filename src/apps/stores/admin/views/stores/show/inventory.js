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
    const variants = this._getVariants()
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
              { variants.map((variant, index) => (
                <tr key={`variant_${index}`}>
                  <td className="unpadded">
                    <VariantToken product={ variant.product } variant={ variant }/>
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
              )) }
              { variants.length === 0 &&
                <tr>
                  <td colSpan="4" className="center">
                    You are not tracking inventory for any product varaints
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  _getVariants() {
    const { products } = this.props
    return products.reduce((variants, product) => [
      ...variants,
      ...product.variants.filter(variant => {
        return variant.inventory_policy !== 'unlimited'
      }).map(variant => ({
        ...variant,
        product
      }))
    ], [])
  }

}

export default Inventory
