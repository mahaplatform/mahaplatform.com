import Subscriptions from '../components/subscriptions'
import PropTypes from 'prop-types'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Subscriptions { ...this._getNew() } />
  }

  _getNew() {
    return {
      endpoint: '/api/admin/chat/channels',
      method: 'POST',
      saveText: 'Start',
      title: 'New Conversation',
      onCancel: this._handleCancel,
      onDone: this._handleSuccess
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.modal.close()
    this.context.router.history.push(`/chat/channels/${result.id}`)
  }

}

export default New
