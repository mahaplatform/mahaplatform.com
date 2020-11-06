import { devices, desktops, mobiles } from '../selectors'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import Desktop from './desktop'
import Sounds from './sounds'
import Email from './email'
import InApp from './inapp'
import React from 'react'
import Push from './push'

class Preferences extends React.Component {

  static contextTypes = {
    device: PropTypes.object,
    host: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    device: PropTypes.object,
    devices: PropTypes.array,
    desktops: PropTypes.array,
    mobiles: PropTypes.array
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { device } = this.props
    const isSupported = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window
    const dektop_notifications = device.platform !== 'cordova' && isSupported
    const push_notifications = device.platform === 'cordova' && isSupported
    return {
      title: 'Preferences',
      method: 'patch',
      endpoint: '/api/admin/account/notifications',
      action: '/api/admin/account/notifications/preferences',
      cancelIcon: 'chevron-left',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'In-App Notifications', name: 'in_app_notifications_enabled', instructions: 'If you have Maha open, but are not looking at the appropriate page, we can display an in-app notification to the top of the screen', type: InApp },
            { label: 'Notification Sound', name: 'sounds', instructions: 'If you have Maha closed or this window is inactive, we can play a sound', type: Sounds },
            ...dektop_notifications ? [{ label: 'Push Notifications', name: 'push_notifications_enabled', instructions: 'If you do not have Maha open or the window is not active, we can push desktop notifications to your laptop or computer', type: Desktop }] : [],
            ...push_notifications ? [{ label: 'Push Notifications', name: 'push_notifications_enabled', instructions: 'If you do not have the app open, we can send push notifications to your mobile device', type: Push }] : [],
            { label: 'Email Notifications', name: 'email_notifications_method', instructions: 'If we are unable to notify you any other way, we can send you notifications by email. Please indicate how often you would like to receive them', type: Email }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.pop()
  }

  _handleSuccess() {
    this.context.modal.pop()
  }

}

const mapStateToProps = (state, props) => ({
  device: state.maha.device,
  devices: devices(state, props),
  desktops: desktops(state, props),
  mobiles: mobiles(state, props)
})

export default connect(mapStateToProps)(Preferences)
