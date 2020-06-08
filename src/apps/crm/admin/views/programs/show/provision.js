import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Provision extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    program: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { program } = this.props
    return {
      title: 'Provision Phone Number',
      method: 'post',
      action: `/api/admin/crm/programs/${program.id}/phone_number`,
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

export default Provision
