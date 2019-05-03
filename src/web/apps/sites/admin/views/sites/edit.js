import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    site_id: PropTypes.string
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { site_id } = this.props
    return {
      title: 'Edit Site',
      method: 'patch',
      endpoint: `/api/admin/sites/sites/${site_id}`,
      action: `/api/admin/sites/sites/${site_id}`,
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
    this.context.modal.close()
  }

}

export default Edit
