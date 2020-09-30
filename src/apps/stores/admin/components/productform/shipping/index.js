import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import Variants from './variants'
import React from 'react'

class Pricing extends React.Component {

  static contextTypes = {
    form: PropTypes.object
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
            ...this._getType(),
            ...this._getStrategy()
          ]
        }
      ]
    }
  }

  _getType() {
    const { product } = this.props
    if(!product.has_variants) return []
    return [
      { name: 'shipping_type', type: 'radiogroup', deselectable: false, required: true, options: [
        { value: 'shared', text: 'Use the same shipping strategy for each variant' },
        { value: 'unique', text: 'Use different shipping strategy for each variant' }
      ], defaultValue: 'shared' }
    ]
  }

  _getStrategy() {
    const { product } = this.props
    const { data } = this.state
    if(!product.has_variants || data.shipping_type === 'shared') return [
      { label: 'Shipping', type: 'segment', fields: [
        { name: 'shipping_strategy', type: 'radiogroup', deselectable: false, required: true, options: [
          { value: 'free', text: 'There is no shipping fee' },
          { value: 'flat', text: 'There is a flat shipping fee' }
        ], defaultValue: 'free' },
        ...this._getFee()
      ]}
    ]
    return [
      { label: 'Shipping', name: 'variants', type: Variants, product }
    ]
  }

  _getFee() {
    const { data } = this.state
    if(data.shipping_strategy === 'free') return []
    return [
      { label: 'Fee', name: 'shipping_fee', type: 'moneyfield' }
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

export default Pricing
