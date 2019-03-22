import { Avatar, emojify } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import moment from 'moment'
import React from 'react'

class ChannelToken extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.bool,
    description: PropTypes.string,
    id: PropTypes.number,
    is_archived: PropTypes.bool,
    label: PropTypes.string,
    last_message: PropTypes.object,
    last_message_at: PropTypes.any,
    name: PropTypes.string,
    owner: PropTypes.object,
    subscriptions: PropTypes.array,
    typing: PropTypes.object,
    unread: PropTypes.number,
    user_id: PropTypes.number,
    onClick: PropTypes.func,
    onContextMenu: PropTypes.func
  }

  _handleClick = this._handleClick.bind(this)
  _handleContextMenu = this._handleContextMenu.bind(this)

  render() {
    const { label, name, typing, unread } = this.props
    const others = this._getOthers()
    return (
      <div className={ this._getClass(others) } onClick={ this._handleClick } onContextMenu={ this._handleContextMenu }>
        <div className="channel-token-avatar">
          { others.map((subscription, index) => (
            <Avatar key={`subscription_${index}`} user={ subscription } presence={ true } />
          ))}
        </div>
        <div className="channel-token-details">
          <div className="channel-token-text">
            <strong>{ name || label }</strong>
            { typing ?
              <em>typing...</em> :
              this._getMessage()
            }
          </div>
          <div className="channel-token-timestamp">
            { this._getLastMessageAt() }
          </div>
        </div>
        <div className="channel-token-extra">
          { unread > 0 &&
            <div className="channel-token-label">{ unread }</div>
          }
        </div>
        <div className="channel-token-proceed">
          <i className="fa fa-fw fa-chevron-right" />
        </div>
      </div>
    )
  }

  _getMessage() {
    const { last_message } = this.props
    if(!last_message) return <span>New channel</span>
    if(last_message.attachments_count) return (
      <div className="channel-token-message">
        <i className="fa fa-camera" />
        { pluralize('attachment', last_message.attachments_count) }
      </div>
    )
    return <div className="channel-token-message" dangerouslySetInnerHTML={{ __html: emojify(last_message.text) }} />
  }

  _getClass(others) {
    const { active, unread } = this.props
    const classes = ['channel-token', `channel-token-${ others.length }`]
    if(active) classes.push('active')
    if(unread > 0) classes.push('unread')
    if(name) classes.push('named')
    if(!name) classes.push('unnamed')
    return classes.join(' ')
  }

  _getOthers() {
    const { subscriptions, user_id } = this.props
    return subscriptions.length > 1 ? subscriptions.filter(subscription => {
      return subscription.id !== user_id
    }).slice(0, 2) : subscriptions
  }

  _getLastMessageAt() {
    return moment(this.props.last_message_at).calendar(null, {
      sameDay: 'h:mmA',
      lastDay: '[Yesterday]',
      lastWeek: 'dddd',
      sameElse: 'M/D/YY'
    })
  }

  _handleClick() {
    this.props.onClick()
  }

  _handleContextMenu(e) {
    const { description, id, is_archived, label, name, owner } = this.props
    this.props.onContextMenu({ description, id, is_archived, label, name, owner }, e)
  }

}

const mapStateToProps = (state, props) => ({
  user_id: state.maha.admin.user.id
})

export default connect(mapStateToProps)(ChannelToken)
