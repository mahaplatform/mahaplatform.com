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
    const { product } = this.state
    if(product.inventory_policy === 'unmanaged') return []
    return [
      { label: 'Inventory', name: 'variants', type: InventoryField, product }
    ]
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange(product) {
    this.setState({
      product: {
        ...this.state.product,
        ...product
      }
    })
  }

  _handleSubmit() {
    this.form.submit()
  }

  _handleSuccess(product) {
    this.props.onDone(product)
  }

}

export default Inventory
