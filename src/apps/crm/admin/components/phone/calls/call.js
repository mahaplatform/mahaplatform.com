import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Call extends React.Component {

  static propTypes = {
    call: PropTypes.object,
    onPop: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        call
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Call',
      color: 'violet',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _handleBack() {
    this.props.onPop()
  }

}

export default Call
