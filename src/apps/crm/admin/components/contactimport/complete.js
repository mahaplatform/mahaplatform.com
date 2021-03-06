import { ModalPanel, Message } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Complete extends React.Component {

  static propTypes = {
    onDone: PropTypes.func
  }

  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Message { ...this._getMessage() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Importing Complete'
    }
  }

  _getMessage() {
    return {
      title: 'Import Successful!',
      text: 'Great job! Your data was imported successfully.',
      icon: 'check',
      color: 'green',
      animation: 'tada',
      button: {
        label: 'Finish',
        handler: this._handleDone
      }
    }
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default Complete
