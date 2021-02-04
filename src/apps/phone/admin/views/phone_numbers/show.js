import Details from './details'
import { Page } from '@admin'
import React from 'react'

const getTabs = (user, { audits, phone_number }) => ({
  items: [
    { label: 'Details', component: <Details phone_number={ phone_number } audits={ audits } /> }
  ]
})

const getTasks = (user, { fields, program }) => ({
  items: []
})

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/maha_phone_numbers/${props.params.id}/audits`,
  phone_number: `/api/admin/phone/phone_numbers/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Program',
  tabs: getTabs(props.user, resources),
  tasks: getTasks(props.user, resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
