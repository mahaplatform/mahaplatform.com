import { Message } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Question extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {}

  static defaultProps = {}

  _handleDone = this._handleDone.bind(this)

  render() {
    return <Message { ...this._getMessage() } />
  }

  _getButton() {
    return {
      label: 'Close Window',
      className: 'ui white basic button',
      handler: this._handleDone
    }
  }

  _getMessage() {
    return {
      backgroundColor: 'green',
      title: 'Thank You!',
      text: 'We\'ve received your feedback',
      icon: 'thumbs-up',
      button: {
        label: 'Close Window',
        handler: this._handleDone
      }
    }
  }

  _handleDone() {
    this.context.modal.close()
  }

}

export default Question
