import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    integration: PropTypes.string
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Project',
      method: 'post',
      action: '/api/admin/expenses/projects',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title', required: true },
            ...this._getIntegration()
          ]
        }
      ]
    }
  }

  _getIntegration() {
    if(this.props.integration === 'accpac') {
      return [
        { label: 'Main Project Code', name: 'integration.main_project_code', type: 'textfield', placeholder: 'Enter a main project code' },
        { label: 'Project Code', name: 'integration.project_code', type: 'textfield', placeholder: 'Enter a project code', required: true },
        { label: 'Program Code', name: 'integration.program_code', type: 'textfield', placeholder: 'Enter a program code', required: true },
        { label: 'Source Code', name: 'integration.source_code', type: 'textfield', placeholder: 'Enter a source code', required: true },
        { label: 'Match', name: 'integration.match', type: 'textfield', placeholder: 'Enter a match', required: true }
      ]
    }
    return []
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(project) {
    const { modal, router } = this.context
    modal.close()
    router.push(`/admin/expenses/projects/${project.id}`)
  }

}

export default New
