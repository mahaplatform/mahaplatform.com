import ImportToken from '../../../../maha/admin/tokens/import'
import FlowchartDesigner from '../flowchart_designer'
import ListCriteria from '../listcriteria'
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
      { label: 'Contact', fields: [
        { name: 'First Name', key: 'contact.first_name', type: 'textfield' },
        { name: 'Last Name', key: 'contact.last_name', type: 'textfield' },
        { name: 'Email', key: 'contact.email', type: 'emailfield' },
        { name: 'Phone', key: 'contact.phone', type: 'phonefield' },
        { name: 'Address', key: 'contact.address', type: 'addressfield' },
        { name: 'Birthday', key: 'contact.birthday', type: 'textfield' },
        { name: 'Spouse', key: 'contact.spouse', type: 'textfield' }
      ] },
      { label: 'Classifications', fields: [
        { name: 'List', key: 'contact.list_ids', type: ListCriteria, endpoint: '/api/admin/crm/lists', text: 'title', value: 'id', multiple: true, subject: false, comparisons: [
          { value: '$ct', text: 'is subscribed to' },
          { value: '$nct', text: 'is not subscribed to' }
        ] },
        { name: 'Oraganizations', key: 'oraganizations.oraganizations_ids', type: 'textfield' },
        { name: 'Tags', key: 'contact.tag_ids', type: 'textfield' },
        { name: 'Topic', key: 'contact.topic_ids', type: ListCriteria, endpoint: '/api/admin/crm/topics', text: 'title', value: 'id', multiple: true, subject: false, comparisons: [
          { value: '$ct', text: 'is interested in' },
          { value: '$nct', text: 'is not interested in' }
        ] }
      ] },
      { label: 'Activities', fields: [
        { name: 'Event', key: 'contact.event_ids', type: ListCriteria, endpoint: '/api/admin/events/events', text: 'title', value: 'id', multiple: true, subject: false, comparisons: [
          { value: '$ct', text: 'registered for' },
          { value: '$nct', text: 'did not registered for' }
        ] },
        { name: 'Form', key: 'contact.form_ids', type: ListCriteria, endpoint: '/api/admin/crm/forms', text: 'title', value: 'id', multiple: true, subject: false, comparisons: [
          { value: '$ct', text: 'filled out' },
          { value: '$nct', text: 'did not fill out' }
        ] },
        { name: 'Import', key: 'contact.import_ids', type: 'select', endpoint: '/api/admin/crm/imports', filter:  { stage: { $eq: 'complete' } }, text: 'description', value: 'id', multiple: true, subject: false, format: ImportToken, comparisons: [
          { value: '$ct', text: 'was included in import' },
          { value: '$nct', text: 'was not included in import' }
        ] }
      ] },
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
      { label: 'Contact Properties', fields: [
        { name: 'First Name', key: 'contact.first_name', type: 'textfield' },
        { name: 'Last Name', key: 'contact.last_name', type: 'textfield' },
        { name: 'Email', key: 'contact.email', type: 'emailfield' },
        { name: 'Phone', key: 'contact.phone', type: 'phonefield' },
        { name: 'Address', key: 'contact.address', type: 'addressfield' },
        { name: 'Birthday', key: 'contact.birthday', type: 'textfield' },
        { name: 'Spouse', key: 'contact.spouse', type: 'textfield' }
      ] },
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
