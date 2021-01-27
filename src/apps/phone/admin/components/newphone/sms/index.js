import { ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class SMS extends React.Component {

  static contextTypes = {}

  static propTypes = {
    programs: PropTypes.array,
    program: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        sms
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Conversation',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _handleBack() {
    this.props.onPop()
  }

}

export default SMS
