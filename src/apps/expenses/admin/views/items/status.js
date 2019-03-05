import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Status extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    item_id: PropTypes.number,
    item_type: PropTypes.string
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { item_type, item_id } = this.props
    return {
      title: 'Revert Status',
      method: 'patch',
      endpoint: `/api/admin/expenses/${item_type}s/${item_id}/edit`,
      action: `/api/admin/expenses/${item_type}s/${item_id}/status`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Status', name: 'status_id', type: 'lookup', endpoint: '/api/admin/expenses/statuses', value: 'id', text: 'text', sort: 'id' }
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

export default Status
