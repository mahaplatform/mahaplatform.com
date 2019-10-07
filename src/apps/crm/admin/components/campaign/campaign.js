import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Social from './social'
import Voice from './voice'
import Email from './email'
import Types from './types'
import React from 'react'
import Mail from './mail'
import SMS from './sms'

const types = [
  {
    value: 'email',
    component: Email
  },{
    value: 'sms',
    component: SMS
  },{
    value: 'social',
    component: Social
  },{
    value: 'voice',
    component: Voice
  },{
    value: 'mail',
    component: Mail
  }
]


class Campaign extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {}

  static defaultProps = {}

  state = {
    cards: []
  }

  _handleCancel = this._handleCancel.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    return <Stack { ...this._getStack()} />
  }

  componentDidMount() {
    this._handlePush(Types, this._getTypes())
  }

  componentDidUpdate(prevProps) {}

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _getTypes() {
    return {
      types,
      onCancel: this._handleCancel,
      onChoose: this._handleType
    }
  }

  _getType() {
    return {
      types,
      onBack: this._handlePop
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handlePop(index = -1) {
    this.setState({
      cards:this.state.cards.slice(0, index)
    })
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
    this._handlePush(type.component, this._getType())
  }

}

export default Campaign
