import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import Variants from './variants'
import React from 'react'
import _ from 'lodash'

class Inventory extends React.Component {

  static propTypes = {
    product: PropTypes.object,
    onBack: PropTypes.func,
    onNext: PropTypes.func
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
              { value: 'unlimited', text: 'Do not manage inventory' }
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
    if(data.inventory_policy === 'unlimited') return []
    if(product.has_variants) {
      return [
        { label: 'Inventory', name: 'variants', type: Variants, product }
      ]
    }
    return [
      { label: 'Inventory', name: 'inventory_quantity', type: 'numberfield', required: true, placeholder: 'Enter Quantity' }
    ]
  }

  _getVariants() {
    const { product } = this.props
    const { data } = this.state
    const { inventory_policy, inventory_quantity, variants } = data
    return product.variants.map(variant => ({
      ...variant,
      ...inventory_policy !== 'unlimited' ? { inventory_quantity } : {},
      ...product.has_variants ? _.find(variants, { code: variant.code }) : {},
      inventory_policy
    }))
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
    this.props.onNext({
      variants: this._getVariants()
    })
  }

}

export default Inventory
