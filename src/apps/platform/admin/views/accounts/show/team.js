import { TeamToken, Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Team extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    account: PropTypes.object
  }

  state = {
    account: {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { account } = this.props
    return {
      title: 'Add Team',
      method: 'post',
      action: `/api/admin/platform/accounts/${account.id}/teams`,
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Team', name: 'team_id', type: 'lookup', endpoint: `/api/admin/platform/accounts/${account.id}/teams/available`, value: 'id', text: 'title', required: true, format: TeamToken },
            ...this._getRoles()
          ]
        }
      ]
    }
  }

  _getRoles() {
    const { account } = this.state
    if(!account.team_id) return []
    return [
      { label: 'Roles', name: 'role_ids', type: 'lookup2', placeholder: 'Assign roles', multiple: true, endpoint: `/api/admin/platform/accounts/${this.props.account.id}/teams/${account.team_id}/roles`, value: 'id', text: 'title' }
    ]
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChange(account) {
    this.setState({ account })
  }

  _handleSuccess(result) {
    this.context.modal.close()
  }

}

export default Team
