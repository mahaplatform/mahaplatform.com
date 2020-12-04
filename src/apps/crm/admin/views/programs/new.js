import BankToken from '@apps/finance/admin/tokens/bank'
import VisibilityToken from '../../tokens/visibility'
import { Form, UserToken } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    team: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { admin } = this.context
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
            { label: 'Logo', name: 'logo_id', type: 'attachmentfield', prompt: 'Choose Logo', multiple: false, allow: { extensions: ['jpg','jpeg','png','gif'] } },
            { label: 'Managers', name: 'manager_ids', type: 'lookup2', placeholder: 'Assign admin privileges', multiple: true, required: true, endpoint: '/api/admin/users', filter: { is_active: { $eq: true }}, value: 'id', text: 'full_name', format: UserToken, defaultValue: [admin.user.id] },
            { label: 'Visibility', name: 'visibility', type: 'radiogroup', options: ['public','private'], deselectable: false, format: VisibilityToken, defaultValue: 'public' }
          ]
        },  {
          label: 'Finance',
          fields: [
            { label: 'Bank', name: 'bank_id', type: 'lookup', placeholder: 'Choose a bank account', endpoint: '/api/admin/finance/banks', filter: { status: { $eq: 'active' } }, value: 'id', text: 'title', format: BankToken },
            { label: 'Invoice Address', name: 'address', type: 'textarea', rows: 2, defaultValue: admin.team.address }
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
