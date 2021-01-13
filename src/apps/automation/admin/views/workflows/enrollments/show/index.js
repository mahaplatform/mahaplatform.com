import { Page } from '@admin'
import Details from './details'
import React from 'react'

const getTabs = ({ actions, enrollment, workflow }) => ({
  items: [
    { label: 'Details', component: <Details actions={ actions } workflow={ workflow } enrollment={ enrollment } /> }
  ]
})

const getTasks = ({ enrollment, workflow }, { flash }) => ({
  items: [
    {
      label: 'Retry Enrollment',
      show: enrollment.status === 'failed',
      request: {
        endpoint: `/api/admin/automation/workflows/${workflow.id}/enrollments/${enrollment.id}/retry`,
        method: 'patch',
        onFailure: () => flash.set('error', 'Unable to retry enrollment'),
        onSuccess: () => flash.set('success', 'The enrollment has been queued for execution')
      }
    }, {
      label: 'Cancel Enrollment',
      confirm: 'Are you sure you want to cancel this enrollment?',
      show: enrollment.status === 'active',
      request: {
        endpoint: `/api/admin/automation/workflows/${workflow.id}/enrollments/${enrollment.id}/cancel`,
        method: 'patch',
        onFailure: () => flash.set('error', 'Unable to cancel enrollment'),
        onSuccess: () => flash.set('success', 'The enrollment has been canceled')
      }
    }
  ]
})

const mapResourcesToPage = (props, context) => ({
  actions: `/api/admin/automation/workflows/${props.params.workflow_id}/enrollments/${props.params.id}/actions`,
  workflow: `/api/admin/automation/workflows/${props.params.workflow_id}`,
  enrollment: `/api/admin/automation/workflows/${props.params.workflow_id}/enrollments/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Enrollment',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
