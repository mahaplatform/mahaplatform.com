import FlowchartDesigner from '../flowchart_designer'
import { Container } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class WorkflowDesigner extends React.PureComponent {

  static propTypes = {
    endpoint: PropTypes.string,
    fields: PropTypes.object,
    program: PropTypes.object,
    programfields: PropTypes.array,
    tokens: PropTypes.array,
    trigger: PropTypes.object,
    workflow: PropTypes.object,
    onSave: PropTypes.func
  }

  render() {
    return <FlowchartDesigner { ...this._getFlowchartDesigner() } />
  }

  _getFlowchartDesigner() {
    const { endpoint, program, trigger, workflow, onSave } = this.props
    const { steps, status } = workflow
    return {
      editable: workflow.editable,
      endpoint,
      fields: this._getFields(),
      program,
      properties: this._getProperties(),
      tokens: this._getTokens(),
      workflow,
      blocks: [
        {
          icon: trigger.icon,
          label: 'Trigger',
          type: 'trigger',
          action: 'trigger',
          token: () => trigger.text
        },
        { action: 'ifthen' },
        { action: 'wait' },
        { action: 'goal' },
        { action: 'set' },
        { action: 'property' },
        { action: 'consent' },
        { action: 'list' },
        { action: 'topic' },
        { action: 'workflow' },
        { action: 'email' },
        { action: 'sms' },
        { action: 'internal_email' },
        { action: 'internal_sms' },
        {
          icon: 'check',
          label: 'Complete',
          type: 'ending',
          action: 'ending',
          token: () => 'Workflow is complete'
        }
      ],
      defaultValue:steps,
      status,
      onSave
    }
  }

  _getFields() {
    const { program, programfields, fields } = this.props
    return [
      ...programfields.length > 0 ? [{ label: `${program.title} Fields`, fields: programfields.map(field => ({
        name: field.label,
        key: `contact.${field.name}`,
        type: 'textfield'
      }))}] : [],
      ...fields || []
    ]
  }

  _getProperties() {
    const { program, programfields } = this.props
    return [
      ...programfields.length > 0 ? [{ label: `${program.title} Properties`, fields: programfields.map(field => ({
        name: field.label,
        key: `contact.${field.name}`,
        type: 'textfield'
      }))}] : []
    ]
  }

  _getTokens() {
    const { program, programfields, tokens } = this.props
    return [
      ...programfields.length > 0 ? [{ title: `${program.title} Tokens`, tokens: programfields.map(field => ({
        name:   field.name.value,
        token: `program.${field.name.token}`
      }))}] : [],
      ...tokens ? tokens : []
    ]
  }

}

const mapResources = (props, context) => ({
  programfields: `/api/admin/crm/programs/${props.program.id}/fields`
})

export default Container(mapResources)(WorkflowDesigner)
