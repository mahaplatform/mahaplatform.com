import ExpenseTypeToken from '../../tokens/expense_type_token'
import ProjectToken from '../../tokens/project_token'
import VendorToken from '../../tokens/vendor_token'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import moment from 'moment'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    token: PropTypes.string
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { token } = this.props
    return {
      title: 'New Expense',
      method: 'post',
      action: '/api/admin/expenses/expenses',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Date', name: 'date', type: 'datefield', required: true, defaultValue: moment().format('YYYY-MM-DD') },
            { label: 'Description', name: 'description', required: true, placeholder: 'Describe the expense', type: 'textfield' },
            { label: 'Amount', name: 'amount', required: true, placeholder: 'Enter the amount', type: 'moneyfield' },
            { label: 'Receipt', name: 'receipt_ids', type: 'filefield', multiple: true, prompt: 'Upload Receipt', action: '/api/admin/assets/upload', endpoint: '/api/admin/expenses/receipts', token },
            { label: 'Project', name: 'project_id', type: 'lookup', placeholder: 'Choose a project', endpoint: '/api/admin/expenses/memberships', value: 'id', text: 'title', format: ProjectToken },
            { label: 'Expense Type', name: 'expense_type_id', type: 'lookup', placeholder: 'Choose an expense type', endpoint: '/api/admin/expenses/expense_types/active', value: 'id', text: 'title', format: ExpenseTypeToken },
            { label: 'Vendor', name: 'vendor_id', type: 'lookup', placeholder: 'Choose a vendor', endpoint: '/api/admin/expenses/vendors', value: 'id', text: 'name', form: this._getVendorForm(), format: VendorToken },
            { label: 'Account', name: 'account_id', type: 'lookup', placeholder: 'Choose an account', endpoint: '/api/admin/expenses/accounts', value: 'id', text: 'name' }
          ]
        }
      ]
    }
  }

  _getVendorForm() {
    return {
      title: 'New Vendor',
      method: 'post',
      action: '/api/admin/expenses/vendors',
      sections: [
        {
          fields: [
            { label: 'Name', name: 'name', type: 'textfield' },
            { label: 'Address 1', name: 'address_1', type: 'textfield' },
            { label: 'Address 2', name: 'address_2', type: 'textfield' },
            { label: 'City', name: 'city', type: 'textfield' },
            { label: 'State', name: 'state', type: 'textfield' },
            { label: 'Zip', name: 'zip', type: 'textfield' }
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

const mapStateToProps = (state, props) => ({
  token: state.maha.admin.team.token
})

export default connect(mapStateToProps)(New)
