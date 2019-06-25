import CommitmentToken from '../../tokens/commitment_token'
import GoalToken from '../../tokens/goal_token'
import { Audit, List, Page, Comments } from 'maha-admin'
import SetCommitments from '../../components/commitments'
import SetGoals from '../../components/goals'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'
import Edit from './edit'

const Details = ({ plan }) => {

  const list = {}

  if(plan.status === 'pending') list.alert = { color: 'teal', message: 'This plan is pending' }

  if(plan.status === 'active') list.alert = { color: 'green', message: 'This plan is active' }

  if(plan.status === 'complete') list.alert = { color: 'blue', message: 'This plan is complete' }

  list.items = [
    { label: 'Supervisor', content: plan.supervisor.full_name },
    { label: 'Employee', content: plan.employee.full_name },
    { label: 'Due', content: moment(plan.due).format('MMMM DD, YYYY') },
    { component: <Audit entries={ plan.audit } /> }
  ]

  list.footer = <Comments entity={`competencies_plans/${plan.id}`} />

  return <List plan={ plan } { ...list } />

}

Details.propTypes = {
  plan: PropTypes.object
}

const Goals = ({ plan, goals }) => {

  const list = {
    items: goals.map(goal => ({
      content: goal,
      component: <GoalToken goal={ goal } />
    })),
    empty: {
      icon: 'trophy',
      title: 'No goals',
      text: 'There are no goals for this plan',
      button: {
        label: 'Manage Goals',
        modal: <SetGoals plan={ plan } goals={ goals } />
      }
    }
  }

  return <List { ...list } />

}

Goals.propTypes = {
  plan: PropTypes.object,
  goals: PropTypes.array
}

const Commitments = ({ plan, commitments } ) => {

  const list = {
    items: commitments.map(commitment => ({
      content: commitment,
      component: (commitment) => <CommitmentToken plan={ plan } commitment={ commitment } />,
      tasks: !commitment.is_complete && plan.status === 'active' ? [
        {
          label: 'Complete Commitment',
          request: {
            endpoint: `/api/admin/competencies/plans/${plan.id}/commitments/${commitment.id}/complete`,
            method: 'patch'
          }
        }
      ] : null
    })),
    empty: {
      icon: 'handshake-o',
      title: 'No commitments',
      text: 'There are no commitments for this plan',
      button: {
        label: 'Manage Commitments',
        modal: <SetCommitments plan={ plan } commitments={ commitments } />
      }
    }
  }

  return <List { ...list } />

}

Commitments.propTypes = {
  plan: PropTypes.object,
  commitments: PropTypes.array
}

const itemTasks = (user, plan, goals, commitments) => {

  const items = []

  items.push({ label: 'Edit Plan', modal: <Edit plan={ plan } /> })
  items.push({ label: 'Manage Goals', modal: <SetGoals plan={ plan } goals={ goals } /> })
  items.push({ label: 'Manage Commitments', modal: <SetCommitments plan={ plan } commitments={ commitments } /> })

  return { items }

}

const itemButtons = (user, plan) => {

  if(plan.status === 'pending' && plan.supervisor_id === user.id) {
    return [
      {
        color: 'green',
        text: 'Approve Plan',
        request: {
          endpoint: `/api/admin/competencies/plans/${plan.id}/approve`,
          method: 'patch'
        }
      }
    ]
  }

  if(plan.status === 'active' && plan.employee_id === user.id) {
    return [
      {
        color: 'green',
        text: 'Complete Plan',
        request: {
          endpoint: `/api/admin/competencies/plans/${plan.id}/complete`,
          method: 'patch'
        }
      }
    ]
  }

  return null
}

const mapResourcesToPage = (props, context) => ({
  plan: `/api/admin/competencies/plans/${props.params.id}`,
  goals: `/api/admin/competencies/plans/${props.params.id}/goals`,
  commitments: `/api/admin/competencies/plans/${props.params.id}/commitments`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Plan',
  tabs: {
    items: [
      { label: 'Details', component: <Details plan={ resources.plan } /> },
      { label: 'Goals', component: <Goals plan={ resources.plan } goals={ resources.goals } /> },
      { label: 'Commitments', component: <Commitments plan={ resources.plan } commitments={ resources.commitments } /> }
    ]
  },
  tasks: itemTasks(props.user, resources.plan, resources.goals, resources.commitments),
  buttons: itemButtons(props.user, resources.plan)
})

export default Page(mapResourcesToPage, mapPropsToPage)
