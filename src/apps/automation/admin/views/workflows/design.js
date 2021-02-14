import WorkflowDesigner from '../../components/workflow_designer'
import PropTypes from 'prop-types'
import { Page } from '@admin'
import React from 'react'
import _ from 'lodash'

const triggers = {
  email_received: { icon: 'envelope', text: 'Contact receives email' },
  email_opened: { icon: 'envelope-open', text: 'Contact opens email' },
  email_clicked: { icon: 'envelope-open', text: 'Contact clicks email' },
  enrollment_created: { icon: 'plus', text: 'Contact is enrolled in workflow' },
  interest_created: { icon: 'th-list', text: 'Contact is added to topic' },
  interest_deleted: { icon: 'th-list', text: 'Contact is removed from topic' },
  manual: { icon: 'plus', text: 'Contact is manually enrolled' },
  order_created: { icon: 'shopping-bag', text: 'Contact places and order' },
  order_shipped: { icon: 'shopping-bag', text: 'Contact order is shipped' },
  property_updated: { icon: 'id-card', text: 'Contact property is updated' },
  response_created: { icon: 'check-square-o', text: 'Contact submits form' },
  registration_created: { icon: 'calendar', text: 'Contact registers for event' },
  subscription_created: { icon: 'th-list', text: 'Contact is added to list' },
  subscription_deleted: { icon: 'th-list', text: 'Contact is removed from list' }
}

class Designer extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    current: PropTypes.object,
    page: PropTypes.object,
    template: PropTypes.object,
    versions: PropTypes.array,
    workflow: PropTypes.object
  }

  _handleSave = this._handleSave.bind(this)

  render() {
    return <WorkflowDesigner { ...this._getWorkflowDesigner() } />
  }

  _getWorkflowDesigner() {
    const { workflow } = this.props
    return {
      endpoint: `/api/admin/automation/workflows/${workflow.id}/config`,
      fields: [
        ...this._getEmailFields(),
        ...this._getFields()
      ],
      program: workflow.program,
      trigger: this._getTrigger(),
      tokens: this._getTokens(),
      workflow,
      onSave: this._handleSave
    }
  }

  _getFields() {
    const { workflow } = this.props
    if(workflow.store) return this._getOrderFields(workflow.store)
    if(workflow.event) return this._getRegistrationFields(workflow.event)
    if(workflow.form) return this._getResponseFields(workflow.form)
    return []
  }

  _getEmailFields() {
    const { workflow } = this.props
    if(!workflow.email_campaign && !workflow.email) return []
    return [
      {
        label: 'Email',
        fields: [
          ...workflow.email ? [
            { name: workflow.email.title, key: 'email.activities', type: 'activity' }
          ] : [],
          ...workflow.email_campaign ? [
            { name: workflow.email_campaign.title, key: 'email.activities', type: 'activity' }
          ] : []
        ]
      }
    ]
  }

  _getRegistrationFields(event) {
    return [
      {
        label: 'Registration',
        fields: [
          { name: 'First Name', key: 'registration.first_name', type: 'textfield' },
          { name: 'Last Name', key: 'registration.last_name', type: 'textfield' },
          { name: 'Email', key: 'registration.email', type: 'emailfield' },
          ...event.contact_config.fields.filter(field => {
            return !_.includes(['text'], field.type)
          }).map(field => ({
            name: field.name.value,
            key: `registration.${field.code}`,
            type: _.get(field, 'contactfield.type') || field.type,
            options: _.get(field, 'contactfield.options') || field.options
          }))
        ]
      }
    ]
  }

  _getResponseFields(form) {
    return [
      {
        label: 'Response',
        fields: form.config.fields.filter(field => {
          return field.type !== 'text' && field.name
        }).map(field => ({
          name: field.name.value,
          key: `response.${field.code}`,
          type: _.get(field, 'contactfield.type') || field.type,
          options: _.get(field, 'contactfield.options') || field.options
        }))
      }
    ]
  }

  _getOrderFields(store) {
    return [
      {
        label: 'Order',
        fields: [
          { name: 'First Name', key: 'order.first_name', type: 'textfield' },
          { name: 'Last Name', key: 'order.last_name', type: 'textfield' },
          { name: 'Email', key: 'order.email', type: 'emailfield' },
          ...store.contact_config.fields.filter(field => {
            return !_.includes(['text'], field.type)
          }).map(field => ({
            name: field.name.value,
            key: `order.${field.code}`,
            type: _.get(field, 'contactfield.type') || field.type,
            options: _.get(field, 'contactfield.options') || field.options
          }))
        ]
      }
    ]
  }

  _getTokens() {
    const { workflow } = this.props
    if(workflow.event) return this._getRegistrationTokens(workflow.event)
    if(workflow.form) return this._getResponseTokens(workflow.form)
    if(workflow.store) return this._getOrderTokens(workflow.store)
    return []
  }

  _getResponseTokens(form) {
    return [
      {
        title: 'Response Tokens',
        tokens: [
          ...form.config.fields.filter(field => {
            return field.type !== 'text' && field.name
          }).map(field => ({
            name: field.name.value,
            token: `response.${field.name.token}`
          })),
          { name: 'Maha URL', token: 'response.maha_url' }
        ]
      },
      this._gePaymentTokens('response')
    ]
  }

  _getOrderTokens(store) {
    return [
      {
        title: 'Order Tokens',
        tokens: [
          { name: 'First Name', token: 'order.first_name' },
          { name: 'Last Name', token: 'order.last_name' },
          { name: 'Email', token: 'order.email' },
          ...store.contact_config.fields.filter(field => {
            return !_.includes(['text'], field.type)
          }).map(field => ({
            name: field.name.value,
            token: `order.${field.name.token}`
          })),
          { name: 'Maha URL', token: 'order.maha_url' }
        ]
      },
      this._gePaymentTokens('order')
    ]
  }

  _getRegistrationTokens(event) {
    return [
      {
        title: 'Registration Tokens',
        tokens: [
          { name: 'First Name', token: 'registration.first_name' },
          { name: 'Last Name', token: 'registration.last_name' },
          { name: 'Email', token: 'registration.email' },
          ...event.contact_config.fields.filter(field => {
            return !_.includes(['text'], field.type)
          }).map(field => ({
            name: field.name.value,
            token: `registration.${field.name.token}`
          })),
          { name: 'Maha URL', token: 'registration.maha_url' }
        ]
      },
      this._gePaymentTokens('registration')
    ]
  }

  _gePaymentTokens(model) {
    return {
      title: 'Payment Tokens',
      tokens: [
        { name: 'Method', token: `${model}.payment_method` },
        { name: 'Amount', token: `${model}.payment_amount` },
        { name: 'Card', token: `${model}.payment_card` }
      ]
    }
  }

  _getTrigger() {
    const { workflow } = this.props
    return triggers[workflow.trigger_type]
  }

  _handleSave(steps) {
    const { page } = this.props
    const { id } = page.params
    this.context.network.request({
      method: 'patch',
      endpoint: `/api/admin/automation/workflows/${id}`,
      body: { steps }
    })
  }

}

const mapResourcesToPage = (props, context) => ({
  workflow: `/api/admin/automation/workflows/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Workflow',
  component: Designer
})

export default Page(mapResourcesToPage, mapPropsToPage)
