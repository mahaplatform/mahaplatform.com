import { Page } from '@admin'
import Details from './details'
import React from 'react'

const getTabs = ({ form, response }) => ({
  items: [
    { label: 'Details', component: <Details form={ form } response={ response } /> }
  ]
})

const getTasks = ({ form, response }, { flash }) => ({})

const mapResourcesToPage = (props, context) => ({
  form: `/api/admin/forms/forms/${props.params.form_id}`,
  response: `/api/admin/forms/forms/${props.params.form_id}/responses/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Response',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
