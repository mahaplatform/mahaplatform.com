import ProgramToken from '../../tokens/program'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    program_id: PropTypes.number
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Form',
      method: 'post',
      action: '/api/admin/crm/forms',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Program', name: 'program_id', type: 'lookup', endpoint: '/api/admin/crm/programs', value: 'id', text: 'title', required: true, format: ProgramToken },
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter the title', required: true }
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
