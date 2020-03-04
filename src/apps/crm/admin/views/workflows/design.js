import WorkflowDesigner from '../../components/workflow_designer'
import PropTypes from 'prop-types'
import { Page } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

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

  _getTrigger() {
    const { workflow } = this.props
    if(workflow.trigger_type === 'response') {
      return {
        icon: 'check-square-o',
        text: 'Form is submitted'
      }
    } else if(workflow.trigger_type === 'open') {
      return {
        icon: 'envelope-open',
        text: 'Email is opened'
      }
    } else if(workflow.trigger_type === 'click') {
      return {
        icon: 'mouse-pointer',
        text: 'Email is clicked'
      }
    } else if(workflow.trigger_type === 'list') {
      return {
        icon: 'users',
        text: 'Contact is added to list'
      }
    } else if(workflow.trigger_type === 'topic') {
      return {
        icon: 'book',
        text: 'Contact is added to topic'
      }
    } else if(workflow.trigger_type === 'property') {
      return {
        icon: 'id-card',
        text: 'Contact property is updated'
      }
    } else if(workflow.trigger_type === 'manual') {
      return {
        icon: 'plus',
        text: 'Contact is enrolled'
      }
    }
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
