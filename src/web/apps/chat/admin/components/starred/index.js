import { Infinite, Message } from 'maha-admin'
import * as selectors from './selectors'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'

class Starred extends React.Component {

  static contextTypes = {
  }

  static propTypes = {
    messages: PropTypes.array,
    onShowMessage: PropTypes.func
  }

  _handleShowMessage = this._handleShowMessage.bind(this)

  render() {
    return (
      <div className="chat-starred">
        <Infinite { ...this._getInfinite() } />
      </div>
    )
  }

  _getInfinite() {
    return {
      empty: () => <Message { ...this._getEmpty() } />,
      endpoint: '/api/admin/chat/starred',
      layout: (props) => <Results {...props} onShowMessage={ this._handleShowMessage } />,
      selectors
    }
  }

  _getEmpty() {
    return {
      icon: 'star',
      title: 'No Starred Messages',
      text: 'You have not starred any messages'
    }
  }

  _handleShowMessage(message) {
    this.props.onShowMessage(message)
  }

}

export default Starred
