import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'

class Merge extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    id: PropTypes.number
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { id } = this.props
    return {
      title: 'Merge Vendors',
      method: 'patch',
      action: `/api/admin/expenses/vendors/${id}/merge`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      saveText: 'Merge',
      sections: [
        {
          fields: [
            { label: 'Merge Into', name: 'vendor_id', type: 'lookup', endpoint: '/api/admin/expenses/vendors', value: 'id', text: 'name' }
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

export default Merge
