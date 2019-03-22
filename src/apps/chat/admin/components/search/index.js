import ChannelToken from '../channel_token'
import MessageToken from '../message_token'
import { connect } from 'react-redux'
import { results } from './selectors'
import PropTypes from 'prop-types'
import React from 'react'

class SearchResults extends React.Component {

  static propTypes = {
    results: PropTypes.object
  }

  render() {
    const { results } = this.props
    return (
      <div className="chat-search-results">
        { results.channels.length > 0 &&
          <div className="chat-search-results-section">
            <div className="chat-search-results-section-header">
              Channels
            </div>
            <div className="chat-search-results-section-body">
              { results.channels.map(channel => (
                <ChannelToken { ...this._getChannel(channel) } key={ `result_channel_${channel.id}`} />
              ))}
            </div>
          </div>
        }
        { results.messages.length > 0 &&
          <div className="chat-search-results-section">
            <div className="chat-search-results-section-header">
              Messages
            </div>
            <div className="chat-search-results-section-body">
              { results.messages.map(message => (
                <div key={ `result_message_${message.id}`} className="chat-search-results-item" onClick={ this._handleChoose.bind(this, message.channel_id) }>
                  <MessageToken { ...message } />
                </div>
              ))}
            </div>
          </div>
        }
      </div>
    )
  }

  _getChannel(channel) {
    return {
      ...channel,
      onClick: this._handleChoose.bind(this, channel.id)
    }
  }

  _handleChoose(channel_id) {
    this.props.onChoose(channel_id)
  }

}

const mapStateToProps = (state, props) => ({
  results: results(state, props)
})

export const Results = connect(mapStateToProps)(SearchResults)
