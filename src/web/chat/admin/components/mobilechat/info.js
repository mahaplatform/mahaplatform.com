import { channel } from './selectors'
import Info from '../info'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from '../../views/edit'
import Subscriptions from '../subscriptions'

class MobileInfo extends React.Component {

    static contextTypes = {
      confirm: PropTypes.object,
      modal: PropTypes.object,
      network: PropTypes.object,
      router: PropTypes.object
    }

    static propTypes = {
      channel: PropTypes.object,
      user_id: PropTypes.number
    }

    _handleEdit = this._handleEdit.bind(this)
    _handleSubscriptions = this._handleSubscriptions.bind(this)

    render() {
      const { channel } = this.props
      if(!channel) return null
      return <Info { ...this._getInfo() } />
    }

    _getInfo() {
      const { channel } = this.props
      return {
        channel,
        id: channel.id,
        showHeader: true,
        onEdit: this._handleEdit,
        onSubscriptions: this._handleSubscriptions
      }
    }

    _getEdit() {
      const { modal } = this.context
      const { channel } = this.props
      return {
        id: channel.id,
        onCancel: () => modal.pop(),
        onSuccess: () => modal.pop()
      }
    }

    _getSubscriptions() {
      const { modal } = this.context
      const { channel, user_id } = this.props
      return {
        channel,
        endpoint: `/api/admin/chat/channels/${channel.id}/subscriptions`,
        subscription_ids: channel.subscriptions.filter(subscription => {
          return subscription.id !== user_id
        }).map(subscription => subscription.id),
        onCancel: () => modal.pop(),
        onDone: () => modal.pop()
      }
    }

    _handleEdit() {
      this.context.modal.push(<Edit { ...this._getEdit() } />)
    }

    _handleSubscriptions() {
      this.context.modal.push(<Subscriptions { ...this._getSubscriptions() } />)
    }


}

const mapStateToProps = (state, props) => ({
  channel: channel(state, props),
  user_id: state.maha.admin.user.id
})

export default connect(mapStateToProps)(MobileInfo)
