import ProjectToken from '@apps/finance/admin/tokens/project'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'
import _ from 'lodash'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    integration: PropTypes.string,
    project: PropTypes.object
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
    const { project } = this.props
    return {
      title: 'Edit Project',
      method: 'patch',
      endpoint: `/api/admin/finance/projects/${project.id}/edit`,
      action: `/api/admin/finance/projects/${project.id}`,
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
      { label: 'Tax Account', name: 'tax_project_id', type: 'lookup', placeholder: 'Choose a project', endpoint: '/api/admin/finance/projects/tax', value: 'id', text: 'title', format: ProjectToken }
    ]
  }

  _getIntegration() {
    const { integration } = this.props
    if(_.includes(['accpac','accumatica'], integration)) {
      return [{
        label: integration === 'accpac' ? 'ACCPAC Details' : 'Accumatica Details',
        fields: [
          { label: 'Program Code', name: 'integration.program_code', type: 'textfield', placeholder: 'Enter a program code' },
          { label: 'Source Code', name: 'integration.source_code', type: 'textfield', placeholder: 'Enter a source code' },
          { label: 'Match', name: 'integration.match', type: 'textfield', placeholder: 'Enter a match' },
          { label: 'Main Project Code', name: 'integration.main_project_code', type: 'textfield', placeholder: 'Enter a main project code' },
          { label: 'County Project Code', name: 'integration.project_code', type: 'textfield', placeholder: 'Enter a county project code' }
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

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Edit
