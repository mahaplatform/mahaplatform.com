import NotificationTypes from './notification_types'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Subscriptions extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Events',
      method: 'patch',
      endpoint: '/api/admin/account/notifications',
      action: '/api/admin/account/notifications/subscriptions',
      cancelIcon: 'chevron-left',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'ignored', endpoint: '/api/admin/account/notifications/types', type: NotificationTypes, scroll: false }
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

export default Subscriptions
