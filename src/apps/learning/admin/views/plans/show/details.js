import { Audit, List, Comments } from 'maha-admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

const Details = ({ plan }) => {

  const list = {}

  if(plan.status === 'pending') list.alert = { color: 'teal', message: 'This plan is pending' }

  if(plan.status === 'active') list.alert = { color: 'green', message: 'This plan is active' }

  if(plan.status === 'submitted') list.alert = { color: 'blue', message: 'This plan is submitted' }

  if(plan.status === 'completed') list.alert = { color: 'purple', message: 'This plan is complete' }

  list.items = [
    { label: 'Supervisor', content: plan.supervisor.full_name },
    { label: 'Employee', content: plan.employee.full_name },
    { label: 'Due', content: moment(plan.due).format('MMMM DD, YYYY') },
    { label: 'Reminders', content: <div>
      { !plan.remind_me_4_weeks && !plan.remind_me_2_weeks && !plan.remind_me_1_week && <span>NONE</span>}
      { plan.remind_me_4_weeks && <div>4 weeks before this plan is due</div> }
      { plan.remind_me_2_weeks && <div>2 weeks before this plan is due</div> }
      { plan.remind_me_1_week && <div>1 week before this plan is due</div> }
    </div> },
    { component: <Audit entries={ plan.audit } /> }
  ]

  list.footer = <Comments entity={`competencies_plans/${plan.id}`} />

  return <List plan={ plan } { ...list } />

}

Details.propTypes = {
  plan: PropTypes.object
}

export default Details
