import { CSSTransition } from 'react-transition-group'
import Subscriptions from '../subscriptions'
import { Loader, Message } from 'maha-admin'
import { connect } from 'react-redux'
import Edit from '../../views/edit'
import PropTypes from 'prop-types'
import Channels from '../channels'
import Channel from '../channel'
import Info from '../info'
import React from 'react'

class Chat extends React.Component {

  static contextTypes = {
    confirm: PropTypes.object,
    modal: PropTypes.object,
    network: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    adding: PropTypes.bool,
    channels: PropTypes.array,
    channel: PropTypes.object,
    editing: PropTypes.bool,
    selected: PropTypes.number,
    managing: PropTypes.bool,
    page: PropTypes.object,
    status: PropTypes.string,
    user_id: PropTypes.number,
    onChoose: PropTypes.func,
    onLoadChat: PropTypes.func,
    onSaveChat: PropTypes.func,
    onToggleAdding: PropTypes.func,
    onToggleEditing: PropTypes.func,
    onToggleInfo: PropTypes.func,
    onToggleManaging: PropTypes.func
  }

  _handleChoose = this._handleChoose.bind(this)
  _handleCreate = this._handleCreate.bind(this)
  _handleEdit = this._handleEdit.bind(this)
  _handleInfo = this._handleInfo.bind(this)
  _handleNew = this._handleNew.bind(this)
  _handleShowMessage = this._handleShowMessage.bind(this)
  _handleSubscriptions = this._handleSubscriptions.bind(this)

  render() {
    const { adding, channel, editing, managing, status } = this.props
    if(status === 'loading') return <Loader />
    return (
      <div className={ this._getClass() }>
        <div className="fullchat-left">
          <Channels { ...this._getChannels() } />
          <CSSTransition in={ adding } classNames="slideup" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
            <div className="fullchat-panel">
              <Subscriptions { ...this._getNew() } />
            </div>
          </CSSTransition>
        </div>
        { channel &&
          <div className="fullchat-channel">
            <div className="fullchat-channel-body">
              <Channel { ...this._getChannel() } />
              <div className="fullchat-right">
                <Info { ...this._getInfo() } />
                <CSSTransition in={ editing } classNames="slideup" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
                  <div className="fullchat-panel">
                    <Edit { ...this._getEdit() } />
                  </div>
                </CSSTransition>
                <CSSTransition in={ managing } classNames="slideup" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
                  <div className="fullchat-panel">
                    <Subscriptions { ...this._getSubscriptions() } />
                  </div>
                </CSSTransition>
              </div>
            </div>
          </div>
        }
        { !channel &&
          <div className="fullchat-channel">
            <Message { ...this._getEmpty() } />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { channels, page, onChoose, onLoadChat } = this.props
    onLoadChat()
    if(page.pathname.match(/^\/admin\/chat$/)) {
      if(channels.length === 0) return
      onChoose(channels[0].id)
    } else if(page.pathname.match(/^\/admin\/chat\/channels\/\d*/)) {
      onChoose(parseInt(page.params.id))
    }
  }

  componentDidUpdate(prevProps) {
    const { channels, onChoose } = this.props
    if(channels.length > prevProps.channels.length) {
      onChoose(channels[0].id)
    }
  }

  _getClass() {
    const { adding, editing, managing } = this.props
    const classes = ['fullchat']
    if(adding) classes.push('adding')
    if(editing) classes.push('editing')
    if(managing) classes.push('managing')
    return classes.join(' ')
  }

  _getChannels() {
    const { channels, selected, status } = this.props
    return {
      channels,
      selected,
      showNew: true,
      status,
      onChoose: this._handleChoose,
      onNew: this._handleNew
    }
  }

  _getEmpty() {
    return {
      icon: 'comment',
      title: 'No Conversations',
      text: 'Choose a conversation from the list'
    }
  }

  _getHeader() {
    const { channel } = this.props
    return {
      ...channel,
      onInfo: this._handleInfo
    }
  }

  _getChannel() {
    const { channel, selected } = this.props
    return {
      key: `channel_${channel.id}`,
      channel,
      id: selected,
      onShowMessage: this._handleShowMessage
    }
  }

  _getInfo() {
    const { channel, selected } = this.props
    return {
      channel,
      id: selected,
      onEdit: this._handleEdit,
      onSubscriptions: this._handleSubscriptions
    }
  }

  _getNew() {
    return {
      endpoint: '/api/admin/chat/channels',
      method: 'POST',
      saveText: 'Start',
      title: 'New Conversation',
      onCancel: this._handleNew,
      onDone: this._handleCreate
    }
  }

  _getEdit() {
    const { selected } = this.props
    return {
      id: selected,
      onCancel: this._handleEdit,
      onSuccess: this._handleEdit
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
      onCancel: this._handleSubscriptions,
      onDone: this._handleSubscriptions
    }
  }

  _handleChoose(id) {
    this.context.router.replace(`/admin/chat/channels/${id}`)
    this.props.onChoose(id)
  }

  _handleCreate(channel) {
    this.props.onToggleAdding()
    this._handleChoose(channel.id)
  }

  _handleEdit() {
    this.props.onToggleEditing()
  }

  _handleInfo() {
    this.props.onToggleInfo()
  }

  _handleNew() {
    this.props.onToggleAdding()
  }

  _handleShowMessage(message) {
    const { router } = this.context
    router.push(`/admin/chat/channels/${message.channel_id}/messages/${message.id}`)
  }

  _handleSubscriptions() {
    this.props.onToggleManaging()
  }

}

const mapStateToProps = (state, props) => ({
  user_id: state.maha.admin.user.id
})

export default connect(mapStateToProps)(Chat)
