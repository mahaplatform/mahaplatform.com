import ProjectToken from '../../tokens/project'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    integration: PropTypes.string
  }

  state = {
    type: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Project',
      method: 'post',
      action: '/api/admin/finance/projects',
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title', required: true },
            { label: 'Type', name: 'type', type: 'lookup', placeholder: 'Choose a type', required: true, options: [{value:'basic',text:'Basic Project'},{value:'tax',text:'Tax Account'}], value: 'value', text: 'text' },
            ...this._getTypeFields()
          ]
        },
        ...this._getIntegration()
      ]
    }
  }

  _getTypeFields() {
    const { type } = this.state
    if(type !== 'basic') return []
    return [
      { label: 'Tax Account', name: 'tax_project_id', type: 'lookup', required: true , placeholder: 'Choose a project', endpoint: '/api/admin/finance/projects/tax', value: 'id', text: 'title', format: ProjectToken }
    ]
  }

  _getIntegration() {
    if(this.props.integration === 'accpac') {
      return [{
        label: 'ACCPAC Details',
        fields: [
          { label: 'County Project Code', name: 'integration.project_code', type: 'textfield', placeholder: 'Enter a county project code', required: true },
          { label: 'Main Project Code', name: 'integration.main_project_code', type: 'textfield', placeholder: 'Enter a main project code' },
          { label: 'Program Code', name: 'integration.program_code', type: 'textfield', placeholder: 'Enter a program code', required: true },
          { label: 'Source Code', name: 'integration.source_code', type: 'textfield', placeholder: 'Enter a source code', required: true },
          { label: 'Match', name: 'integration.match', type: 'textfield', placeholder: 'Enter a match', required: true }
        ]
      }]
    }
    return []
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChangeField(name, value) {
    if(name === 'type') {
      this.setState({
        type: value
      })
    }
  }

  _handleSuccess(project) {
    const { modal, router } = this.context
    modal.close()
    router.history.push(`/admin/finance/projects/${project.id}`)
  }

}

export default New
