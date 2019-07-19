import TrainingTypeToken from '../../tokens/training_type_token'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  state = {
    type: null
  }

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Training',
      method: 'post',
      action: '/api/admin/training/trainings',
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true },
            { label: 'Description', name: 'description', type: 'textarea', required: true },
            { label: 'Type', name: 'type', type: 'lookup', search: false, options: ['local','remote','online','maha'], format: TrainingTypeToken, required: true },
            ...this._getTypeFields()
          ]
        }
      ]
    }
  }

  _getTypeFields() {
    const { type } = this.state
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

  _handleChangeField(name, value) {
    if(name === 'type') {
      this.setState({
        type: value
      })
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.router.push(`/admin/training/trainings/${result.id}`)
    this.context.modal.close()
  }

}

export default New
