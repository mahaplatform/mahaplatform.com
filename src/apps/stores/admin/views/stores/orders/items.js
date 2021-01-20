import VariantToken from '@apps/stores/admin/tokens/variant'
import PropTypes from 'prop-types'
import React from 'react'

class Items extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    store: PropTypes.object,
    order: PropTypes.object
  }

  render() {
    const { order } = this.props
    return (
      <div className="maha-table">
        <table>
          <thead>
            <tr>
              <td>Product</td>
            </tr>
          </thead>
          <tbody>
            { order.items.map((item, index) => (
              <tr key={`item_${index}`}>
                <td className="unpadded">
                  <VariantToken product={ item.variant.product } variant={ item.variant }/>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    )
  }

}

export default Items
