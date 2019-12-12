import { ModalPanel } from 'maha-public'
import PropTypes from 'prop-types'
import React from 'react'

class ACH extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    onBack: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        bank account
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      title: 'Bank Account'
    }
  }

  _handleBack() {
    this.props.onBack()
  }

}

export default ACH
