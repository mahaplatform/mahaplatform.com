import VisibilityToken from '../../tokens/visibility'
import { Form, UserToken } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Program',
      method: 'post',
      action: '/api/admin/crm/programs',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true },
            { label: 'Logo', name: 'logo_id', type: 'filefield', prompt: 'Choose Logo', multiple: false },
            { label: 'Managers', name: 'manager_ids', type: 'lookup2', placeholder: 'Assign admin privileges', multiple: true, endpoint: '/api/admin/users', value: 'id', text: 'full_name', format: UserToken },
            { label: 'Visibility', name: 'visibility', type: 'radiogroup', options: ['public','private'], format: VisibilityToken, defaultValue: 'public' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default New
