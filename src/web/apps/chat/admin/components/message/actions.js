import { Reaction, Star } from 'maha-admin'
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
    is_starred: PropTypes.bool,
    likers: PropTypes.array,
    reactions: PropTypes.array,
    user: PropTypes.object,
    user_id: PropTypes.number,
    onQuoteMessage: PropTypes.func
  }

  _handleQuoteMessage = this._handleQuoteMessage.bind(this)
  _handleDestroyMessage = this._handleDestroyMessage.bind(this)

  render() {
    const { channel, user, user_id } = this.props
    return (
      <div className="maha-message-actions">
        { channel && !channel.is_archived &&
          <div className="maha-message-action">
            <Reaction { ...this._getReaction() } />
          </div>
        }
        { channel && !channel.is_archived &&
          <div className="maha-message-action">
            <div className="maha-message-reply" title="Reply to this message" onClick={ this._handleQuoteMessage }>
              <i className="fa fa-fw fa-arrow-circle-left" />
            </div>
          </div>
        }
        <div className="maha-message-action">
          <Star { ...this._getStar() } />
        </div>
        { channel && user.id === user_id &&
          <div className="maha-message-action">
            <div className="maha-message-delete" title="Deletethis message" onClick={ this._handleDestroyMessage }>
              <i className="fa fa-fw fa-trash" />
            </div>
          </div>

        }
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

  _getStar() {
    const { id, is_starred } = this.props
    return {
      id,
      is_starred,
      label: 'message',
      table: 'chat_messages'
    }
  }

  _handleDestroyMessage() {
    const { network, confirm } = this.context
    const { channel, id } = this.props
    const yes = () => network.request({
      method: 'DELETE',
      endpoint: `/api/admin/chat/channels/${channel.id}/messages/${id}`
    })
    confirm.open('Are you sure you want to delete this message?', yes)
  }

  _handleQuoteMessage() {
    this.props.onQuoteMessage()
  }

}

const mapStateToProps = (state, props) => ({
  user_id: state.maha.admin.user.id
})

export default connect(mapStateToProps)(Actions)
