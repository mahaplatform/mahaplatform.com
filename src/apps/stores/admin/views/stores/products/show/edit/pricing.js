import RevenueTypeToken from '@apps/finance/admin/tokens/revenue_type'
import ProjectToken from '@apps/finance/admin/tokens/project'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

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

  _handleBack = this._handleBack.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { formdata } = this.props
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
            { label: 'Pricing', type: 'segment', required: true, fields: [
              { name: 'price_type', type: 'radiogroup', deselectable: false,options: [
                { value: 'fixed', text: 'Fixed Price' },
                { value: 'sliding_scale', text: 'Sliding Scale' },
                { value: 'free', text: 'Free'}
              ], required: true, defaultValue: formdata.price_type },
              ...this._getPriceType()
            ] }
          ]
        }
      ]
    }
  }

  _getPriceType() {
    const { formdata } = this.props
    if(formdata.price_type === 'fixed') {
      return [
        { type: 'fields', fields: [
          { label: 'Project', name: 'project_id', type: 'lookup', placeholder: 'Choose a Project', endpoint: '/api/admin/finance/memberships', value: 'id', text: 'display', required: true, format: ProjectToken, defaultValue: formdata.project_id },
          { label: 'Revenue Type', name: 'revenue_type_id', type: 'lookup', placeholder: 'Choose a Revenue Type', endpoint: '/api/admin/finance/revenue_types', filter: { id: { $in: [42,47] } }, value: 'id', text: 'display', required: true, format: RevenueTypeToken, defaultValue: formdata.revenue_type_id }
        ] },
        { label: 'Fixed Price', name: 'fixed_price', type: 'moneyfield', placeholder: 'Enter a fixed Price', required: true, defaultValue: formdata.fixed_price },
        { label: 'Tax Rate', name: 'tax_rate', type: 'ratefield', placeholder: 'Tax Rate', required: true, defaultValue: formdata.tax_rate }
      ]
    }
    if(formdata.price_type === 'sliding_scale') {
      return [
        { type: 'fields', fields: [
          { label: 'Project', name: 'project_id', type: 'lookup', placeholder: 'Choose a Project', endpoint: '/api/admin/finance/memberships', value: 'id', text: 'display', required: true, format: ProjectToken, defaultValue: formdata.project_id },
          { label: 'Revenue Type', name: 'revenue_type_id', type: 'lookup', placeholder: 'Choose a Revenue Type', endpoint: '/api/admin/finance/revenue_types', filter: { id: { $in: [42,47] } }, value: 'id', text: 'display', required: true, format: RevenueTypeToken, defaultValue: formdata.revenue_type_id }
        ] },
        { type: 'fields', fields: [
          { label: 'Low Price', name: 'low_price', type: 'moneyfield', placeholder: 'Low Price', required: true, defaultValue: formdata.low_price },
          { label: 'High Price', name: 'high_price', type: 'moneyfield', placeholder: 'High Price', required: true, defaultValue: formdata.high_price }
        ] },
        { label: 'Overage Strategy', name: 'overage_strategy', type: 'dropdown', options: [
          { value: 'income', text: 'Treat any amount over the low price as additional income' },
          { value: 'donation', text: 'Treat any amount over the low price as a donation' }
        ], required: true, defaultValue: formdata.overage_strategy },
        ...this._getOverageStrategy(),
        { label: 'Tax Rate', name: 'tax_rate', type: 'ratefield', placeholder: 'Tax Rate', required: true, defaultValue: formdata.tax_rate }
      ]
    }
    return []
  }

  _getOverageStrategy() {
    const { formdata } = this.state
    if(formdata.overage_strategy === 'donation') {
      return [
        { label: 'Donation Revenue Type', name: 'donation_revenue_type_id', type: 'lookup', placeholder: 'Choose a Revenue Type', endpoint: '/api/admin/finance/revenue_types', filter: { id: { $in: [30, 37] } }, value: 'id', text: 'title', required: true, format: RevenueTypeToken, defaultValue: formdata.donation_revenue_type_id }
      ]
    }
    return []
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleSubmit() {
    this.form.submit()
  }

  _handleSuccess(variant) {
    const { formdata } = this.props
    this.props.onSave({
      ...formdata,
      ...variant
    })
  }

}

export default Pricing
