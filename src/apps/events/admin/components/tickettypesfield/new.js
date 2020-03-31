import RevenueTypeToken from '../../../../finance/admin/tokens/revenue_type'
import ProjectToken from '../../../../finance/admin/tokens/project'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    overage_strategy: 'income',
    price_type: 'fixed'
  }

  _handleBack = this._handleBack.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { price_type } = this.state
    return {
      title: 'New Ticket Type',
      cancelIcon: 'chevron-left',
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Name', name: 'name', type: 'textfield', required: true, placeholder: 'Enter a name' },
            { label: 'Pricing', type: 'segment', fields: [
              { name: 'price_type', type: 'dropdown', options: [{value:'fixed',text:'Fixed Price'},{value:'sliding_scale',text:'Sliding Scale'},{value:'free',text:'Free'}], required: true, defaultValue: price_type },
              ...this._getPriceType()
            ] },
            { label: 'Availability', type: 'segment', fields: [
              { type: 'fields', fields: [
                { label: 'Total Tickets', name: 'total_tickets', type: 'numberfield', placeholder: 'Enter a quantity' },
                { label: 'Maximum Per Order', name: 'max_per_order', type: 'numberfield', placeholder: 'Enter a quantity' }
              ] },
              { type: 'fields', fields: [
                { label: 'Sales Open', name: 'sales_open_at', type: 'datetimefield' },
                { label: 'Sales Close', name: 'sales_close_at', type: 'datetimefield' }
              ] }
            ] }
          ]
        }
      ]
    }
  }

  _getPriceType() {
    const { overage_strategy, price_type } = this.state
    if(price_type === 'fixed') {
      return [
        { type: 'fields', fields: [
          { label: 'Project', name: 'project_id', type: 'lookup', placeholder: 'Choose a Project', endpoint: '/api/admin/finance/memberships', value: 'id', text: 'title', required: true, format: ProjectToken },
          { label: 'Revenue Type', name: 'revenue_type_id', type: 'lookup', placeholder: 'Choose a Revenue Type', endpoint: '/api/admin/finance/revenue_types', value: 'id', text: 'title', required: true, format: RevenueTypeToken }
        ] },
        { label: 'Fixed Price', name: 'fixed_price', type: 'moneyfield', placeholder: 'Enter a fixed Price', required: true }
      ]
    }
    if(price_type === 'sliding_scale') {
      return [
        { type: 'fields', fields: [
          { label: 'Project', name: 'project_id', type: 'lookup', placeholder: 'Choose a Project', endpoint: '/api/admin/finance/memberships', value: 'id', text: 'title', required: true, format: ProjectToken },
          { label: 'Revenue Type', name: 'revenue_type_id', type: 'lookup', placeholder: 'Choose a Revenue Type', endpoint: '/api/admin/finance/revenue_types', value: 'id', text: 'title', required: true, format: RevenueTypeToken }
        ] },
        { type: 'fields', fields: [
          { label: 'Low Price', name: 'low_price', type: 'moneyfield', placeholder: 'Low Price', required: true },
          { label: 'High Price', name: 'high_price', type: 'moneyfield', placeholder: 'High Price', required: true }
        ] },
        { label: 'Overage Strategy', name: 'overage_strategy', type: 'dropdown', options: [
          { value: 'income', text: 'Treat any amount over the low price as additional income' },
          { value: 'donation', text: 'Treat any amount over the low price as a donation' }
        ], required: true, defaultValue: overage_strategy },
        ...this._getOverageStrategy()
      ]
    }
    return []
  }

  _getOverageStrategy() {
    const { overage_strategy } = this.state
    if(overage_strategy === 'income') return []
    return [
      { label: 'Donation Revenue Type', name: 'donation_revenue_type_id', type: 'lookup', placeholder: 'Choose a Revenue Type', endpoint: '/api/admin/finance/revenue_types', value: 'id', text: 'title', required: true, format: RevenueTypeToken }
    ]
  }

  _handleBack() {
    this.props.onBack()
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

  _handleSuccess(ticket_type) {
    this.props.onDone(ticket_type)
  }


}


export default New
