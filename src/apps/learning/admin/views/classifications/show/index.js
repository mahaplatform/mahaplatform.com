import AssignExpectations from '../expectations'
import Expectations from './expectations'
import { Page } from 'maha-admin'
import Edit from '../edit'
import React from 'react'

const getTabs = ({ classification, expectations }) => {

  const items = [
    { label: 'Expectations', component: <Expectations classification={ classification } expectations={ expectations } /> }
  ]

  return { items }

}

const getTasks = ({ classification, expectations }) => {

  const items = [
    { label: 'Edit Classification', modal: <Edit classification={ classification } /> },
    { label: 'Manage Expectations', modal: <AssignExpectations classification={ classification } expectations={ expectations } /> }
  ]

  return { items }

}
const mapResourcesToPage = (props, context) => ({
  classification: `/api/admin/learning/classifications/${props.params.id}`,
  expectations: `/api/admin/learning/classifications/${props.params.id}/expectations`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: resources.classification.title,
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
