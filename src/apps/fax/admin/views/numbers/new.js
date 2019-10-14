import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Number',
      method: 'post',
      action: '/api/admin/fax/numbers',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      saveText: 'Provision',
      sections: [
        {
          fields: [
            { label: 'Number', name: 'number', type: 'phonenumberfield', required: true }
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
