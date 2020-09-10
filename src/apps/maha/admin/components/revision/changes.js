import Releases from '../help/changelog/releases'
import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Changes extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    onReload: PropTypes.func
  }

  _handleClose = this._handleClose.bind(this)
  _handleReload = this._handleReload.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Releases />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Changelog',
      leftItems: [
        { icon: 'remove', handler: this._handleClose }
      ],
      buttons: [
        { label: 'Reload', color: 'red', handler: this._handleReload }
      ]
    }
  }

  _handleClose() {
    this.context.modal.close()
  }

  _handleReload() {
    this.props.onReload()
  }

}

export default Changes
