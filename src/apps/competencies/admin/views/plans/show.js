import CommitmentToken from '../../components/commitment_token'
import GoalToken from '../../components/goal_token'
import { List, Page, Comments } from 'maha-admin'
import SetCommitments from './commitment'
import PropTypes from 'prop-types'
import SetGoals from './goals'
import moment from 'moment'
import React from 'react'

const Details = ({ plan }) => {

  const list = {
    items: [
      { label: 'Supervisor', content: plan.supervisor.full_name },
      { label: 'Due', content: moment(plan.due).format('MMMM DD, YYYY') },
      { label: 'Created', content: moment(plan.created_at).format('MMMM DD, YYYY') }
    ]
  }

  if(plan.status === 'pending') list.alert = { color: 'grey', message: 'This plan is pending' }

  if(plan.status === 'active') list.alert = { color: 'green', message: 'This plan is active' }

  if(plan.status === 'complete') list.alert = { color: 'red', message: 'This plan is complete' }

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
      component: <GoalToken plan={ plan } goal={ goal } />
    })),
    empty: {
      icon: 'star',
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
  tasks: resources.plan.status === 'pending' ? {
    items: [
      { label: 'Manage Goals', modal: <SetGoals plan={ resources.plan } goals={ resources.goals } /> },
      { label: 'Manage Commitments', modal: <SetCommitments plan={ resources.plan } commitments={ resources.commitments } /> }
    ]
  } : null
})

export default Page(mapResourcesToPage, mapPropsToPage)
