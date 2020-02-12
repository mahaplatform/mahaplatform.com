import WorkflowDesigner from '../../components/workflow_designer'
import PropTypes from 'prop-types'
import { Page } from 'maha-admin'
import React from 'react'

class Designer extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    form: PropTypes.object,
    workflow: PropTypes.object
  }

  _handleSave = this._handleSave.bind(this)

  render() {
    return <WorkflowDesigner { ...this._getWorkflowDesigner() } />
  }

  _getWorkflowDesigner() {
    const { form, workflow } = this.props
    return {
      fields: form.config.fields,
      trigger: {
        icon: 'check-square-o',
        text: 'Form is submitted'
      },
      workflow,
      onSave: this._handleSave
    }
  }

  _handleSave(steps) {
    const { workflow } = this.props
    const { id } = workflow
    this.context.network.request({
      method: 'patch',
      endpoint: `/api/admin/crm/workflows/${id}`,
      body: { config: { steps } }
    })
  }

}

const mapResourcesToPage = (props, context) => ({
  form: `/api/admin/crm/forms/${props.params.id}`,
  workflow: `/api/admin/crm/forms/${props.params.id}/workflow`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Workflow',
  component: Designer
})

export default Page(mapResourcesToPage, mapPropsToPage)
