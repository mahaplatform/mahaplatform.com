import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Programs from './programs'
import Store from './store'
import React from 'react'

class EventForm extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.object,
    endpoint: PropTypes.string,
    action: PropTypes.string,
    method: PropTypes.string,
    programs: PropTypes.array,
    onSuccess: PropTypes.func
  }

  state = {
    cards: []
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePrograms = this._handlePrograms.bind(this)

  render() {
    return <Stack { ...this._getStack()} />
  }

  componentDidMount() {
    this._handlePush(Programs, this._getPrograms())
  }

  _getPrograms() {
    return {
      onCancel: this._handleCancel,
      onChoose: this._handlePrograms
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _getStore(program) {
    return {
      program,
      onBack: this._handlePop,
      onDone: this._handleDone
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleDone(store) {
    this.context.router.history.push(`/admin/stores/stores/${store.id}`)
    this.context.modal.close()
  }

  _handlePrograms(program) {
    this._handlePush(Store, this._getStore(program))
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

}

export default EventForm
