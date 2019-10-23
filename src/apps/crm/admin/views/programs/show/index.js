import { Fields, Page } from 'maha-admin'
import Senders from './senders'
import Details from './details'
import Access from './access'
import Topics from './topics'
import React from 'react'

const getTabs = (user, { accesses, program, senders, topics }) => ({
  items: [
    { label: 'Details', component: <Details program={ program } /> },
    { label: 'Access', component: <Access program={ program } accesses={ accesses } /> },
    { label: 'Senders', component: <Senders program={ program } senders={ senders } /> },
    { label: 'Topics', component: <Topics program={ program } topics={ topics } /> },
    { label: 'Fields', component: <Fields parent_type="crm_contacts" /> }
  ]
})

const getTasks = (user, { program}) => ({
  items: []
})

const mapResourcesToPage = (props, context) => ({
  accesses: `/api/admin/crm/programs/${props.params.id}/access`,
  program: `/api/admin/crm/programs/${props.params.id}`,
  senders: `/api/admin/crm/programs/${props.params.id}/senders`,
  topics: `/api/admin/crm/programs/${props.params.id}/topics`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Program',
  tabs: getTabs(props.user, resources),
  tasks: getTasks(props.user, resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
