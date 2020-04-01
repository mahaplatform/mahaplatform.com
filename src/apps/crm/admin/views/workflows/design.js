import WorkflowDesigner from '../../components/workflow_designer'
import PropTypes from 'prop-types'
import { Page } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

const triggers = {
  response: { icon: 'check-square-o', text: 'Form is submitted' },
  open: { icon: 'envelope-open', text: 'Email is opened' },
  click: { icon: 'mouse-pointer', text: 'Email is clicked' },
  list: { icon: 'th-list', text: 'Contact is added to list' },
  topic: { icon: 'lightbulb-o', text: 'Contact is added to topic' },
  property: { icon: 'id-card', text: 'Contact property is updated' },
  manual: { icon: 'plus', text: 'Contact is enrolled' },
  event: { icon: 'calendar', text: 'Contact registers for event' }
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
      program: workflow.program,
      trigger: this._getTrigger(),
      tokens: this._getTokens(),
      workflow,
      onSave: this._handleSave
    }
  }

  _getFields() {
    const { workflow } = this.props
    if(workflow.event) return this._getEventFields(workflow.event)
    if(workflow.form) return this._getFormFields(workflow.form)
    return {}
  }

  _getEventFields(event) {
    return {
      label: 'Event Fields',
      fields: []
    }
  }

  _getFormFields(form) {
    return {
      label: 'Response Fields',
      fields: form.config.fields.filter(field => {
        return field.type !== 'text' && field.name
      }).map(field => ({
        name: field.name.value,
        key: field.code,
        type: _.get(field, 'contactfield.type') || field.type,
        options: _.get(field, 'contactfield.options') || field.options
      }))
    }
  }

  _getTokens() {
    const { workflow } = this.props
    if(workflow.event) return this._getEventTokens(workflow.event)
    if(workflow.form) return this._getFormTokens(workflow.form)
    return {}
  }

  _getEventTokens(event) {
    return {
      title: 'Event Tokens',
      tokens: [
        { name: 'Num Tickets', token: 'regstration.num_tickets'}
      ]
    }
  }

  _getFormTokens(form) {
    return {
      title: 'Response Tokens',
      tokens: form.config.fields.filter(field => {
        return field.type !== 'text' && field.name
      }).map(field => ({
        name: field.name.value,
        token: `response.${field.name.token}`
      }))
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
