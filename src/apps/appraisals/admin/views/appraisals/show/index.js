import SupervisorForm from '../supervisor'
import EmployeeForm from '../employee'
import Supervisor from './supervisor'
import { Page } from '@admin'
import Employee from './employee'
import Coaching from './coaching'
import Details from './details'
import React from 'react'

const getTabs = ({ user }, { appraisal }) => {

  const items = [
    { label: 'Details', component: <Details appraisal={ appraisal } /> },
    { label: 'Employee', component: <Employee appraisal={ appraisal } /> },
    { label: 'Supervisor', component: <Supervisor appraisal={ appraisal } /> },
    { label: 'Coaching', component: <Coaching appraisal={ appraisal } /> }
  ]

  return { items }

}

const getTasks = ({ team, user }, { appraisal }) => {

  const items = [
    { label: 'Edit Employee Appraisal', modal: <EmployeeForm appraisal={ appraisal } /> },
    { label: 'Edit Supervisor Appraisal', modal: <SupervisorForm appraisal={ appraisal } /> },
    { label: 'Download Appraisal', handler: () => {
      window.location = `/api/admin/appraisals/appraisals/${appraisal.id}/download?token=${team.token}`
    } }
  ]

  return { items }

}

const getButtons = ({ user }, { appraisal }) => {

  return null

}

const mapResourcesToPage = (props, context) => ({
  appraisal: `/api/admin/appraisals/appraisals/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Appraisals',
  tabs: getTabs(props, resources),
  tasks: getTasks(props, resources),
  buttons: getButtons(props, resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
