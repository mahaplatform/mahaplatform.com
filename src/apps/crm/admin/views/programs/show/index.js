import { Fields, Page } from 'maha-admin'
import Senders from './senders'
import Details from './details'
import Access from './access'
import Topics from './topics'
import Lists from './lists'
import Edit from '../edit'
import React from 'react'

const getTabs = (user, { accesses, lists, program, senders, topics }) => ({
  items: [
    { label: 'Details', component: <Details program={ program } /> },
    { label: 'Access', component: <Access program={ program } accesses={ accesses } /> },
    { label: 'Senders', component: <Senders program={ program } senders={ senders } /> },
    { label: 'Lists', component: <Lists program={ program } lists={ lists } /> },
    { label: 'Topics', component: <Topics program={ program } topics={ topics } /> },
    { label: 'Properties', component: <Fields parent_type="crm_contacts" /> }
  ]
})

const getTasks = (user, { fields, program }) => ({
  items: [
    { label: 'Edit Program', modal: <Edit id={ program.id } fields={ fields } /> }
  ]
})

const mapResourcesToPage = (props, context) => ({
  accesses: `/api/admin/crm/programs/${props.params.id}/access`,
  lists: `/api/admin/crm/programs/${props.params.id}/lists`,
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
