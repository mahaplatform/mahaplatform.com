import ImportToken from '../../../../maha/admin/tokens/import'
import FlowchartDesigner from '../flowchart_designer'
import ListCriteria from '../listcriteria'
import { Container } from 'maha-admin'
import PropTypes from 'prop-types'
import question from './question'
import record from './record'
import React from 'react'
import play from './play'
import dial from './dial'
import say from './say'
import _ from 'lodash'

class VoiceDesigner extends React.PureComponent {

  static propTypes = {
    campaign: PropTypes.object,
    endpoint: PropTypes.string,
    fields: PropTypes.array,
    program: PropTypes.object,
    programfields: PropTypes.array,
    properties: PropTypes.array,
    tokens: PropTypes.array,
    onSave: PropTypes.func
  }

  render() {
    return <FlowchartDesigner { ...this._getFlowchartDesigner() } />
  }

  _getFlowchartDesigner() {
    const { campaign, endpoint, program, onSave } = this.props
    const { steps, status } = campaign
    return {
      campaign,
      editable: _.includes(['active','draft','inactive'], campaign.status),
      endpoint,
      fields: this._getFields(),
      program,
      properties: this._getProperties(),
      tokens: this._getTokens(),
      blocks: [
        this._getTrigger(),
        play,
        question,
        say,
        record,
        dial,
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
          icon: 'phone',
          label: 'Hangup',
          type: 'ending',
          action: 'ending'
        }
      ],
      defaultValue: steps,
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
        { name: 'Event', key: 'contact.event_ids', type: ListCriteria, endpoint: '/api/admin/events/events', text: 'title', value: 'id', multiple: true, subject: true, comparisons: [
          { value: '$ct', text: 'registered for' },
          { value: '$nct', text: 'did not registered for' }
        ] },
        { name: 'Form', key: 'contact.form_ids', type: ListCriteria, endpoint: '/api/admin/crm/forms', text: 'title', value: 'id', multiple: true, subject: true, comparisons: [
          { value: '$ct', text: 'filled out' },
          { value: '$nct', text: 'did not fill out' }
        ] },
        { name: 'Import', key: 'contact.import_ids', type: 'select', endpoint: '/api/admin/crm/imports', filter:  { stage: { $eq: 'complete' } }, text: 'description', value: 'id', subject: false, format: ImportToken, comparisons: [
          { value: '$ct', text: 'was included in import' },
          { value: '$nct', text: 'was not included in import' }
        ] }
      ] },
      ...programfields.length > 0 ? [{
        label: `${program.title} Fields`,
        fields: programfields.map(field => ({
          name: field.label,
          key: `contact.${field.name}`,
          type: 'textfield'
        }))
      }] : [],
      ...fields || [],
      { label: 'Environment', fields: [
        { name: 'Day', key: 'environment.day', type: 'date' },
        // { name: 'Time', key: 'environment.time', type: 'time' }
      ] }
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
        name:   field.label,
        token: `program.${field.name}`
      }))}] : [],
      ...tokens ? tokens : []
    ]
  }

  _getTrigger() {
    const { campaign } = this.props
    if(campaign.direction === 'inbound') {
      return {
        icon: 'phone',
        label: 'Incoming Call',
        type: 'trigger',
        token: () => campaign.phone_number.formatted
      }
    } else {
      return {
        icon: 'phone',
        label: 'Outgoing Call',
        type: 'trigger',
        token: () => campaign.phone_number.formatted
      }
    }
  }

}

const mapResources = (props, context) => ({
  programfields: `/api/admin/crm/programs/${props.program.id}/fields`
})

export default Container(mapResources)(VoiceDesigner)
