import VariantToken from '@apps/stores/admin/tokens/variant'
import PropTypes from 'prop-types'
import React from 'react'

class Items extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    store: PropTypes.object,
    order: PropTypes.object,
    items: PropTypes.array
  }

  render() {
    const { items } = this.props
    return (
      <div className="maha-table">
        <table>
          <thead>
            <tr>
              <td>Product</td>
              <td />
            </tr>
          </thead>
          <tbody>
            { items.map((item, index) => (
              <tr key={`item_${index}`}>
                <td className="unpadded">
                  <VariantToken product={ item.variant.product } variant={ item.variant }/>
                </td>
                <td className="proceed">
                  <i className="fa fa-chevron-right" />
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
