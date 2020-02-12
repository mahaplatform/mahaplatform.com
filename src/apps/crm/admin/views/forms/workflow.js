import WorkflowDesigner from '../../components/workflow_designer'
import PropTypes from 'prop-types'
import { Page } from 'maha-admin'
import React from 'react'

class Designer extends React.Component {

  static propTypes = {
    form: PropTypes.object,
    workflow: PropTypes.object
  }

  render() {
    return <WorkflowDesigner { ...this._getWorkflowDesigner() } />
  }

  _getWorkflowDesigner() {
    const { form, workflow } = this.props
    return {
      endpoint: `/api/admin/crm/workflows/${workflow.id}`,
      fields: form.config.fields,
      trigger: {
        icon: 'check-square-o',
        text: 'Form is submitted'
      },
      workflow,
      onSave: this._handleSave
    }
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
