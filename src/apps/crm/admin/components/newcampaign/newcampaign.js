import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Programs from './programs'
import Postal from './postal'
import Social from './social'
import Voice from './voice'
import Email from './email'
import Types from './types'
import React from 'react'
import SMS from './sms'
import _ from 'lodash'

const types = [
  {
    value: 'inbound_voice',
    component: Email,
    direction: 'inbound'
  },{
    value: 'inbound_sms',
    component: Email,
    direction: 'inbound'
  },{
    value: 'voice',
    component: Voice,
    direction: 'outbound'
  },{
    value: 'sms',
    component: SMS,
    direction: 'outbound'
  },{
    value: 'email',
    component: Email,
    direction: 'outbound'
  },{
    value: 'social',
    component: Social,
    direction: 'outbound'
  },{
    value: 'postal',
    component: Postal,
    direction: 'outbound'
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

  _getType(program_id) {
    return {
      program_id,
      onBack: this._handlePop,
      onDone: this._handleDone
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleDone(result) {
    const { type } = this.props
    this.context.router.history.push(`/admin/crm/campaigns/${type}/${result.code}`)
    this.context.modal.close()
  }

  _handlePop(index = -1) {
    this.setState({
      cards:this.state.cards.slice(0, index)
    })
  }

  _handleProgram(program) {
    const type = _.find(types, { value: this.props.type })
    this._handlePush(type.component, this._getType(program.id))
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
    this.props.onSet('type', type.value)
    this._handlePush(Programs, this._getPrograms())
  }

}

export default NewCampaign
