import React from 'react'
import PropTypes from 'prop-types'
import { Form } from '@admin'

class Edit extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    training: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { training } = this.props
    return {
      title: 'Edit Training',
      method: 'patch',
      endpoint: `/api/admin/training/trainings/${training.id}/edit`,
      action: `/api/admin/training/trainings/${training.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true },
            { label: 'Description', name: 'description', type: 'textarea', required: true },
            ...this._getTypeFields()
          ]
        }
      ]
    }
  }

  _getTypeFields() {
    const { type } = this.props.training
    if(type === 'local') {
      return [
        { label: 'Materials', name: 'asset_ids', type: 'attachmentfield', multiple: true }
      ]
    } else if(type === 'remote') {
      return [
        { label: 'URL', name: 'url', type: 'textfield', placeholder: 'Enter a url fo this training' },
        { label: 'Location', name: 'location', type: 'textfield', placeholder: 'Enter location of the training' },
        { label: 'Contact', name: 'contact', type: 'textfield', placeholder: 'Enter contact information for the responsible party' }
      ]
    } else if(type === 'online') {
      return [
        { label: 'URL', name: 'url', type: 'textfield', placeholder: 'Enter the url to the online training' },
        { label: 'Notes', name: 'notes', type: 'textarea', placeholder: 'Enter any addition instructions' },
        { label: 'Is Verification Required', name: 'is_verification_required', type: 'checkbox' }
      ]
    } else if(type === 'managed') {
      return []
    }
    return []
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Edit
