import RevenueTypeToken from '../../../../../finance/admin/tokens/revenue_type'
import ProjectToken from '../../../../../finance/admin/tokens/project'
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
            ...this._getStrategy(),
            ...this._getPricing()
          ]
        }
      ]
    }
  }

  _getStrategy() {
    const { product } = this.props
    if(!product.has_variants) return []
    return [
      { name: 'pricing_strategy', type: 'radiogroup', deselectable: false, required: true, options: [
        { value: 'shared', text: 'Use the same pricing for each variant' },
        { value: 'unique', text: 'Use different pricing for each variant' }
      ], defaultValue: 'shared' }
    ]
  }

  _getPricing() {
    const { product } = this.props
    const { data } = this.state
    if(!product.has_variants || data.pricing_strategy === 'shared') {
      return [
        { label: 'Pricing', type: 'segment', required: true, fields: [
          { name: 'price_type', type: 'dropdown', options: [
            { value: 'fixed', text: 'Fixed Price' },
            { value: 'sliding_scale', text: 'Sliding Scale' },
            { value: 'free', text: 'Free'}
          ], required: true },
          ...this._getPriceType()
        ] }
      ]
    }
    return [
      { label: 'Pricing', name: 'variants', type: Variants, product }
    ]
  }

  _getPriceType() {
    const { data } = this.state
    if(data.price_type === 'fixed') {
      return [
        { type: 'fields', fields: [
          { label: 'Project', name: 'project_id', type: 'lookup', placeholder: 'Choose a Project', endpoint: '/api/admin/finance/memberships', value: 'id', text: 'title', required: true, format: ProjectToken },
          { label: 'Revenue Type', name: 'revenue_type_id', type: 'lookup', placeholder: 'Choose a Revenue Type', endpoint: '/api/admin/finance/revenue_types', filter: { id: { $in: [42,47] } }, value: 'id', text: 'title', required: true, format: RevenueTypeToken }
        ] },
        { label: 'Fixed Price', name: 'fixed_price', type: 'moneyfield', placeholder: 'Enter a fixed Price', required: true },
        { label: 'Tax Rate', name: 'tax_rate', type: 'numberfield', placeholder: 'Tax Rate', required: true, defaultValue: '0.000' },
        { label: 'Tax Deductible?', name: 'is_tax_deductible', type: 'checkbox', prompt: 'Is this product tax deductable?', defaultValue: false }
      ]
    }
    if(data.price_type === 'sliding_scale') {
      return [
        { type: 'fields', fields: [
          { label: 'Project', name: 'project_id', type: 'lookup', placeholder: 'Choose a Project', endpoint: '/api/admin/finance/memberships', value: 'id', text: 'title', required: true, format: ProjectToken },
          { label: 'Revenue Type', name: 'revenue_type_id', type: 'lookup', placeholder: 'Choose a Revenue Type', endpoint: '/api/admin/finance/revenue_types', filter: { id: { $in: [42,47] } }, value: 'id', text: 'title', required: true, format: RevenueTypeToken }
        ] },
        { type: 'fields', fields: [
          { label: 'Low Price', name: 'low_price', type: 'moneyfield', placeholder: 'Low Price', required: true },
          { label: 'High Price', name: 'high_price', type: 'moneyfield', placeholder: 'High Price', required: true }
        ] },
        { label: 'Overage Strategy', name: 'overage_strategy', type: 'dropdown', options: [
          { value: 'income', text: 'Treat any amount over the low price as additional income' },
          { value: 'donation', text: 'Treat any amount over the low price as a donation' }
        ], required: true, defaultValue: 'income' },
        ...this._getOverageStrategy(),
        { label: 'Tax Rate', name: 'tax_rate', type: 'numberfield', placeholder: 'Tax Rate', required: true, defaultValue: '0.000' },
        { label: 'Tax Deductible?', name: 'is_tax_deductible', type: 'checkbox', prompt: 'Is this product tax deductable?', defaultValue: false }
      ]
    }
    return []
  }

  _getOverageStrategy() {
    const { data } = this.state
    if(data.overage_strategy === 'donation') {
      return [
        { label: 'Donation Revenue Type', name: 'donation_revenue_type_id', type: 'lookup', placeholder: 'Choose a Revenue Type', endpoint: '/api/admin/finance/revenue_types', filter: { id: { $in: [30, 37] } }, value: 'id', text: 'title', required: true, format: RevenueTypeToken, defaultValue: 30 }
      ]
    }
    return []
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
