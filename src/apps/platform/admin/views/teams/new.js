import Apps from '../../components/apps'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object,
    platform: PropTypes.object,
    router: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Team',
      method: 'post',
      action: '/api/admin/platform/teams',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true, placeholder: 'Enter title' },
            { label: 'Team Name', name: 'subdomain', type: 'textfield', required: true, placeholder: 'Enter team name' },
            { label: 'Logo', name: 'logo_id', type: 'filefield', prompt: 'Choose Logo', multiple: false },
            { label: 'Administrative User', type: 'segment', fields: [
              { label: 'First Name', name: 'first_name', type: 'textfield', required: true, placeholder: 'Enter first name' },
              { label: 'Last Name', name: 'last_name', type: 'textfield', required: true, placeholder: 'Enter last name' },
              { label: 'Email', name: 'email', type: 'textfield', required: true, placeholder: 'Enter email' }
            ] },
            { label: 'Apps', name: 'app_ids', type: Apps }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.router.history.push(`/admin/platform/teams/${result.id}`)
    this.context.modal.close()
  }

}

export default New
