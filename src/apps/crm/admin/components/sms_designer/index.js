import FlowchartDesigner from '../flowchart_designer'
import { Container } from 'maha-admin'
import PropTypes from 'prop-types'
import question from './question'
import message from './message'
import React from 'react'
import _ from 'lodash'

class SMSDesigner extends React.PureComponent {

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
      editable: _.includes(['active','draft','inactive'], campaign.status),
      endpoint,
      fields: this._getFields(),
      program,
      properties: this._getProperties(),
      tokens: this._getTokens(),
      blocks: [
        this._getTrigger(),
        message,
        question,
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
          label: 'End Conversation',
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
        { name: 'Email', key: 'email', type: 'emailfield' },
        { name: 'Phone', key: 'phone', type: 'phonefield' },
        { name: 'Address', key: 'address', type: 'addressfield' },
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
        name:   field.label,
        token: `program.${field.name}`
      }))}] : [],
      ...tokens ? [tokens] : []
    ]
  }

  _getTrigger() {
    const { campaign } = this.props
    if(campaign.direction === 'inbound') {
      return {
        icon: 'comment',
        label: 'Incoming SMS',
        type: 'trigger',
        action: 'trigger',
        token: () => (
          <div>
            <div>{ campaign.phone_number.formatted}</div>
            <div>&quot;{ campaign.term }&quot;</div>
          </div>
        )
      }
    } else {
      return {
        icon: 'comment',
        label: 'Outbound SMS',
        type: 'trigger',
        action: 'trigger',
        token: () => (
          <div>
            <div>{ campaign.phone_number.formatted}</div>
          </div>
        )
      }
    }
  }

}

const mapResources = (props, context) => ({
  programfields: `/api/admin/crm/programs/${props.program.id}/fields`
})

export default Container(mapResources)(SMSDesigner)
