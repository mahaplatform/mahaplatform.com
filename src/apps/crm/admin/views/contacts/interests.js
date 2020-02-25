import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Interests extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    filter: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        add to interests
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Add to Lists',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ]
    }
  }
  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.modal.close()
  }

}

export default Interests
