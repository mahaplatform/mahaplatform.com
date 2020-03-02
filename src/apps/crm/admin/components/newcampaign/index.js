import Postal from '../../views/campaigns/postal/new'
import Social from '../../views/campaigns/social/new'
import Voice from '../../views/campaigns/voice/new'
import Email from '../../views/campaigns/email/new'
import SMS from '../../views/campaigns/sms/new'
import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Programs from './programs'
import Types from './types'
import React from 'react'
import _ from 'lodash'

const types = [
  {
    value: 'inbound_voice',
    component: Voice,
    direction: 'inbound',
    medium: 'voice'
  },{
    value: 'outbound_voice',
    component: Voice,
    direction: 'outbound',
    medium: 'voice'
  },{
    value: 'inbound_sms',
    component: SMS,
    direction: 'inbound',
    medium: 'sms'
  },{
    value: 'outbound_sms',
    component: SMS,
    direction: 'outbound',
    medium: 'sms'
  },{
    value: 'email',
    component: Email,
    direction: 'outbound',
    medium: 'email'
  },{
    value: 'social',
    component: Social,
    direction: 'outbound',
    medium: 'social'
  },{
    value: 'postal',
    component: Postal,
    direction: 'outbound',
    medium: 'postal'
  }
]

class NewCampaign extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    type: PropTypes.string,
    onSet: PropTypes.func
  }

  state = {
    type: null,
    cards: []
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handleProgram = this._handleProgram.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    return <Stack { ...this._getStack()} />
  }

  componentDidMount() {
    this._handlePush(Types, this._getTypes())
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _getPrograms() {
    return {
      onBack: this._handlePop,
      onChoose: this._handleProgram
    }
  }

  _getTypes() {
    return {
      types,
      onCancel: this._handleCancel,
      onChoose: this._handleType
    }
  }

  _getType(direction, program_id) {
    return {
      direction,
      program_id,
      onBack: this._handlePop,
      onDone: this._handleDone
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleDone(result) {
    const type = _.find(types, { value: this.props.type })
    this.context.router.history.push(`/admin/crm/campaigns/${type.medium}/${result.code}`)
    this.context.modal.close()
  }

  _handlePop(index = -1) {
    this.setState({
      cards:this.state.cards.slice(0, index)
    })
  }

  _handleProgram(program) {
    const { type } = this.state
    this._handlePush(type.component, this._getType(type.direction, program.id))
  }

  _handlePush(component, props) {
    this.setState({
      cards: [
        ...this.state.cards,
        { component, props }
      ]
    })
  }

  _handleType(type) {
    this.setState({ type })
    this._handlePush(Programs, this._getPrograms())
  }

}

export default NewCampaign
