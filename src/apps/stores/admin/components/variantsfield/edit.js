import RevenueTypeToken from '../../../../finance/admin/tokens/revenue_type'
import ProjectToken from '../../../../finance/admin/tokens/project'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    variant: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    variant: {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    if(!this.state.variant) return null
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    const { variant } = this.props
    this.setState({ variant })
  }

  _getForm() {
    const { variant } = this.state
    return {
      title: 'Edit Variant',
      cancelIcon: 'chevron-left',
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Pricing', type: 'segment', fields: [
              { name: 'price_type', type: 'dropdown', options: [{value:'fixed',text:'Fixed Price'},{value:'sliding_scale',text:'Sliding Scale'},{value:'free',text:'Free'}], required: true, defaultValue: variant.price_type },
              ...this._getPriceType()
            ] },
            { label: 'Inventory Quantity', name: 'inventory_quantity', type: 'numberfield', required: true, defaultValue: variant.inventory_quantity }
          ]
        }
      ]
    }
  }

  _getInventory() {
    const { variant } = this.state
    const fields = []
    fields.push({ name: 'inventory_policy', type: 'radiogroup', deselectable: false, required: true, options: [
      { value: 'unmanaged', text: 'Do not manage inventory for this product' },
      { value: 'deny', text: 'Stop selling when inventory reaches 0' },
      { value: 'continue', text: 'Allow sales to continue into negative inventory levels' }
    ], defaultValue: 'unmanaged' })
    if(variant.inventory_policy !== 'unmanaged') {
      fields.push({ label: 'Quantity', name: 'inventory_quantity', type: 'numberfield', placeholder: 'Enter Starting Inventory', required: true, defaultValue: 0 })
    }
    return fields
  }

  _getPriceType() {
    const { variant } = this.state
    if(variant.price_type === 'fixed') {
      return [
        { type: 'fields', fields: [
          { label: 'Project', name: 'project_id', type: 'lookup', placeholder: 'Choose a Project', endpoint: '/api/admin/finance/memberships', value: 'id', text: 'title', required: true, format: ProjectToken, defaultValue: variant.project_id },
          { label: 'Revenue Type', name: 'revenue_type_id', type: 'lookup', placeholder: 'Choose a Revenue Type', endpoint: '/api/admin/finance/revenue_types', filter: { id: { $in: [42,47] } }, value: 'id', text: 'title', required: true, format: RevenueTypeToken, defaultValue: variant.revenue_type_id }
        ] },
        { label: 'Fixed Price', name: 'fixed_price', type: 'moneyfield', placeholder: 'Enter a fixed Price', required: true, defaultValue: variant.fixed_price },
        { label: 'Tax Rate', name: 'tax_rate', type: 'numberfield', placeholder: 'Tax Rate', required: true, defaultValue: variant.tax_rate },
        { label: 'Tax Deductible?', name: 'is_tax_deductible', type: 'checkbox', prompt: 'Is this variant tax deductable?', defaultValue: variant.is_tax_deductible }
      ]
    }
    if(variant.price_type === 'sliding_scale') {
      return [
        { type: 'fields', fields: [
          { label: 'Project', name: 'project_id', type: 'lookup', placeholder: 'Choose a Project', endpoint: '/api/admin/finance/memberships', value: 'id', text: 'title', required: true, format: ProjectToken, defaultValue: variant.project_id },
          { label: 'Revenue Type', name: 'revenue_type_id', type: 'lookup', placeholder: 'Choose a Revenue Type', endpoint: '/api/admin/finance/revenue_types', filter: { id: { $in: [42,47] } }, value: 'id', text: 'title', required: true, format: RevenueTypeToken, defaultValue: variant.revenue_type_id }
        ] },
        { type: 'fields', fields: [
          { label: 'Low Price', name: 'low_price', type: 'moneyfield', placeholder: 'Low Price', required: true, defaultValue: variant.low_price },
          { label: 'High Price', name: 'high_price', type: 'moneyfield', placeholder: 'High Price', required: true, defaultValue: variant.high_price }
        ] },
        { label: 'Overage Strategy', name: 'overage_strategy', type: 'dropdown', options: [
          { value: 'income', text: 'Treat any amount over the low price as additional income' },
          { value: 'donation', text: 'Treat any amount over the low price as a donation' }
        ], required: true, defaultValue: variant.overage_strategy },
        ...this._getOverageStrategy(),
        { label: 'Tax Rate', name: 'tax_rate', type: 'numberfield', placeholder: 'Tax Rate', required: true, defaultValue: variant.tax_rate },
        { label: 'Tax Deductible?', name: 'is_tax_deductible', type: 'checkbox', prompt: 'Is this variant tax deductable?', defaultValue: variant.is_tax_deductible }
      ]
    }
    return []
  }

  _getOverageStrategy() {
    const { variant } = this.state
    if(variant.overage_strategy === 'donation') {
      return [
        { label: 'Donation Revenue Type', name: 'donation_revenue_type_id', type: 'lookup', placeholder: 'Choose a Revenue Type', endpoint: '/api/admin/finance/revenue_types', filter: { id: { $in: [30, 37] } }, value: 'id', text: 'title', required: true, format: RevenueTypeToken, defaultValue: variant.donation_revenue_type_id }
      ]
    }
    return []
  }

  _handleCancel() {
    this.props.onBack()
  }

  _handleChange(variant) {
    this.setState({ variant })
  }

  _handleSuccess(variant) {
    this.props.onDone(variant)
  }

}

export default Edit
