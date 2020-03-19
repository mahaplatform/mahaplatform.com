import WorkflowDesigner from '../../components/workflow_designer'
import PropTypes from 'prop-types'
import { Page } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

const triggers = {
  response: { icon: 'check-square-o', text: 'Form is submitted' },
  open: { icon: 'envelope-open', text: 'Email is opened' },
  click: { icon: 'mouse-pointer', text: 'Email is clicked' },
  list: { icon: 'users', text: 'Contact is added to list' },
  topic: { icon: 'book', text: 'Contact is added to topic' },
  property: { icon: 'id-card', text: 'Contact property is updated' },
  manual: { icon: 'plus', text: 'Contact is enrolled' }
}

class Designer extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    page: PropTypes.object,
    template: PropTypes.object,
    workflow: PropTypes.object
  }

  _handleSave = this._handleSave.bind(this)

  render() {
    return <WorkflowDesigner { ...this._getWorkflowDesigner() } />
  }

  _getWorkflowDesigner() {
    const { workflow } = this.props
    return {
      endpoint: `/api/admin/crm/workflows/${workflow.id}`,
      fields: this._getFields(),
      properties: this._getProperties(),
      trigger: this._getTrigger(),
      tokens: this._getTokens(),
      workflow,
      onSave: this._handleSave
    }
  }

  _getFields() {
    const { workflow } = this.props
    return [
      { label: 'Contact Fields', fields: [
        { name: 'First Name', key: 'first_name', type: 'text' },
        { name: 'Last Name', key: 'last_name', type: 'text' },
        { name: 'Email', key: 'email', type: 'text' },
        { name: 'Phone', key: 'phone', type: 'text' },
        { name: 'Street', key: 'street_1', type: 'text' },
        { name: 'City', key: 'city', type: 'text' },
        { name: 'State/Province', key: 'state_province', type: 'text' },
        { name: 'Postal Code', key: 'postal_code', type: 'text' },
        { name: 'Birthday', key: 'birthday', type: 'text' },
        { name: 'Spouse', key: 'spouse', type: 'text' }
      ] },
      ...workflow.form ? [{
        label: 'Response Fields',
        fields: workflow.form.config.fields.filter(field => {
          return field.type !== 'text' && field.name
        }).map(field => ({
          name: field.name.value,
          key: field.code,
          type: _.get(field, 'contactfield.type') || field.type,
          options: _.get(field, 'contactfield.options') || field.options
        }))
      }]: []
    ]
  }

  _getProperties() {
    return [
      { label: 'Core Properties', fields: [
        { label: 'First Name', name: 'first_name', type: 'textfield' },
        { label: 'Last Name', name: 'last_name', type: 'textfield' },
        { label: 'Email', name: 'email', type: 'emailfield' }
      ] },
      { label: 'Primitive Pursuits', fields: [
        { label: 'One', name: 'one', type: 'textfield' },
        { label: 'Two', name: 'two', type: 'textfield' }
      ]}
    ]
  }

  _getTrigger() {
    const { workflow } = this.props
    return triggers[workflow.trigger_type]
  }

  _getTokens() {
    const { workflow } = this.props
    return [
      { title: 'Contact Tokens', tokens: [
        { name: 'First Name', token: 'contact.first_name' },
        { name: 'Last Name', token: 'contact.last_name' },
        { name: 'Email', token: 'contact.email' }
      ] },
      ...workflow.form ? [{
        title: 'Response Tokens',
        tokens: workflow.form.config.fields.filter(field => {
          return field.type !== 'text' && field.name
        }).map(field => ({
          name: field.name.value,
          token: `response.${field.name.token}`
        }))
      }]: []
    ]
  }

  _handleSave(steps) {
    const { page } = this.props
    const { id } = page.params
    this.context.network.request({
      method: 'patch',
      endpoint: `/api/admin/crm/workflows/${id}`,
      body: { steps }
    })
  }

}

const mapResourcesToPage = (props, context) => ({
  workflow: `/api/admin/crm/workflows/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Workflow',
  component: Designer
})

export default Page(mapResourcesToPage, mapPropsToPage)
