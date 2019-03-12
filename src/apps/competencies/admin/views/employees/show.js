import PlanToken from '../../tokens/plan_token'
import { Avatar, List, Page } from 'maha-admin'
import EmployeePlanCreate from './create'
import PropTypes from 'prop-types'
import React from 'react'

const Plans = ({ employee, plans }) => {

  const list = {
    items: plans.map(plan => ({
      content: plan,
      component: PlanToken,
      link: `/admin/competencies/plans/${plan.id}`
    })),
    empty: {
      icon: 'list',
      title: 'No plans',
      text: 'There are no plans for this employee',
      button: {
        label: 'Create Plan',
        modal: <EmployeePlanCreate employee={ employee } />
      }
    }
  }

  return <List { ...list } />

}

Plans.propTypes = {
  employee: PropTypes.object,
  plans: PropTypes.object
}

const mapResourcesToPage = (props, context) => ({
  employee: `/api/admin/competencies/employees/${props.params.id}`,
  plans: `/api/admin/competencies/employees/${props.params.id}/plans`
})

const mapPropsToPage = (props, context, resources) => ( {
  title: resources.employee.full_name,
  tabs: {
    header: <Avatar user={ resources.employee } width="120" presence={ false } />,
    items: [
      { label: 'Plans', component: <Plans  { ...resources } /> }
    ]
  },
  tasks: {
    items: [
      { label: 'Create Plan', modal: <EmployeePlanCreate employee={ resources.employee } /> }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
