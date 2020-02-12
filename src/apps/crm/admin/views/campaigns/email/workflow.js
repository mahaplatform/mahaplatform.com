import WorkflowDesigner from '../../../components/workflow_designer'
import PropTypes from 'prop-types'
import { Page } from 'maha-admin'
import React from 'react'

class Designer extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    campaign: PropTypes.object,
    workflow: PropTypes.object
  }

  _handleSave = this._handleSave.bind(this)

  render() {
    return <WorkflowDesigner { ...this._getWorkflowDesigner() } />
  }

  _getWorkflowDesigner() {
    const { campaign, workflow } = this.props
    return {
      fields: [],
      trigger: {
        icon: 'paper-plane',
        text: 'Email is sent'
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
  campaign: `/api/admin/crm/campaigns/email/${props.params.id}`,
  workflow: `/api/admin/crm/campaigns/email/${props.params.id}/workflow`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Workflow',
  component: Designer
})

export default Page(mapResourcesToPage, mapPropsToPage)
