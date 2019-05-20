import { CSSTransition } from 'react-transition-group'
import Subscriptions from '../subscriptions'
import { connect } from 'react-redux'
import Edit from '../../views/edit'
import PropTypes from 'prop-types'
import Channels from './channels'
import Channel from './channel'
import Details from './details'
import Info from './info'
import React from 'react'
import _ from 'lodash'

class ChatBar extends React.Component {

  static contextTypes = {
    portal: PropTypes.object
  }

  static propTypes = {
    channels: PropTypes.array,
    channel: PropTypes.object,
    showEdit: PropTypes.bool,
    showInfo: PropTypes.bool,
    showMessage: PropTypes.bool,
    showNew: PropTypes.bool,
    showSubscriptions: PropTypes.bool,
    selected: PropTypes.number,
    status: PropTypes.string,
    user_id: PropTypes.number,
    onChoose: PropTypes.func,
    onSetEdit: PropTypes.func,
    onSetInfo: PropTypes.func,
    onSetMessage: PropTypes.func,
    onSetNew: PropTypes.func,
    onSetSubscriptions: PropTypes.func
  }

  _handleChoose = this._handleChoose.bind(this)
  _handleClose = this._handleClose.bind(this)
  _handleCreate = this._handleCreate.bind(this)
  _handleEdit = this._handleEdit.bind(this)
  _handleInfo = this._handleInfo.bind(this)
  _handleShowMessage = this._handleShowMessage.bind(this)
  _handleSubscriptions = this._handleSubscriptions.bind(this)

  render() {
    const { channel, message, showEdit, showInfo, showNew, showSubscriptions } = this.props
    return (
      <div className="chatbar">
        <Channels { ...this._getChannels() } />
        <CSSTransition in={ !_.isNil(channel) } classNames="slideleft" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="chatbar-panel">
            { channel && <Channel { ...this._getChannel() } /> }
          </div>
        </CSSTransition>
        <CSSTransition in={ !_.isNil(message) } classNames="slideleft" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="chatbar-panel">
            { message && <Details { ...this._getDetails() } /> }
          </div>
        </CSSTransition>
        <CSSTransition in={ showInfo } classNames="slideleft" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="chatbar-panel">
            <Info { ...this._getInfo() } />
          </div>
        </CSSTransition>
        <CSSTransition in={ showNew } classNames="slideup" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="chatbar-panel">
            <Subscriptions { ...this._getNew() } />
          </div>
        </CSSTransition>
        <CSSTransition in={ showEdit } classNames="slideup" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="chatbar-panel">
            <Edit { ...this._getEdit() } />
          </div>
        </CSSTransition>
        <CSSTransition in={ showSubscriptions } classNames="slideup" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="chatbar-panel">
            { showSubscriptions && <Subscriptions { ...this._getSubscriptions() } /> }
          </div>
        </CSSTransition>
      </div>
    )
  }

  _getChannels() {
    const { channels, selected, status } = this.props
    return {
      channels,
      selected,
      showNew: false,
      status,
      onChoose: this._handleChoose,
      onClose: this._handleClose,
      onNew: this._handleNew.bind(this, true)
    }
  }

  _getChannel() {
    const { channel, selected } = this.props
    return {
      channel,
      id: selected,
      onBack: this._handleChoose.bind(this, null),
      onInfo: this._handleInfo.bind(this, true),
      onShowMessage: this._handleShowMessage
    }
  }

  _getDetails() {
    const { message } = this.props
    return {
      message,
      onBack: this._handleShowMessage.bind(this, null)
    }
  }

  _getInfo() {
    const { channel, selected } = this.props
    return {
      channel,
      id: selected,
      onBack: this._handleInfo.bind(this, false),
      onEdit: this._handleEdit.bind(this, true),
      onSubscriptions: this._handleSubscriptions.bind(this, true)
    }
  }

  _getNew() {
    return {
      endpoint: '/api/admin/chat/channels',
      method: 'POST',
      saveText: 'Start',
      title: 'New Conversation',
      onCancel: this._handleNew.bind(this, false),
      onDone: this._handleCreate
    }
  }

  _getEdit() {
    const { selected } = this.props
    return {
      id: selected,
      onCancel: this._handleEdit.bind(this, false),
      onSuccess: this._handleEdit.bind(this, false)
    }
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

  _handleChoose(id) {
    this.props.onChoose(id)
  }

  _handleClose() {
    this.context.portal.closeSidebar()
  }

  _handleCreate(channel) {
    this.props.onSetNew(false)
    this._handleChoose(channel.id)
  }

  _handleEdit(show) {
    this.props.onSetEdit(show)
  }

  _handleInfo(show) {
    this.props.onSetInfo(show)
  }

  _handleNew(show) {
    this.props.onSetNew(show)
  }

  _handleShowMessage(message) {
    this.props.onSetMessage(message)
  }

  _handleSubscriptions(show) {
    this.props.onSetSubscriptions(show)
  }

}

const mapStateToProps = (state, props) => ({
  user_id: state.maha.admin.user.id
})

export default connect(mapStateToProps)(ChatBar)
