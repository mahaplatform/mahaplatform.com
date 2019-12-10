import { AuthenticationStrategyToken, Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Edit extends React.Component {

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
      title: 'Edit Team',
      method: 'patch',
      endpoint: '/api/admin/team/settings/edit',
      action: '/api/admin/team/settings',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Title', required: true },
            { label: 'Team Name', name: 'subdomain', type: 'textfield', placeholder: 'Subdomain', required: true },
            { label: 'Authentication', name: 'authentication_strategy', type: 'lookup', placeholder: 'Choose a strategy', options: [{value:'local',text:'Maha'},{value:'cornell',text:'Cornell'},{value:'google',text:'Google'},{value:'ldap',text:'LDAP'}], required: true, format: AuthenticationStrategyToken },
            { label: 'Logo', name: 'logo_id', type: 'filefield', prompt: 'Choose Logo', multiple: false },
            { label: 'Invoice Address', name: 'address', type: 'textarea', rows: 2, required: true }
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

export default Edit
