import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import moment from 'moment'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Invoice',
      method: 'post',
      action: '/api/admin/finance/invoices',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Customer', name: 'contact_id', type: 'lookup', placeholder: 'Choose contact', endpoint: '/api/admin/crm/contacts', value: 'id', text: 'display_name', required: true },
            { label: 'Date', name: 'date', type: 'datefield', placeholder: 'Date', required: true, defaultValue: moment() },
            { label: 'Due', name: 'date', type: 'datefield', placeholder: 'Date', required: true, defaultValue: moment() }
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
