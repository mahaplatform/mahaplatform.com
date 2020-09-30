import OptionsField from '../../../components/optionsfield'
import VariantsField from './variantsfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Variants extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

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
            { name: 'has_variants', type: 'radiogroup', deselectable: false, options: [
              { value: false, text: 'There is only one variant of this product' },
              { value: true, text: 'There are multiple variants of this product with different options (color, size, etc)' }
            ], defaultValue: false },
            ...this._getOptions(),
            ...this._getVariantField()
          ]
        }
      ]
    }
  }

  _getOptions()  {
    const { data } = this.state
    if(!data.has_variants) return []
    return [
      { label: 'Options', name: 'options', type: OptionsField, required: true }
    ]
  }

  _getVariantField() {
    const { product } = this.props
    const { data } = this.state
    if(!data.has_variants || !data.options) return []
    return [
      { label: 'Variants', name: 'variants', type: VariantsField, product: {
        ...product,
        options: data.options
      } }
    ]
  }

  _getVariants() {
    const { product } = this.props
    const { data } = this.state
    if(!data.has_variants) {
      data.variants = [{
        code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
        title: product.title,
        options: [],
        is_active: true
      }]
    }
    return data.variants.map(variant => ({
      photos: [],
      price_type: null,
      project_id: null,
      revenue_type_id: null,
      fixed_price: null,
      low_price: null,
      high_price: null,
      overage_strategy: null,
      donation_revenue_type_id: null,
      tax_rate: null,
      is_tax_deductible: null,
      inventory_policy: null,
      inventory_quantity: null,
      shipping_strategy: null,
      shipping_fee: null,
      ...variant
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
      ...data,
      variants: this._getVariants()
    })
  }

}

export default Variants
