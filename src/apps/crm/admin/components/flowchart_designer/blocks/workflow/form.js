import { Container, Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Workflow extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    workflows: PropTypes.array,
    workflow: PropTypes.object,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func,
    onTokens: PropTypes.func
  }

  form = null

  state = {
    config: {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    this.setState({
      config: {
        ...this.props.config || {}
      }
    })
  }

  _getForm() {
    const { workflow } = this.props
    const { config } = this.state
    return {
      reference: node => this.form = node,
      title: 'Update Workflows',
      onChange: this._handleChange,
      onCancel: this._handleCancel,
      onSubmit: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleSubmit }
      ],
      sections: [
        {
          fields: [
            { label: 'Workflow', name: 'workflow_id', type: 'lookup', prompt: 'Choose a workflow', endpoint: '/api/admin/crm/workflows', value: 'id', text: 'title', form: this._getWorkflowForm() }
          ]
        }
      ]
    }
  }

  _getWorkflowForm() {
    return {
      title: 'New Workflow',
      method: 'post',
      action: '/api/admin/crm/workflows',
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(config) {
    this.setState({ config })
  }

  _handleDone(config) {
    const { workflows } = this.props
    const workflow = _.find(workflows, { id: config.workflow_id })
    this.props.onDone({
      ...config,
      workflow: workflow ? {
        id: workflow.id,
        title: workflow.title
      } : null
    })
  }

  _handleSubmit() {
    this.form.submit()
  }

}
const mapResources = (props, context) => ({
  workflows: '/api/admin/crm/workflows'
})

export default Container(mapResources)(Workflow)
