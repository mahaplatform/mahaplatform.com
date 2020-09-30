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
    product: {}
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    if(!this.state.product) return null
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    const { product } = this.props
    this.setState({ product })
  }

  _getForm() {
    const { product } = this.state
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
            this._getInventory(),
            { name: 'variants', type: InventoryField, product }
          ]
        }
      ]
    }
  }

  _getInventory() {
    const { product } = this.state
    const fields = []
    fields.push({ name: 'inventory_policy', type: 'radiogroup', deselectable: false, required: true, options: [
      { value: 'unmanaged', text: 'Do not manage inventory' },
      { value: 'deny', text: 'Stop selling when inventory reaches 0' },
      { value: 'continue', text: 'Allow sales to continue into negative inventory levels' }
    ], defaultValue: 'unmanaged' })
    if(!product.has_variants && product.inventory_policy !== 'unmanaged') {
      fields.push({ label: 'Quantity', name: 'inventory_quantity', type: 'numberfield', placeholder: 'Enter Starting Inventory', required: true, defaultValue: 0 })
    }
    return { label: 'Inventory', type: 'segment', required: true, fields }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange(product) {
    this.setState({ product })
  }

  _handleSubmit() {
    this.form.submit()
  }

  _handleSuccess(result) {
    this.props.onDone(result)
  }

}

export default Inventory
