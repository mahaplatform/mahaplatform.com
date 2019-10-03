import { AuthenticationStrategyToken, Form } from 'maha-admin'
import Apps from '../../components/apps'
import PropTypes from 'prop-types'
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
            { label: 'Title', name: 'title', type: 'textfield', required: true },
            { label: 'Team Name', name: 'subdomain', type: 'textfield', required: true },
            { label: 'Authentication', name: 'authentication_strategy', type: 'lookup', placeholder: 'Choose a strategy', options: [{value:'local',text:'Maha'},{value:'cornell',text:'Cornell'},{value:'google',text:'Google'},{value:'ldap',text:'LDAP'}], required: true, defaultValue: 'local', format: AuthenticationStrategyToken }
          ]
        }, {
          label: 'Administrative User',
          fields: [
            { label: 'First Name', name: 'first_name', type: 'textfield', required: true },
            { label: 'Last Name', name: 'last_name', type: 'textfield', required: true },
            { label: 'Email', name: 'email', type: 'textfield', required: true }
          ]
        }, {
          label: 'Apps',
          fields: [
            { name: 'app_ids', type: Apps, required: true }
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
