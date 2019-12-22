import RevenueTypeToken from '../../tokens/revenue_type'
import ProjectToken from '../../tokens/project'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {}

  state = {
    overage_strategy: 'income',
    price_type: 'fixed'
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { price_type } = this.state
    return {
      title: 'New Product',
      method: 'post',
      action: '/api/admin/finance/products',
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a Title', required: true },
            { label: 'Project', name: 'project_id', type: 'lookup', placeholder: 'Choose a Project', endpoint: '/api/admin/finance/projects', value: 'id', text: 'title', required: true, format: ProjectToken },
            { label: 'Revenue Type', name: 'revenue_type_id', type: 'lookup', placeholder: 'Choose a Revenue Type', endpoint: '/api/admin/finance/revenue_types', value: 'id', text: 'title', required: true, format: RevenueTypeToken },
            { label: 'Price Type', name: 'price_type', type: 'radiogroup', options: [{value:'fixed',text:'Fixed Price'},{value:'sliding_scale',text:'Sliding Scale'}], required: true, defaultValue: price_type },
            ...this._getPriceType(),
            { label: 'Tax Rate', name: 'tax_rate', type: 'numberfield', placeholder: 'Tax Rate', required: true, defaultValue: '0.000' },
            { label: 'Tax Deductible?', name: 'is_tax_deductible', type: 'checkbox', prompt: 'Is this product tax deductable?', defaultValue: false }
          ]
        }
      ]
    }
  }

  _getPriceType() {
    const { overage_strategy, price_type } = this.state
    if(price_type === 'fixed') {
      return [
        { label: 'Fixed Price', name: 'fixed_price', type: 'moneyfield', placeholder: 'Fixed Price', required: true }
      ]
    } else {
      return [
        { type: 'segment', fields: [
          { type: 'fields', fields: [
            { label: 'Low Price', name: 'low_price', type: 'moneyfield', placeholder: 'Low Price', required: true },
            { label: 'High Price', name: 'high_price', type: 'moneyfield', placeholder: 'High Price', required: true }
          ] },
          { label: 'Overage Strategy', name: 'overage_strategy', type: 'radiogroup', options: [
            { value: 'income', text: 'Treat any amount over the low price as additional income' },
            { value: 'donation', text: 'Treat any amount over the low price as a donation' }
          ], required: true, defaultValue: overage_strategy },
          ...this._getOverageStrategy()
        ] }
      ]
    }
  }

  _getOverageStrategy() {
    const { overage_strategy } = this.state
    if(overage_strategy === 'income') return []
    return [
      { label: 'Donation Revenue Type', name: 'donation_revenue_type_id', type: 'lookup', placeholder: 'Choose a Revenue Type', endpoint: '/api/admin/finance/revenue_types', value: 'id', text: 'title', required: true, format: RevenueTypeToken }
    ]
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChangeField(key, value) {
    if(key === 'price_type') {
      this.setState({
        price_type: value
      })
    } else if(key === 'overage_strategy') {
      this.setState({
        overage_strategy: value
      })
    }
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default New
