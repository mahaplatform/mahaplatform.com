import ExpenseTypeToken from '@apps/finance/admin/tokens/expense_type'
import ProjectToken from '@apps/finance/admin/tokens/project'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  state = {
    data: {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'Edit Settings',
      method: 'patch',
      endpoint: '/api/admin/apps/finance/settings',
      action: '/api/admin/apps/finance/settings',
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Accouting Platform', name: 'settings.integration', type: 'lookup', placeholder: 'Choose platform', options: [ { value: 'accpac', text: 'ACCPAC' }, { value: 'accumatica', text: 'Accumatica' }], value: 'value', text: 'text' }
          ]
        },
        ...this._getIntegration()
      ]
    }
  }

  _getIntegration() {
    const { data } = this.state
    if(data['settings.integration'] === 'accumatica') {
      return [
        {
          label: 'Credit Card Processing',
          fields: [
            { label: 'Project', name: 'settings.fee_project_id', type: 'lookup', placeholder: 'Choose a Project', endpoint: '/api/admin/finance/projects', value: 'id', text: 'display', required: true, format: ProjectToken },
            { label: 'Expense Type', name: 'settings.fee_expense_type_id', type: 'lookup', placeholder: 'Choose a Expense Type', endpoint: '/api/admin/finance/expense_types', value: 'id', text: 'display', required: true, format: ExpenseTypeToken, defaultValue: 55 }
          ]
        }
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

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Edit
