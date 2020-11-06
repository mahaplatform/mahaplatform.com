import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    site_id: PropTypes.string,
    id: PropTypes.string
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { site_id, id } = this.props
    return {
      title: 'Edit Type',
      method: 'patch',
      endpoint: `/api/admin/sites/sites/${site_id}/types/${id}/edit`,
      action: `/api/admin/sites/sites/${site_id}/types/${id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield' },
            { label: 'Description', name: 'description', type: 'textarea' },
            { label: 'Require Approval', name: 'requires_approval', type: 'checkbox' },
            { label: 'Allow Public Submission', name: 'has_public_submission', type: 'checkbox' }
          ]
        }
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

export default New
