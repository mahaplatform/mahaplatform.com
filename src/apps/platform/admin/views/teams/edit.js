import { AuthenticationStrategyToken, Form } from 'maha-admin'
import Apps from '../../components/apps'
import PropTypes from 'prop-types'
import React from 'react'

class GroupsEdit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    team_id: PropTypes.number
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { team_id } = this.props
    return {
      title: 'Edit Team',
      method: 'patch',
      endpoint: `/api/admin/platform/teams/${team_id}/edit`,
      action: `/api/admin/platform/teams/${team_id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true, placeholder: 'Enter title' },
            { label: 'Team Name', name: 'subdomain', type: 'textfield', required: true, placeholder: 'Enter team name' },
            { label: 'Logo', name: 'logo_id', type: 'filefield', prompt: 'Choose Logo', multiple: false },
            { label: 'Apps', name: 'app_ids', type: Apps }
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

export default GroupsEdit
