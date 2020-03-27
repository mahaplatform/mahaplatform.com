import Scanner from '../../../components/scanner'
import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Scan extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    event: PropTypes.object,
    session: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() } >
        <Scanner { ...this._getScanner() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Scan Tickets',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ]
    }
  }

  _getScanner() {
    const { event, session } = this.props
    return {
      endpoint: `/api/admin/events/events/${event.id}/sessions/${session.id}/attendings`
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

}

export default Scan
