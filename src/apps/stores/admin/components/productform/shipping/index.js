import PropTypes from 'prop-types'
import { Form } from '@admin'
import Variants from './variants'
import React from 'react'
import _ from 'lodash'

class Pricing extends React.Component {

  static propTypes = {
    formdata: PropTypes.object,
    onBack: PropTypes.func,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onNext: PropTypes.func,
    onSave: PropTypes.func
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
        { label: 'Save', color: 'red', handler: this._handleSubmit }
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
    const { formdata } = this.props
    if(!formdata.has_variants) return []
    return [
      { name: 'shipping_type', type: 'radiogroup', deselectable: false, required: true, options: [
        { value: 'shared', text: 'Use the same shipping strategy for each variant' },
        { value: 'unique', text: 'Use different shipping strategy for each variant' }
      ], defaultValue: 'shared' }
    ]
  }

  _getStrategy() {
    const { formdata } = this.props
    const { data } = this.state
    if(!formdata.has_variants || data.shipping_type === 'shared') return [
      { label: 'Shipping', type: 'segment', fields: [
        { name: 'shipping_strategy', type: 'radiogroup', deselectable: false, required: true, options: [
          { value: 'free', text: 'There is no shipping fee' },
          { value: 'flat', text: 'There is a flat shipping fee' }
        ], defaultValue: 'free' },
        ...this._getFee()
      ]}
    ]
    return [
      { label: 'Shipping', name: 'variants', type: Variants, product: formdata }
    ]
  }

  _getFee() {
    const { data } = this.state
    if(data.shipping_strategy === 'free') return []
    return [
      { label: 'Fee', name: 'shipping_fee', type: 'moneyfield' }
    ]
  }

  _getVariants() {
    const { formdata } = this.props
    const { data } = this.state
    const { shipping_type, shipping_strategy, shipping_fee, variants } = data
    return formdata.variants.map(variant => ({
      ...variant,
      ...shipping_type === 'unique' ? _.find(variants, { code: variant.code }) : {
        shipping_strategy,
        shipping_fee: shipping_strategy === 'flat' ? shipping_fee : null
      }
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
    this.props.onSave({
      variants: this._getVariants()
    })
  }

}

export default Pricing
