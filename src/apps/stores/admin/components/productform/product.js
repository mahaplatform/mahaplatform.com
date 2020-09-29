import RevenueTypeToken from '../../../../finance/admin/tokens/revenue_type'
import ProjectToken from '../../../../finance/admin/tokens/project'
import OptionsField from '../../components/optionsfield'
import MediaField from '../../components/mediafield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Product extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    onCancel: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    product: {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)


  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Product',
      saveText: 'Next',
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true, placeholder: 'Enter title' },
            { label: 'Description', name: 'description', type: 'htmlfield', placeholder: 'Enter an optional description' },
            { label: 'Photos', name: 'photos', type: MediaField },
            { label: 'Options', type: 'segment', required: true, fields: [
              { name: 'has_options', type: 'radiogroup', deselectable: false, options: [
                { value: false, text: 'There is only one version of this product' },
                { value: true, text: 'This product is available in multiple variations (color, size, etc)' }
              ], defaultValue: false },
              ...this._getOptions()
            ] },
            this._getInventory(),
            this._getPricing()
          ]
        }
      ]
    }
  }

  _getMedia() {
    const { product } = this.state
    const instructions = product.has_options ? 'This can be overridden for each product variation' : null
    return { label: 'Media', instructions, name: 'asset_ids', type: MediaField }
  }

  _getPricing() {
    const { product } = this.state
    const label = product.has_options ? 'Base Pricing' : 'Pricing'
    const instructions = product.has_options ? 'This can be overridden for each product variation' : null
    return { label, instructions, type: 'segment', required: true, fields: [
      { name: 'price_type', type: 'dropdown', options: [{value:'fixed',text:'Fixed Price'},{value:'sliding_scale',text:'Sliding Scale'},{value:'free',text:'Free'}], required: true },
      ...this._getPriceType()
    ] }
  }

  _getInventory() {
    const { product } = this.state
    const instructions = product.has_options ? 'This can be overridden for each product variation' : null
    const fields = []
    fields.push({ name: 'inventory_policy', type: 'radiogroup', deselectable: false, required: true, options: [
      { value: 'unmanaged', text: 'Do not manage inventory' },
      { value: 'deny', text: 'Stop selling when inventory reaches 0' },
      { value: 'continue', text: 'Allow sales to continue into negative inventory levels' }
    ], defaultValue: 'unmanaged' })
    if(!product.has_options && product.inventory_policy !== 'unmanaged') {
      fields.push({ label: 'Quantity', name: 'inventory_quantity', type: 'numberfield', placeholder: 'Enter Starting Inventory', required: true, defaultValue: 0 })
    }
    return { label: 'Inventory', instructions, type: 'segment', fields }
  }

  _getOptions()  {
    const { product } = this.state
    if(product.has_options) {
      return [
        { name: 'options', type: OptionsField }
      ]
    }
    return []
  }

  _getPriceType() {
    const { product } = this.state
    if(product.price_type === 'fixed') {
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
    if(product.price_type === 'sliding_scale') {
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
        ], required: true, defaultValue: product.overage_strategy },
        ...this._getOverageStrategy(),
        { label: 'Tax Rate', name: 'tax_rate', type: 'numberfield', placeholder: 'Tax Rate', required: true, defaultValue: '0.000' },
        { label: 'Tax Deductible?', name: 'is_tax_deductible', type: 'checkbox', prompt: 'Is this product tax deductable?', defaultValue: false }
      ]
    }
    return []
  }

  _getOverageStrategy() {
    const { product } = this.state
    if(product.overage_strategy === 'donation') {
      return [
        { label: 'Donation Revenue Type', name: 'donation_revenue_type_id', type: 'lookup', placeholder: 'Choose a Revenue Type', endpoint: '/api/admin/finance/revenue_types', filter: { id: { $in: [30, 37] } }, value: 'id', text: 'title', required: true, format: RevenueTypeToken, defaultValue: 30 }
      ]
    }
    return []
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChange(product) {
    this.setState({ product })
  }

  _handleSuccess(product) {
    this.props.onDone(product)
  }

}

export default Product
