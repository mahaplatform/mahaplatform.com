import FlowchartDesigner from '@apps/automation/admin/components/flowchart_designer'
import { Container } from '@admin'
import PropTypes from 'prop-types'
import question from './question'
import message from './message'
import React from 'react'
import _ from 'lodash'

class SMSDesigner extends React.PureComponent {

  static propTypes = {
    campaign: PropTypes.object,
    entity: PropTypes.string,
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
    const { campaign, entity, program, onSave } = this.props
    const { steps, status } = campaign
    return {
      campaign,
      editable: _.includes(['active','draft','inactive'], campaign.status),
      entity,
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
        { action: 'timeofday' },
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
      ...programfields.length > 0 ? [{ label: program.title, fields: programfields.map(field => ({
        name: field.label,
        key: `contact.values.${field.code}`,
        type: 'textfield'
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
        name: field.name.value,
        token: `program.${field.name.token}`
      }))}] : [],
      { title: 'Session', tokens: [
        { name: 'From Number', token: 'session.from_number' },
        { name: 'To Number', token: 'session.to_number' }
      ] },
      ...tokens ? tokens : []
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
