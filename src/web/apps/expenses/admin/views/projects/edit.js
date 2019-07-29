import ProjectToken from '../../tokens/project'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    integration: PropTypes.string,
    project: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { project } = this.props
    return {
      title: 'Edit Project',
      method: 'patch',
      endpoint: `/api/admin/expenses/projects/${project.id}/edit`,
      action: `/api/admin/expenses/projects/${project.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title', required: true },
            { label: 'Tax Project', name: 'tax_project_id', type: 'lookup', required: true , placeholder: 'Choose a project', endpoint: '/api/admin/expenses/projects', value: 'id', text: 'title', format: ProjectToken },
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

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Edit
