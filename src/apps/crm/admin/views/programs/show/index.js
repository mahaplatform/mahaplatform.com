import { Fields, Page } from 'maha-admin'
import Templates from './templates'
import Senders from './senders'
import Details from './details'
import Access from './access'
import Topics from './topics'
import Lists from './lists'
import Edit from '../edit'
import React from 'react'

const getTabs = (user, { accesses, lists, program, senders, templates, topics }) => ({
  items: [
    { label: 'Details', component: <Details program={ program } /> },
    { label: 'Access', component: <Access program={ program } accesses={ accesses } /> },
    { label: 'Senders', component: <Senders program={ program } senders={ senders } /> },
    { label: 'Lists', component: <Lists program={ program } lists={ lists } /> },
    { label: 'Topics', component: <Topics program={ program } topics={ topics } /> },
    { label: 'Templates', component: <Templates program={ program } templates={ templates } /> },
    { label: 'Properties', component: <Fields label="property" parent_type="crm_programs" parent_id={ program.id } /> }
  ]
})

const getTasks = (user, { fields, program }) => ({
  items: [
    ...program.access_type === 'manage' ? [
      { label: 'Edit Program', modal: <Edit id={ program.id } fields={ fields } /> }
    ] : [],
    ...program.access_type !== 'view' ? [
      { label: 'Manage Communication', route: `/admin/crm/programs/${program.id}/channels` }
    ] : []
  ]
})

const mapResourcesToPage = (props, context) => ({
  accesses: `/api/admin/crm/programs/${props.params.id}/access`,
  lists: `/api/admin/crm/programs/${props.params.id}/lists`,
  program: `/api/admin/crm/programs/${props.params.id}`,
  senders: `/api/admin/crm/programs/${props.params.id}/senders`,
  templates: `/api/admin/crm/programs/${props.params.id}/templates`,
  topics: `/api/admin/crm/programs/${props.params.id}/topics`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Program',
  tabs: getTabs(props.user, resources),
  tasks: getTasks(props.user, resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
