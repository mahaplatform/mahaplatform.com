import InventoryField from '../../components/inventoryfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Inventory extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    products: PropTypes.array,
    store_id: PropTypes.number
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { products, store_id } = this.props
    return {
      title: 'Inventory',
      method: 'patch',
      action: `/api/admin/stores/stores/${store_id}/inventory`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'inventory', type: InventoryField, products }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.modal.close()
  }

}

export default Inventory
