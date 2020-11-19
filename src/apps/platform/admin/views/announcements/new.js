import ToField from '@apps/platform/admin/components/tofield'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class New extends React.PureComponent {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    user: PropTypes.object,
    onBack: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Announcement',
      method: 'post',
      action: '/api/admin/platform/announcements',
      onCancel: this._handleBack,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title for this campaign', required: true },
            { label: 'To', name: 'to', type: ToField },
            { label: 'Subject', name: 'subject', type: 'textfield', emojis: true, placeholder: 'Enter a subject', required: true }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleSuccess(announcement) {
    this.context.router.history.push(`/platform/announcements/${announcement.id}`)
    this.context.modal.close()
  }

}

export default New
