import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Programs from './programs'
import React from 'react'

class ProgramForm extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    form: PropTypes.any,
    programs: PropTypes.array,
    onSet: PropTypes.func
  }

  state = {
    cards: []
  }

  _handleCancel = this._handleCancel.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handleProgram = this._handleProgram.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    return <Stack { ...this._getStack()} />
  }

  componentDidMount() {
    this._handlePush(Programs, this._getPrograms())
  }

  _getPrograms() {
    const { programs } = this.props
    return {
      programs,
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

  _getForm(program_id) {
    return {
      program_id,
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

  _handleProgram(program) {
    const { form } = this.props
    this._handlePush(form, this._getForm(program.id))
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

export default ProgramForm
