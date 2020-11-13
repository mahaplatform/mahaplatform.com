import RevenueTypeToken from '@apps/finance/admin/tokens/revenue_type'
import ProjectToken from '@apps/finance/admin/tokens/project'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'
import _ from 'lodash'

class Edit extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    entity: PropTypes.string,
    product: PropTypes.object,
    onDone: PropTypes.func
  }

  state = {
    config: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    if(!this.state.config) return null
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    const { product } = this.props
    this.setState({
      config: product
    })
  }

  _getForm() {
    const { config } = this.state
    const { entity } = this.props
    return {
      title: `Edit ${entity}`,
      cancelIcon: 'chevron-left',
      saveText: 'Done',
      onSubmit: () => true,
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'code', type: 'hidden', value: config.code },
            { label: 'Project', name: 'project_id', type: 'lookup', placeholder: 'Choose a Project', endpoint: '/api/admin/finance/memberships', value: 'id', text: 'title', required: true, format: ProjectToken, defaultValue: config.project_id },
            { label: 'Revenue Type', name: 'revenue_type_id', type: 'lookup', placeholder: 'Choose a Revenue Type', endpoint: '/api/admin/finance/revenue_types', value: 'id', text: 'title', required: true, format: RevenueTypeToken, defaultValue: config.revenue_type_id },
            { label: 'Description', name: 'description', required: true, type: 'textfield', placeholder: 'Describe this item', defaultValue: config.description },
            { label: 'Pricing', type: 'segment', fields: [
              { type: 'radiogroup', name: 'pricing', deselectable: false, options: [
                { value: 'fixed', text: 'Fixed Price' },
                { value: 'custom', text: 'Custom Amount' }
              ], defaultValue: config.pricing  },
              ...this._getPricing()
            ] },
            { label: 'Tax Rate', name: 'tax_rate', required: true, type: 'number', placeholder: '0.000', defaultValue: config.tax_rate },
            { name: 'is_sold_out', type: 'checkbox', prompt: 'This item is sold out' }
          ]
        }
      ]
    }
  }

  _getPricing() {
    const { config } = this.state
    if(config.pricing === 'fixed') {
      return [
        { label: 'Fixed Price', name: 'price', required: true, type: 'moneyfield', placeholder: '0.00', defaultValue: config.price }
      ]
    }
    return []
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleChange(config) {
    this.setState({ config })
  }

  _handleSuccess(product) {
    this.props.onDone(product)
    this.context.form.pop()
  }

}

export default Edit
