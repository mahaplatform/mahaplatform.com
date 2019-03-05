import { Avatar, List, Page, CompactUserToken } from 'maha-admin'
import AssignEmployees from './employees'
import PropTypes from 'prop-types'
import React from 'react'

const Employees = ({ supervisor, employees }) => {

  const list = {
    items: employees.map(employee => ({
      content: employee,
      component: <CompactUserToken { ...employee.user } />
    })),
    empty: {
      icon: 'user-circle',
      title: 'No employees',
      text: 'No employees have been assigned to this supervisor',
      button: {
        label: 'Manage Employees',
        modal: <AssignEmployees supervisor_id={ supervisor.id } />
      }
    },
    buttons: [
      {
        label: 'Manage Employees',
        color: 'blue',
        modal: <AssignEmployees supervisor_id={ supervisor.id } />
      }
    ]
  }

  return <List { ...list } />

}

Employees.propTypes = {
  employees: PropTypes.array,
  supervisor: PropTypes.object
}

const mapResourcesToPage = (props, context) => ({
  supervisor: `/api/admin/team/supervisors/${props.params.id}`,
  employees: `/api/admin/team/supervisors/${props.params.id}/users`
})

const mapPropsToPage = (props, context, resources) => ( {
  title: resources.supervisor.full_name,
  tabs: {
    header: <Avatar user={ resources.supervisor } width="120" />,
    items: [
      { label: 'Employees', component: <Employees supervisor={ resources.supervisor } employees={ resources.employees } /> }
    ]
  },
  tasks: {
    items: [
      { label: 'Manage Employees', modal: <AssignEmployees supervisor_id={ resources.supervisor.id } /> }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
