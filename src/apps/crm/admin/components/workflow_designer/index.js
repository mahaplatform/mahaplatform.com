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
      { label: 'Contact Fields', fields: [
        { name: 'First Name', key: 'first_name', type: 'textfield' },
        { name: 'Last Name', key: 'last_name', type: 'textfield' },
        { name: 'Email', key: 'email', type: 'emailfield' },
        { name: 'Phone', key: 'phone', type: 'phonefield' },
        { name: 'Address', key: 'address', type: 'addressfield' },
        { name: 'Birthday', key: 'birthday', type: 'textfield' },
        { name: 'Spouse', key: 'spouse', type: 'textfield' }
      ] },
      ...programfields.length > 0 ? [{ label: `${program.title} Fields`, fields: programfields.map(field => ({
        name: field.label,
        key: field.name,
        type: 'textfield'
      }))}] : [],
      ...fields || []
    ]
  }

  _getProperties() {
    const { program, programfields } = this.props
    return [
      { label: 'Contact Properties', fields: [
        { label: 'First Name', name: 'first_name', type: 'textfield' },
        { label: 'Last Name', name: 'last_name', type: 'textfield' },
        { label: 'Email', name: 'email', type: 'textfield' },
        { label: 'Phone', name: 'phone', type: 'textfield' },
        { label: 'Street', name: 'street_1', type: 'textfield' },
        { label: 'City', name: 'city', type: 'textfield' },
        { label: 'State/Province', name: 'state_province', type: 'textfield' },
        { label: 'Postal Code', name: 'postal_code', type: 'textfield' },
        { label: 'Birthday', name: 'birthday', type: 'textfield' },
        { label: 'Spouse', name: 'spouse', type: 'textfield' }
      ] },
      ...programfields.length > 0 ? [{ label: `${program.title} Properties`, fields: programfields.map(field => ({
        label: field.label,
        name: field.name,
        type: 'textfield'
      }))}] : []
    ]
  }

  _getTokens() {
    const { program, programfields, tokens } = this.props
    return [
      { title: 'Contact Tokens', tokens: [
        { name: 'First Name', token: 'contact.first_name' },
        { name: 'Last Name', token: 'contact.last_name' },
        { name: 'Email', token: 'contact.email' }
      ] },
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
