import { connect } from 'react-redux'
import Edit from '../../views/edit'
import PropTypes from 'prop-types'
import { Stack } from '@admin'
import Channels from './channels'
import Channel from './channel'
import Message from './message'
import Info from './info'
import React from 'react'
import New from '../new'
import _ from 'lodash'

class ChatBar extends React.Component {

  static childContextTypes = {
    modal: PropTypes.object
  }

  static contextTypes = {
    modal: PropTypes.object,
    portal: PropTypes.object
  }

  static propTypes = {
    channels: PropTypes.array,
    channel: PropTypes.object,
    status: PropTypes.string,
    user_id: PropTypes.number,
    onChoose: PropTypes.func,
    onSetSubscriptions: PropTypes.func
  }

  state = {
    cards: []
  }

  _handleChoose = this._handleChoose.bind(this)
  _handleClose = this._handleClose.bind(this)
  _handleEdit = this._handleEdit.bind(this)
  _handleInfo = this._handleInfo.bind(this)
  _handleMessage = this._handleMessage.bind(this)
  _handleNew = this._handleNew.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleSubscriptions = this._handleSubscriptions.bind(this)

  render() {
    return (
      <div className="chatbar">
        <Stack { ...this._getStack() } />
      </div>
    )
  }

  componentDidMount() {
    this._handlePush(Channels, this._getChannels())
  }

  getChildContext() {
    return {
      modal: {
        open: this._handlePush,
        pop: this._handlePop
      }
    }
  }

  _getChannels() {
    const { channels, status } = this.props
    return {
      channels,
      showNew: false,
      status,
      onChoose: this._handleChoose,
      onClose: this._handleClose,
      onNew: this._handleNew
    }
  }

  _getChannel(id) {
    const { channels } = this.props
    const channel = _.find(channels, { id })
    return {
      channel,
      onBack: this._handlePop,
      onInfo: this._handleInfo.bind(this, id),
      onShowMessage: this._handleMessage
    }
  }

  _getMessage(message) {
    return {
      message,
      onBack: this._handlePop
    }
  }

  _getNew() {
    return {
      onSuccess: this._handleChoose
    }
  }

  _getInfo(id) {
    const { channels } = this.props
    const channel = _.find(channels, { id })
    return {
      channel,
      onBack: this._handlePop,
      onEdit: this._handleEdit.bind(this, channel),
      onSubscriptions: this._handleSubscriptions.bind(this, id)
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _handleClose() {
    this.context.portal.closeSidebar()
  }

  _handleChoose(id) {
    this._handlePush(Channel, this._getChannel(id))
  }

  _handleEdit(channel) {
    this.context.modal.push(<Edit channel={ channel } />)
  }

  _handleInfo(id) {
    this._handlePush(Info, this._getInfo(id))
  }

  _handleMessage(message) {
    this._handlePush(Message, this._getMessage(message))
  }

  _handleNew(show) {
    this.context.modal.push(<New { ...this._getNew() } />)
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
      onCancel: this._handleSubscriptions.bind(this, false),
      onDone: this._handleSubscriptions.bind(this, false)
    }
  }

  _handleSubscriptions(show) {
    this.props.onSetSubscriptions(show)
  }

}

const mapStateToProps = (state, props) => ({
  user_id: state.maha.admin.user.id
})

export default connect(mapStateToProps)(ChatBar)
