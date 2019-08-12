import Subscriptions from '../subscriptions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

class Members extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    channel: PropTypes.object,
    user_id: PropTypes.number,
    onSuccess: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Subscriptions { ...this._getSubscriptions() } />
  }

  _getSubscriptions() {
    const { channel, user_id } = this.props
    return {
      channel,
      endpoint: `/api/admin/chat/channels/${channel.id}/subscriptions`,
      method: 'PATCH',
      saveText: 'Update',
      subscription_ids: channel.subscriptions.filter(subscription => {
        return subscription.id !== user_id
      }).map(subscription => subscription.id),
      title: 'Manage Members',
      onCancel: this._handleCancel,
      onDone: this._handleSuccess
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

const mapStateToProps = (state, props) => ({
  user_id: state.maha.admin.user.id
})

export default connect(mapStateToProps)(Members)
