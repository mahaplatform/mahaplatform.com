import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import Status from './status'
import React from 'react'
import Mute from './mute'

class DoNotDisturb extends React.Component {

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
    return {
      title: 'Do Not Disturb',
      method: 'patch',
      endpoint: '/api/admin/account/notifications',
      action: '/api/admin/account/notifications/do_not_disturb',
      cancelText: <i className="fa fa-chevron-left" />,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Notification Status', name: 'notifications_enabled', instructions: 'You can temporarily disable all notifications at any time', type: Status },
            { label: 'Quiet Time', name: 'mute', instructions: 'We support your work/life balance! If you enable desktop, mobile push, or sound notifications, we can mute them during any hours you would not like to receive notifications. You will still receive notifications via email', type: Mute }
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
export default DoNotDisturb
