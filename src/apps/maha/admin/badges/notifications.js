import { ModalPanel } from '@admin'
import Notifications from '../components/notifications/page'
import PropTypes from 'prop-types'
import React from 'react'

class NotificationsPanel extends React.Component {

  static contextTypes = {
    portal: PropTypes.object
  }

  _handleClose = this._handleClose.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Notifications { ...this.props }/>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Notifications',
      leftItems: [
        { icon: 'remove', handler: this._handleClose, tooltip: {
          title: 'Close Notifications',
          position: 'bottom left'
        } }
      ]
    }
  }

  _handleClose() {
    this.context.portal.closeSidebar()
  }

}

export default NotificationsPanel
