import RevenueTypeToken from '@apps/finance/admin/tokens/revenue_type'
import ProjectToken from '@apps/finance/admin/tokens/project'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'
import _ from 'lodash'

class New extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    allowedPricing: PropTypes.array,
    entity: PropTypes.string,
    manageInventory: PropTypes.bool,
    products: PropTypes.array,
    onDone: PropTypes.func
  }

  state = {
    code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
    config: {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { entity } = this.props
    const { code } = this.state
    return {
      title: `New ${entity}`,
      cancelIcon: 'chevron-left',
      saveText: 'Done',
      onSubmit: () => true,
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'code', type: 'hidden', value: code },
            { label: 'Description', name: 'description', required: true, type: 'textfield', placeholder: 'Describe this item' },
            ...this._getPricing(),
            ...this._getInventory()
          ]
        }
      ]
    }
  }

  _getInventory() {
    const { manageInventory } = this.props
    return manageInventory ? [
      { name: 'is_sold_out', type: 'checkbox', prompt: 'This item is sold out' }
    ] : []
  }

  _getPricing() {
    const { allowedPricing } = this.props
    const { config } = this.state
    const options = this._getPricingOptions()
    return !_.isEqual(allowedPricing, ['fixed']) ? [
      { label: 'Pricing', type: 'segment', fields: [
        { type: 'radiogroup', name: 'pricing', deselectable: false, options, defaultValue: 'free' },
        ...this._getPricingType(config.pricing)
      ] }
    ] : this._getPricingType('fixed')
  }

  _getPricingOptions() {
    const { allowedPricing } = this.props
    const options = []
    if(_.includes(allowedPricing, 'free')) options.push({ value: 'free', text: 'Free' })
    if(_.includes(allowedPricing, 'fixed')) options.push({ value: 'fixed', text: 'Fixed Price' })
    if(_.includes(allowedPricing, 'custom')) options.push({ value: 'custom', text: 'Custom Amount'  })
    return options
  }

  _getPricingType(pricing) {
    return pricing !== 'free' ? [
      { label: 'Project', name: 'project_id', type: 'lookup', placeholder: 'Choose a Project', endpoint: '/api/admin/finance/memberships', value: 'id', text: 'title', required: true, format: ProjectToken },
      { label: 'Revenue Type', name: 'revenue_type_id', type: 'lookup', placeholder: 'Choose a Revenue Type', endpoint: '/api/admin/finance/revenue_types', filter: { id: { $in: [42,47] } }, value: 'id', text: 'title', required: true, format: RevenueTypeToken },
      ...pricing === 'fixed' ? [{ label: 'Fixed Price', name: 'price', required: true, type: 'moneyfield', placeholder: '0.00' }] : [],
      { label: 'Tax Rate', name: 'tax_rate', required: true, type: 'ratefield', placeholder: '0.000' }
    ] : []
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

export default New
