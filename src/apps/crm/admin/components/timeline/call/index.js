import PhoneNumbers from './phone_numbers'
import { Stack } from '@admin'
import PropTypes from 'prop-types'
import Programs from './programs'
import React from 'react'
import Call from './call'

class CallActivity extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    contact: PropTypes.any
  }

  state = {
    program: null,
    phone_number: null,
    cards: []
  }

  _handleCancel = this._handleCancel.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handleProgram = this._handleProgram.bind(this)
  _handlePhoneNumber = this._handlePhoneNumber.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    return <Stack { ...this._getStack()} />
  }

  componentDidMount() {
    this._handlePush(Programs, this._getPrograms())
  }

  _getCall() {
    const { program, phone_number } = this.state
    const { contact } = this.props
    return {
      contact,
      phone_number,
      program,
      onBack: this._handlePop,
      onDone: this._handleCancel
    }
  }

  _getPhoneNumbers() {
    const { contact } = this.props
    return {
      contact,
      onBack: this._handlePop,
      onChoose: this._handlePhoneNumber
    }
  }

  _getPrograms() {
    return {
      onCancel: this._handleCancel,
      onChoose: this._handleProgram
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
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

  _handleProgram(program) {
    const { contact } = this.props
    this.setState({ program })
    if(contact.phone_numbers.length === 1) {
      return this._handlePhoneNumber(contact.phone_numbers[0])
    }
    this._handlePush(PhoneNumbers, this._getPhoneNumbers())
  }

  _handlePhoneNumber(phone_number) {
    this.setState({ phone_number }, () => {
      this._handlePush(Call, this._getCall())
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

}

export default CallActivity
