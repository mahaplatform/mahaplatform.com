import GoalToken from '../../../tokens/goal'
import SetGoals from '../../../components/goals'
import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'

const Goals = ({ user, plan, goals }) => {

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
        label: 'Set Goals',
        modal: <SetGoals plan={ plan } goals={ goals } />
      }
    },
    buttons: goals.length > 0 && plan.status !== 'completed' && (plan.status === 'pending' || user.id === plan.supervisor_id) ? [
      { label: 'Set Goals', color: 'blue', modal: <SetGoals plan={ plan } goals={ goals } /> }
    ]: null
  }

  return <List { ...list } />

}

Goals.propTypes = {
  plan: PropTypes.object,
  goals: PropTypes.array,
  user: PropTypes.object
}

export default Goals
