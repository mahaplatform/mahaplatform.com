import ProgramToken from '../../tokens/program'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    type: PropTypes.string
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { type } = this.props
    return {
      title: 'New Template',
      method: 'post',
      action: '/api/admin/crm/templates',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { type: 'hidden', name: 'type', defaultValue: type },
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

  _handleSuccess(result) {
    this.context.router.history.push(`/admin/crm/templates/${result.id}`)
    this.context.modal.close()
  }

}

export default New
