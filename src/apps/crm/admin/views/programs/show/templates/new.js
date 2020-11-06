import TemplateField from '../../../../components/templatefield'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    program_id: PropTypes.number,
    type: PropTypes.string
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { program_id } = this.props
    return {
      title: 'New Template',
      method: 'post',
      action: `/api/admin/crm/programs/${program_id}/templates`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter the title', required: true },
            { label: 'Starter Template', name: 'template_id', type: TemplateField, program_id }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    const { program_id } = this.props
    this.context.router.history.push(`/crm/programs/${program_id}/templates/${result.id}`)
    this.context.modal.close()
  }

}

export default New
