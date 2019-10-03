import SetCommitments from '../../../components/commitments'
import SetGoals from '../../../components/goals'
import Commitments from './commitments'
import { Page } from 'maha-admin'
import Details from './details'
import Goals from './goals'
import Edit from '../edit'
import React from 'react'

const getTabs = (user, { plan, goals, commitments }) => {

  const items = [
    { label: 'Details', component: <Details plan={ plan } /> },
    { label: 'Goals', component: <Goals user={ user } plan={ plan } goals={ goals } /> },
    { label: 'Commitments', component: <Commitments user={ user } plan={ plan } commitments={ commitments } /> }
  ]

  return { items }

}

const getTasks = (user, { plan, goals, commitments }) => {

  const items = []

  if(plan.status !== 'completed' && (plan.status === 'pending' || user.id === plan.supervisor_id)) {
    items.push({ label: 'Edit Plan', modal: <Edit plan={ plan } /> })
  }
  if(goals.length > 0 && plan.status !== 'completed' && (plan.status === 'pending' || user.id === plan.supervisor_id)) {
    items.push({ label: 'Set Goals', modal: <SetGoals plan={ plan } goals={ goals } /> })
  }
  if(commitments.length > 0 && plan.status !== 'completed' && (plan.status === 'pending' || user.id === plan.supervisor_id)) {
    items.push({ label: 'Make Commitments', modal: <SetCommitments plan={ plan } commitments={ commitments } /> })
  }

  return items.length > 0 ? { items } : null

}

const itemButtons = (user, { plan, goals, commitments }) => {

  if(plan.status === 'pending' && plan.supervisor_id === user.id && goals.length > 0 && commitments.length > 0) {
    return [{
      color: 'green',
      text: 'Approve Plan',
      request: {
        endpoint: `/api/admin/learning/plans/${plan.id}/approve`,
        method: 'patch'
      }
    }]
  }

  if(plan.status === 'active' && plan.employee_id === user.id) {
    return [{
      color: 'blue',
      text: 'Submit Plan',
      request: {
        endpoint: `/api/admin/learning/plans/${plan.id}/submit`,
        method: 'patch'
      }
    }]
  }

  if(plan.status === 'submitted' && plan.supervisor_id === user.id) {
    return [{
      color: 'red',
      text: 'Reopen Plan',
      request: {
        endpoint: `/api/admin/learning/plans/${plan.id}/reopen`,
        method: 'patch'
      }
    },{
      color: 'purple',
      text: 'Complete Plan',
      request: {
        endpoint: `/api/admin/learning/plans/${plan.id}/complete`,
        method: 'patch'
      }
    }]
  }

  return null
}

const mapResourcesToPage = (props, context) => ({
  plan: `/api/admin/learning/plans/${props.params.id}`,
  goals: `/api/admin/learning/plans/${props.params.id}/goals`,
  commitments: `/api/admin/learning/plans/${props.params.id}/commitments`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Plan',
  tabs: getTabs(props.user, resources),
  tasks: getTasks(props.user, resources),
  buttons: itemButtons(props.user, resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
