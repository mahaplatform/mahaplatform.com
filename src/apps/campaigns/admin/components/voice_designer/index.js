import FlowchartDesigner from '@apps/automation/admin/components/flowchart_designer'
import dialbyextension from './dialbyextension'
import dialbyname from './dialbyname'
import voicemail from './voicemail'
import { Container } from '@admin'
import PropTypes from 'prop-types'
import redirect from './redirect'
import dialmenu from './dialmenu'
import React from 'react'
import play from './play'
import dial from './dial'
import say from './say'
import _ from 'lodash'

class VoiceDesigner extends React.PureComponent {

  static propTypes = {
    campaign: PropTypes.object,
    endpoint: PropTypes.string,
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
    const { campaign, endpoint, entity, program, onSave } = this.props
    const { steps, status } = campaign
    return {
      campaign,
      editable: _.includes(['active','draft','inactive'], campaign.status),
      endpoint,
      entity,
      fields: this._getFields(),
      program,
      properties: this._getProperties(),
      tokens: this._getTokens(),
      blocks: [
        this._getTrigger(),
        play,
        say,
        redirect,
        dialbyextension,
        dialbyname,
        dialmenu,
        dial,
        voicemail,
        { action: 'timeofday' },
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
    if(!programfields) return []
    return [
      ...programfields.length > 0 ? [{
        label: program.title,
        fields: programfields.map(field => ({
          name: field.label,
          key: `contact.values.${field.code}`,
          type: 'textfield'
        }))
      }] : [],
      ...fields || []
    ]
  }

  _getProperties() {
    const { program, programfields } = this.props
    if(!programfields) return []
    return [
      ...programfields.length > 0 ? [{ label: program.title, fields: programfields.map(field => ({
        ...field,
        name: `values.${field.code}`
      }))}] : []
    ]
  }

  _getTokens() {
    const { program, programfields, tokens } = this.props
    if(!programfields) return []
    return [
      ...programfields.length > 0 ? [{ title: program.title, tokens: programfields.map(field => ({
        name:   field.label,
        token: `program.${field.name.token}`
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
