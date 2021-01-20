import VariantToken from '@apps/stores/admin/tokens/variant'
import PropTypes from 'prop-types'
import { Button } from '@admin'
import React from 'react'
import Edit from './edit'

class Variants extends React.Component {

  static contextTypes = {
    flash: PropTypes.object,
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
                <td />
              </tr>
            </thead>
            <tbody>
              { product.variants.map((variant, index) => (
                <tr key={`variant_${index}`}>
                  <td className="unpadded">
                    <VariantToken product={ product } variant={ variant }/>
                  </td>
                  <td className="unpadded collapsing">
                    <span className={variant.is_active ? 'success' : 'error'}>
                      { variant.is_active ? 'ACTIVE' : 'DISABLED' }
                    </span>
                  </td>
                  <td className="action collapsing">
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
        { label: 'Edit Variant', modal: <Edit store={ store } product={ product } variant={ variant } /> },
        {
          label: 'Activate Variant',
          show: !variant.is_active,
          confirm: 'Are you sure you want to activate this variant?',
          request: {
            method: 'PATCH',
            endpoint: `/api/admin/stores/stores/${store.id}/products/${product.id}/variants/${variant.id}/activate`,
            body: { is_active: true },
            onFailure: () => this.context.flash.set('error', 'Unable to activate this variant'),
            onSuccess: () => this.context.flash.set('success', 'Successfully activated this variant')
          }
        }, {
          label: 'Deactivate Variant',
          show: variant.is_active,
          confirm: 'Are you sure you want to deactivate this variant?',
          request: {
            method: 'PATCH',
            endpoint: `/api/admin/stores/stores/${store.id}/products/${product.id}/variants/${variant.id}/activate`,
            body: { is_active: false },
            onFailure: () => this.context.flash.set('error', 'Unable to deactivate this variant'),
            onSuccess: () => this.context.flash.set('success', 'Successfully deactivated this variant')
          }
        }
      ]
    }
  }

}

export default Variants
