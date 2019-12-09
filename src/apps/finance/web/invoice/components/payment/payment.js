import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import React from 'react'

class Payment extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {}

  _handleCancel = this._handleCancel.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="payment">
          payment
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Make Payment',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

}

export default Payment
