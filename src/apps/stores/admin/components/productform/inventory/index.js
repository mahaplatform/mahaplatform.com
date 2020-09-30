import InventoryField from './inventoryfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Inventory extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    product: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  form = null

  state = {
    data: {}
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      reference: node => this.form = node,
      showHeader: false,
      buttons: [
        { label: 'Prev', color: 'red', handler: this._handleBack },
        { label: 'Next', color: 'red', handler: this._handleSubmit }
      ],
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'inventory_policy', type: 'radiogroup', deselectable: false, required: true, options: [
              { value: 'deny', text: 'Stop selling when inventory reaches 0' },
              { value: 'continue', text: 'Allow sales to continue into negative inventory levels' },
              { value: 'unmanaged', text: 'Do not manage inventory' }
            ], defaultValue: 'deny' },
            ...this._getInventory()

          ]
        }
      ]
    }
  }

  _getInventory() {
    const { product } = this.props
    const { data } = this.state
    if(data.inventory_policy === 'unmanaged') return []
    if(product.has_variants) {
      return [
        { label: 'Inventory', name: 'variants', type: InventoryField, product }
      ]
    }
    return [
      { label: 'Inventory', name: 'inventory_quantity', type: 'numberfield' }
    ]
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange(data) {
    this.setState({ data })
  }

  _handleSubmit() {
    this.form.submit()
  }

  _handleSuccess(data) {
    this.props.onDone(data)
  }

}

export default Inventory
