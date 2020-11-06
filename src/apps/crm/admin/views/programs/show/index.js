import { Fields, Page } from '@admin'
import Templates from './templates'
import Provision from './provision'
import Senders from './senders'
import Details from './details'
import Access from './access'
import Topics from './topics'
import Lists from './lists'
import Edit from '../edit'
import React from 'react'

const getTabs = (user, { accesses, audits, lists, program, senders, templates, topics }) => ({
  items: [
    { label: 'Details', component: <Details program={ program } audits={ audits } /> },
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
      { label: 'Edit Program', modal: <Edit id={ program.id } fields={ fields } /> },
      ...program.phone_number ? [
        {
          label: 'Release Phone Number',
          rights: ['crm:manage_phone_numbers'],
          confirm: 'Are you sure you want to release this phone number?',
          request: {
            endpoint: `/api/admin/crm/programs/${program.id}/phone_number`,
            method: 'DELETE'
          }
        }
      ] : [
        {
          label: 'Provision Phone Number',
          rights: ['crm:manage_phone_numbers'],
          modal: <Provision program={ program } />
        }
      ]
    ] : []
  ]
})

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/crm_programs/${props.params.id}/audits`,
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
