import { ModalPanel } from 'maha-public'
import PropTypes from 'prop-types'
import React from 'react'

class Card extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {}

  _handleCancel = this._handleCancel.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        card
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ],
      title: 'Pay with Credit Card'
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

}

export default Card
