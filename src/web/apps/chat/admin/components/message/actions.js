import { Reaction } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

class Actions extends React.Component {

  static contextTypes = {
    network: PropTypes.object,
    confirm: PropTypes.object
  }

  static propTypes = {
    channel: PropTypes.object,
    id: PropTypes.number,
    likers: PropTypes.array,
    reactions: PropTypes.array,
    user: PropTypes.object,
    user_id: PropTypes.number,
    onQuoteMessage: PropTypes.func
  }

  _handleQuoteMessage = this._handleQuoteMessage.bind(this)

  render() {
    const { channel, user, user_id } = this.props
    if(!channel) return null
    return (
      <div className="maha-message-actions">
        <div className="maha-message-action">
          <Reaction { ...this._getReaction() } />
        </div>
        <div className="maha-message-action">
          <div className="maha-message-reply" title="Reply to this message" onClick={ this._handleQuoteMessage }>
            <i className="fa fa-fw fa-arrow-circle-left" />
          </div>
        </div>
      </div>
    )
  }

  _getReaction() {
    const { id, reactions } = this.props
    return {
      id,
      reactions,
      label: 'message',
      table: 'chat_messages'
    }
  }

  _handleQuoteMessage() {
    this.props.onQuoteMessage()
  }

}

const mapStateToProps = (state, props) => ({
  user_id: state.maha.admin.user.id
})

export default connect(mapStateToProps)(Actions)
