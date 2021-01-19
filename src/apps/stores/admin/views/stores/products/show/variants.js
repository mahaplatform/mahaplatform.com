import VariantToken from '@apps/stores/admin/tokens/variant'
import PropTypes from 'prop-types'
import { Button } from '@admin'
import React from 'react'
import Edit from './edit'

class Variants extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    product: PropTypes.object,
    store: PropTypes.object
  }

  render() {
    const { product } = this.props
    return (
      <div className="stores-inventoryfield">
        <div className="maha-table">
          <table>
            <thead>
              <tr>
                <td>Title</td>
                <td />
              </tr>
            </thead>
            <tbody>
              { product.variants.map((variant, index) => (
                <tr key={`variant_${index}`}>
                  <td className="unpadded">
                    <VariantToken product={ product } variant={ variant }/>
                  </td>
                  <td className="action">
                    <Button { ...this._getEdit(variant) } />
                  </td>
                </tr>
              )) }
              { product.variants.length === 0 &&
                <tr>
                  <td colSpan="2" className="center">
                    This product doesnt have any variants
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  _getEdit(variant) {
    const { product, store } = this.props
    return {
      icon: 'ellipsis-v',
      className: '',
      tasks: [
        { label: 'Edit Variant', modal: <Edit store={ store } product={ product } variant={ variant } /> }
      ]
    }
  }

}

export default Variants
