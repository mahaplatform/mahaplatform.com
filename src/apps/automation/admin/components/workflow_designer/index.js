import FlowchartDesigner from '../flowchart_designer'
import { Container } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class WorkflowDesigner extends React.PureComponent {

  static propTypes = {
    fields: PropTypes.array,
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
    const { program, trigger, workflow, onSave } = this.props
    const { steps, status } = workflow
    return {
      editable: workflow.editable,
      entity: `crm_workflows/${workflow.id}`,
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
      ...programfields.length > 0 ? [{ label: program.title, fields: programfields.map(field => ({
        name: field.label,
        key: `contact.values.${field.code}`,
        type: field.type
      }))}] : [],
      ...fields || []
    ]
  }

  _getProperties() {
    const { program, programfields } = this.props
    return [
      ...programfields.length > 0 ? [{ label: program.title, fields: programfields.map(field => ({
        ...field,
        name: `values.${field.code}`
      }))}] : []
    ]
  }

  _getTokens() {
    const { program, programfields, tokens } = this.props
    return [
      ...programfields.length > 0 ? [{ title: program.title, tokens: programfields.map(field => ({
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
