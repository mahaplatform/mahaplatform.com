import NumberField from '../../components/numberfield'
import { Form, ProgramToken } from 'maha-admin'
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
      action: '/api/admin/team/phone_numbers',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      saveText: 'Provision',
      sections: [
        {
          fields: [
            { label: 'Type', name: 'type', type: 'radiogroup', options: [{ value: 'voice', text: 'Voice / SMS' },{ value: 'fax', text: 'Fax' }], required: true, defaultValue: 'voice' },
            { label: 'Program', name: 'program_id', type: 'lookup', endpoint: '/api/admin/programs', value: 'id', text: 'title', required: true, format: ProgramToken },
            { label: 'Number', name: 'number', type: NumberField, required: true }
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
