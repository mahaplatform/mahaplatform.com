import PropTypes from 'prop-types'
import Message from '../message'
import React from 'react'
import Date from '../channel/date'

class Results extends React.Component {

  static propTypes = {
    sorted: PropTypes.array,
    onShowMessage: PropTypes.func
  }

  _handleShowMessage = this._handleShowMessage.bind(this)

  render() {
    const { sorted } = this.props
    return (
      <div className="chat-search-results">
        { sorted.length > 0 &&
          <div className="chat-search-results-section">
            <div className="chat-search-results-section-body">
              { sorted.map((message, index) => [
                message.newday ? <Date date={ message.created_at } key={`date_${index}`} /> : null,
                <Message { ...this._getMessage(message) } key={`message_${message.id}`} />
              ])}
            </div>
          </div>
        }
      </div>
    )
  }

  _getMessage(message) {
    return {
      ...message,
      full: true,
      receipts: null,
      onShow: this._handleShowMessage.bind(this, message)
    }
  }

  _handleShowMessage(message) {
    this.props.onShowMessage(message)
  }

}

export default Results
