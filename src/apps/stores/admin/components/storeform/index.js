import ContactConfig from './contact_config'
import Confirmation from './confirmation'
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
    cards: [],
    store: {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleContactConfig = this._handleContactConfig.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePrograms = this._handlePrograms.bind(this)
  _handleStore = this._handleStore.bind(this)

  render() {
    return <Stack { ...this._getStack()} />
  }

  componentDidMount() {
    this._handlePush(Programs, this._getPrograms())
  }

  _getConfirmation() {
    const { store } = this.state
    return {
      store,
      onBack: this._handlePop,
      onDone: this._handleDone
    }
  }

  _getContactConfig() {
    const { store } = this.state
    return {
      st: store,
      onBack: this._handlePop,
      onDone: this._handleContactConfig
    }
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
      onDone: this._handleStore
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleContactConfig(store) {
    this._handleUpdate(store, () => {
      this._handlePush(Confirmation, this._getConfirmation(store))
    })
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

  _handleStore(store) {
    this._handleUpdate(store, () => {
      this._handlePush(ContactConfig, this._getContactConfig())
    })
  }

  _handleUpdate(value, callback) {
    this.setState({
      store: {
        ...this.state.store,
        ...value
      }
    }, callback)
  }

}

export default EventForm
