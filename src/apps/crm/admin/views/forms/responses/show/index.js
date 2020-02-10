import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ form, response }) => ({
  items: [
    { label: 'Details', component: <Details form={ form } response={ response } /> }
  ]
})

const getTasks = ({ form, response }, { flash }) => ({
  items: [
    {
      label: 'Resend Confirmation',
      request: {
        method: 'PATCH',
        endpoint: `/api/admin/crm/forms/${form.id}/responses/${response.id}/confirmation`,
        onFailure: (result) => flash.set('error', 'Unable to resend confirmation'),
        onSuccess: (result) => flash.set('success', `An confirmation email has been resent to ${response.contact.email}`)
      }
    }
  ]
})


const mapResourcesToPage = (props, context) => ({
  form: `/api/admin/crm/forms/${props.params.form_id}`,
  response: `/api/admin/crm/forms/${props.params.form_id}/responses/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Response',
  tabs: getTabs(resources),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
