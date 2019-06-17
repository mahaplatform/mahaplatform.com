import PropTypes from 'prop-types'
import React from 'react'

class Header extends React.Component {

  static contextTypes = {}

  static propTypes = {
    description: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    subscriptions: PropTypes.array
  }

  render() {
    const { description, label, name } = this.props
    return (
      <div className="chat-channel-header">
        <div className="chat-channel-header-meta">
          <h3>{ name  || 'Private Conversation' }</h3>
          <p>{ description || `A private conversation with ${label}` }</p>
        </div>
      </div>
    )
  }

}

export default Header
