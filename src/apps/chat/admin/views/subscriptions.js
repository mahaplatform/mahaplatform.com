import Subscriptions from '../components/subscriptions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

class SubscriptionsModal extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    id: PropTypes.number
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Subscriptions {...this._getSubscriptions() } />
  }

  _getSubscriptions() {
    const { id, user_id } = this.props
    return {
      title: 'Manage Subscriptions',
      saveText: 'Save',
      endpoint: `/api/admin/chat/channels/${id}/subscriptions`,
      subscription_ids: channel.subscriptions.filter(subscription => subscription.id !== user_id).map(subscription => subscription.id),
      method: 'PATCH',
      onCancel: this._handleCancel,
      onDone: this._handleDone
    }
  }

  _handleCancel() {
    this.context.modal.pop()
  }

  _handleDone() {
    this.context.modal.pop()
  }

}

const mapStateToProps = (state, props) => ({
  user_id: state.maha.user.user_id
})

export default connect(mapStateToProps)(SubscriptionsModal)
