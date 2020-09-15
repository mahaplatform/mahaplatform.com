import RevenueTypeToken from '../../../../finance/admin/tokens/revenue_type'
import ProjectToken from '../../../../finance/admin/tokens/project'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Edit extends React.PureComponent {

  static propTypes = {
    ticket_type: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    ticket_type: null
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    if(!this.state.ticket_type) return null
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    const { ticket_type } = this.props
    this.setState({ ticket_type })
  }

  _getForm() {
    const { ticket_type } = this.state
    return {
      title: 'Edit Ticket Type',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'is_active', type: 'hidden', defaultValue: ticket_type.is_active },
            { label: 'Name', name: 'name', type: 'textfield', required: true, placeholder: 'Enter a name', defaultValue: ticket_type.name },
            { label: 'Description', name: 'description', type: 'textarea', placeholder: 'Enter an optional description', defaultValue: ticket_type.description },
            { label: 'Pricing', type: 'segment', fields: [
              { name: 'price_type', type: 'dropdown', options: [{value:'fixed',text:'Fixed Price'},{value:'sliding_scale',text:'Sliding Scale'},{value:'free',text:'Free'}], required: true, defaultValue: ticket_type.price_type },
              ...this._getPriceType()
            ] },
            { label: 'Availability', type: 'segment', fields: [
              { type: 'fields', fields: [
                { label: 'Total Tickets', name: 'total_tickets', type: 'numberfield', placeholder: 'Enter a quantity', defaultValue: ticket_type.total_tickets },
                { label: 'Maximum Per Order', name: 'max_per_order', type: 'numberfield', placeholder: 'Enter a quantity', defaultValue: ticket_type.max_per_order }
              ] },
              { type: 'fields', fields: [
                { label: 'Sales Open', name: 'sales_open_at', type: 'datetimefield', defaultValue: ticket_type.sales_open_at },
                { label: 'Sales Close', name: 'sales_close_at', type: 'datetimefield', defaultValue: ticket_type.sales_close_at }
              ] }
            ] }
          ]
        }
      ]
    }
  }

  _getPriceType() {
    const { ticket_type } = this.state
    if(ticket_type.price_type === 'fixed') {
      return [
        { type: 'fields', fields: [
          { label: 'Project', name: 'project_id', type: 'lookup', placeholder: 'Choose a Project', endpoint: '/api/admin/finance/memberships', value: 'id', text: 'title', required: true, format: ProjectToken, defaultValue: ticket_type.project_id },
          { label: 'Revenue Type', name: 'revenue_type_id', type: 'lookup', placeholder: 'Choose a Revenue Type', endpoint: '/api/admin/finance/revenue_types', filter: { id: { $in: [26,49] } }, value: 'id', text: 'title', required: true, format: RevenueTypeToken, defaultValue: ticket_type.revenue_type_id }
        ] },
        { label: 'Fixed Price', name: 'fixed_price', type: 'moneyfield', placeholder: 'Enter a fixed Price', required: true, defaultValue: ticket_type.fixed_price },
        { label: 'Tax Rate', name: 'tax_rate', type: 'numberfield', placeholder: 'Tax Rate', required: true, defaultValue: ticket_type.tax_rate  },
        { label: 'Tax Deductible?', name: 'is_tax_deductible', type: 'checkbox', prompt: 'Is this product tax deductable?', defaultValue: ticket_type.is_tax_deductible  }
      ]
    }
    if(ticket_type.price_type === 'sliding_scale') {
      return [
        { type: 'fields', fields: [
          { label: 'Project', name: 'project_id', type: 'lookup', placeholder: 'Choose a Project', endpoint: '/api/admin/finance/memberships', value: 'id', text: 'title', required: true, format: ProjectToken, defaultValue: ticket_type.project_id },
          { label: 'Revenue Type', name: 'revenue_type_id', type: 'lookup', placeholder: 'Choose a Revenue Type', endpoint: '/api/admin/finance/revenue_types', filter: { id: { $in: [26,49] } }, value: 'id', text: 'title', required: true, format: RevenueTypeToken, defaultValue: ticket_type.revenue_type_id }
        ] },
        { type: 'fields', fields: [
          { label: 'Low Price', name: 'low_price', type: 'moneyfield', placeholder: 'Low Price', required: true, defaultValue: ticket_type.low_price },
          { label: 'High Price', name: 'high_price', type: 'moneyfield', placeholder: 'High Price', required: true, defaultValue: ticket_type.high_price }
        ] },
        { label: 'Overage Strategy', name: 'overage_strategy', type: 'dropdown', options: [
          { value: 'income', text: 'Treat any amount over the low price as additional income' },
          { value: 'donation', text: 'Treat any amount over the low price as a donation' }
        ], required: true, defaultValue: ticket_type.overage_strategy },
        ...this._getOverageStrategy(),
        { label: 'Tax Rate', name: 'tax_rate', type: 'numberfield', placeholder: 'Tax Rate', required: true, defaultValue: ticket_type.tax_rate  },
        { label: 'Tax Deductible?', name: 'is_tax_deductible', type: 'checkbox', prompt: 'Is this product tax deductable?', defaultValue: ticket_type.is_tax_deductible  }
      ]
    }
    return []
  }

  _getOverageStrategy() {
    const { ticket_type } = this.state
    if(ticket_type.overage_strategy === 'donation') {
      return [
        { label: 'Donation Revenue Type', name: 'donation_revenue_type_id', type: 'lookup', placeholder: 'Choose a Revenue Type', endpoint: '/api/admin/finance/revenue_types', filter: { id: { $in: [30, 37] } }, value: 'id', text: 'title', required: true, format: RevenueTypeToken, defaultValue: ticket_type.donation_revenue_type_id }
      ]
    }
    return []
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange(ticket_type) {
    this.setState({ ticket_type })
  }

  _handleSuccess(ticket_type) {
    this.props.onDone({
      id: this.props.ticket_type.id,
      ...ticket_type
    })
  }

}


export default Edit
