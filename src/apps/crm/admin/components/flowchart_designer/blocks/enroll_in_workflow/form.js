import { Container, Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class EnrollInWorkflow extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    workflows: PropTypes.array,
    program: PropTypes.object,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config, workflows } = this.props
    return {
      title: 'Enroll in Workflow',
      onChange: this._handleChange,
      onCancel: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          fields: [
            { label: 'Workflow', name: 'workflow_id', type: 'lookup', options: workflows, value: 'id', text: 'title', required: true, defaultValue: config.workflow_id }
          ]
        }
      ]
    }
  }

  _handleChange(config) {
    this.props.onChange(config)
  }

  _handleDone() {
    this.props.onDone()
  }

}

const mapResources = (props, context) => ({
  workflows: {
    endpoint: '/api/admin/crm/workflows',
    filter: {
      $and: [
        { program_id: { $eq: props.workflow.program.id } },
        { id: { $neq: props.workflow.id } }
      ]
    }
  }
})

export default Container(mapResources)(EnrollInWorkflow)
