import { Star } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Header extends React.Component {

  static contextTypes = {
  }

  static propTypes = {
    id: PropTypes.number,
    is_starred: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    subscriptions: PropTypes.array,
    onInfo: PropTypes.func
  }

  _handleInfo = this._handleInfo.bind(this)

  render() {
    const { description, id, label, name } = this.props
    return (
      <div className="chat-channel-header">
        <div className="chat-channel-header-meta">
          <h3>{ name  || 'Private Conversation' }</h3>
          <p>{ description || `A private conversation with ${label}` }</p>
        </div>
        { id &&
          <div className="chat-channel-header-tasks">
            <ul>
              <li>
                <Star { ...this._getStar() } />
              </li>
              <li>
                <div className="chat-channel-header-info" onClick={ this._handleInfo }>
                  <i className="fa fa-fw fa-info-circle" />
                </div>
              </li>
            </ul>
          </div>
        }
      </div>
    )
  }

  _getStar() {
    const { id, is_starred } = this.props
    return {
      id,
      is_starred,
      label: 'channel',
      table: 'chat_channels'
    }
  }

  _handleInfo() {
    this.props.onInfo()
  }

}

export default Header
