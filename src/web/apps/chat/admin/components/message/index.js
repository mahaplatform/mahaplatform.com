import { Avatar, RichText, Reactions } from 'maha-admin'
import { files, images, media } from './selectors'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Actions from './actions'
import Extras from './extras'
import moment from 'moment'
import React from 'react'

class Message extends React.Component {

  static contextTypes = {
    confirm: PropTypes.object
  }

  static propTypes = {
    actions: PropTypes.bool,
    attachments: PropTypes.array,
    channel: PropTypes.object,
    created_at: PropTypes.string,
    files: PropTypes.array,
    full: PropTypes.bool,
    images: PropTypes.array,
    inline: PropTypes.bool,
    link: PropTypes.object,
    media: PropTypes.array,
    quoted_message: PropTypes.object,
    reactions: PropTypes.array,
    receipts: PropTypes.array,
    text: PropTypes.string,
    user: PropTypes.object,
    user_id: PropTypes.number,
    onQuoteMessage: PropTypes.func,
    onShow: PropTypes.func
  }

  static defaultProps = {
    inline: true,
    actions: true
  }

  state = {
    show: false
  }

  _handleShow = this._handleShow.bind(this)
  _handleHideActions = this._handleHideActions.bind(this)
  _handleQuoteMessage = this._handleQuoteMessage.bind(this)
  _handleShowActions = this._handleShowActions.bind(this)

  render() {
    const { show } = this.state
    const { actions, created_at, full, receipts, text, type, user, user_id } = this.props
    return (
      <div { ...this._getMessage() }>
        <div className="maha-message-avatar">
          { full && <Avatar user={ user } width={ 50 } /> }
        </div>
        <div className="maha-message-content">
          { full &&
            <div className="maha-message-author">
              <div className="maha-message-name">{ user.full_name }</div>
              <div className="maha-message-timestamp" title={ moment(created_at).format('MM/DD/YYYY h:mm A') } onClick={ this._handleShow }>
                { moment(created_at).format('h:mm A') }
              </div>
            </div>
          }
          <Extras { ...this._getExtras() } />
          <div className="maha-message-text">
            <RichText text={ text } />
          </div>
          <Reactions { ...this._getReactions() } />
        </div>
        { actions && show && type === 'message' && <Actions { ...this._getActions() } /> }
        { receipts &&
          <div className="maha-message-receipts">
            { receipts.filter(user => user.id !== user_id).map(user => (
              <div className="maha-message-receipt" key={ `receipt_${user.id}` }>
                <Avatar { ...this._getReceipt(user) } />
              </div>
            ))}
          </div>
        }
      </div>
    )
  }

  _getMessage() {
    return {
      className: this._getClass(),
      onMouseEnter: this._handleShowActions,
      onMouseLeave: this._handleHideActions
    }
  }

  _getClass() {
    const { full, inline, type } = this.props
    const classes=['maha-message', type]
    if(full) classes.push('full')
    if(inline) classes.push('inline')
    return classes.join(' ')
  }

  _getExtras() {
    const { files, id, images, link, media, quoted_message } = this.props
    return {
      files,
      id,
      images,
      link,
      media,
      quoted_message
    }
  }

  _getReactions() {
    const { id, reactions } = this.props
    return {
      id,
      reactions,
      table: 'chat_messages'
    }
  }

  _getReceipt(user) {
    return {
      user,
      title: `Seen by ${user.full_name} on ${moment(user.viewed_at).format('dddd')} at ${moment(user.viewed_at).format('h:mma')}`,
      width: 16,
      presence: false
    }
  }

  _getActions() {
    const { channel, id, likers, reactions, user } = this.props
    return {
      channel,
      id,
      likers,
      reactions,
      user,
      onQuoteMessage: this._handleQuoteMessage
    }
  }

  _handleShow() {
    this.props.onShow()
  }

  _handleHideActions() {
    this.setState({ show: false })
  }

  _handleShowActions() {
    this.setState({ show: true })
  }

  _handleQuoteMessage() {
    this.props.onQuoteMessage()
  }

}

const mapStateToProps = (state, props) => ({
  files: files(state, props),
  images: images(state, props),
  media: media(state, props),
  user_id: state.maha.admin.user.id
})

export default connect(mapStateToProps)(Message)
