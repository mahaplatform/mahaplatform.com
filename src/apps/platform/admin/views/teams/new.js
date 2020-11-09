import Apps from '../../components/apps'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object,
    router: PropTypes.object
  }

  state = {
    data: {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { admin } = this.context
    return {
      title: 'New Team',
      method: 'post',
      action: '/api/admin/platform/teams',
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true, placeholder: 'Enter title' },
            { label: 'Team Name', name: 'subdomain', type: 'textfield', required: true, placeholder: 'Enter team name' },
            { label: 'Logo', name: 'logo_id', type: 'filefield', prompt: 'Choose Logo', multiple: false },
            { label: 'Administrative User', type: 'segment', fields: [
              { name: 'strategy', type: 'radiogroup', deselectable: false, required: true, options: [
                { value: 'self', text: `Assign to ${admin.user.full_name}` },
                { value: 'account', text: 'Assign to existing account' },
                { value: 'new', text: 'Create and assign to a new account' }
              ], defaultValue: 'self' },
              ...this._getStrategy()
            ] },
            { label: 'Apps', name: 'app_ids', type: Apps }
          ]
        }
      ]
    }
  }

  _getStrategy() {
    const { data } = this.state
    if(data.strategy === 'account') {
      return [
        { label: 'Account', name: 'account_id', type: 'lookup', required: true, placeholder: 'Choose an Account', endpoint: '/api/admin/platform/accounts', value: 'id', text: 'rfc822' }
      ]
    }
    if(data.strategy === 'new') {
      return [
        { label: 'First Name', name: 'first_name', type: 'textfield', required: true, placeholder: 'Enter first name' },
        { label: 'Last Name', name: 'last_name', type: 'textfield', required: true, placeholder: 'Enter last name' },
        { label: 'Email', name: 'email', type: 'textfield', required: true, placeholder: 'Enter email' }
      ]
    }
    return []
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChange(data) {
    this.setState({ data })
  }

  _handleSuccess(result) {
    this.context.router.history.push(`/platform/teams/${result.id}`)
    this.context.modal.close()
  }

}

export default New
