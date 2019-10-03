import TeamStrategyToken from '../../tokens/team_strategy'
import ExpenseStrategyToken from '../../tokens/expense_strategy'
import DriveStrategyToken from '../../tokens/drive_strategy'
import { UserToken, Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Disable extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    configuration: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    user: PropTypes.object
  }

  state = {
    drive_strategy: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { user } = this.props
    return {
      title: 'Disable User',
      method: 'patch',
      endpoint: `/api/admin/team/users/${user.id}/edit`,
      action: `/api/admin/team/users/${user.id}/disable`,
      onChangeField: this._handleChangeField,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Team', name: 'team_strategy', type: 'radiogroup', options: ['remove','nothing'], format: TeamStrategyToken, defaultValue: 'remove' },
            { label: 'Expenses', name: 'expenses_strategy', type: 'radiogroup', options: ['remove','nothing'], format: ExpenseStrategyToken, defaultValue: 'remove'  },
            { label: 'Drive', name: 'drive_strategy', type: 'radiogroup', options: ['nothing','transfer','delete'], format: DriveStrategyToken, defaultValue: 'nothing' },
            ...this._getDriveStrategy()
          ]
        }
      ]
    }
  }

  _getDriveStrategy() {
    const { drive_strategy } = this.state
    if(drive_strategy !== 'transfer') return []
    return [
      { label: 'Reassign Drive Items To', name: 'drive_to_user_id', type: 'lookup', placeholder: 'Choose a User', endpoint: '/api/admin/users', value: 'id', text: 'full_name', format: UserToken }
    ]
  }

  _handleChangeField(name, value) {
    if(name === 'drive_strategy') {
      this.setState({
        drive_strategy: value
      })
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Disable
