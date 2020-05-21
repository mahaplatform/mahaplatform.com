import FlowchartDesigner from '../flowchart_designer'
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
        name:   field.label,
        token: `program.${field.name}`
      }))}] : [],
      { title: 'Call', tokens: [
        { name: 'From Number', token: 'call.from_number' },
        { name: 'From Number (spoken)', token: 'call.from_number_spoken' },
        { name: 'To Number', token: 'call.to_number' },
        { name: 'To Number (spoken)', token: 'call.to_number_spoken' }
      ] },
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
