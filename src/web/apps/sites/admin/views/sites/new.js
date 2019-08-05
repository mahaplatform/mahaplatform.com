import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Site',
      method: 'post',
      action: '/api/admin/sites/sites',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield' },
            { label: 'Origins', name: 'origins', type: 'textarea' }
          ]
        },{
          label: 'Members',
          fields: [
            { label: 'Require Approval', name: 'requires_member_approval', type: 'checkbox' },
            { label: 'Allow Public Registration', name: 'has_public_member_submission', type: 'checkbox' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(site) {
    this.context.router.history.push(`/admin/sites/sites/${site.id}`)
    this.context.modal.close()
  }

}

export default New
