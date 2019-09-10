import { Page } from 'maha-admin'
import Numbers from './numbers'
import Senders from './senders'
import Details from './details'
import React from 'react'

const getTabs = (user, { program }) => ({
  items: [
    { label: 'Details', component: <Details program={ program } /> },
    { label: 'Senders', component: <Senders program={ program } /> },
    { label: 'Numbers', component: <Numbers program={ program } /> },
    { label: 'Topics', component: <div>foo</div> }
  ]
})

const getTasks = (user, { program}) => ({
  items: [
  ]
})

const mapResourcesToPage = (props, context) => ({
  program: `/api/admin/team/programs/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Program',
  tabs: getTabs(props.user, resources),
  tasks: getTasks(props.user, resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
