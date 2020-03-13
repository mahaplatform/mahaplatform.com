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
    if(!workflow.form) return []
    return workflow.form.config.fields.filter(field => {
      return field.type !== 'text' && field.name
    }).map(field => ({
      code: field.code,
      token: `response.${field.code}`,
      name: `response.${field.name.token}`,
      type: _.get(field, 'contactfield.type') || field.type,
      options: _.get(field, 'contactfield.options') || field.options
    }))
  }

  _getProperties() {
    return [
      { label: 'First Name', name: 'first_name', type: 'textfield' },
      { label: 'Last Name', name: 'last_name', type: 'textfield' },
      { label: 'Email', name: 'email', type: 'emailfield' }
    ]
  }

  _getTrigger() {
    const { workflow } = this.props
    return triggers[workflow.trigger_type]
  }

  _getTokens() {
    return [
      { title: 'Response Variables', tokens: [
        { name: 'First Name', token: 'response.first_name' },
        { name: 'Last Name', token: 'response.last_name' },
        { name: 'Email', token: 'response.email' }
      ] },
      { title: 'Contact Variables', tokens: [
        { name: 'First Name', token: 'contact.first_name' },
        { name: 'Last Name', token: 'contact.last_name' },
        { name: 'Email', token: 'contact.email' }
      ] }
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
