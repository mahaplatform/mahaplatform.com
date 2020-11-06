import { Page } from '@admin'
import Details from './details'
import React from 'react'

const getTabs = ({ shortlink }) => ({
  header: <img className="events-ticket-qrcode" src={`/shortlinks/${shortlink.code}/qrcode`} />,
  items: [
    { label: 'Details', component: <Details shortlink={ shortlink } /> }
  ]
})

const getTasks = ({ shortlink }) => null

const mapResourcesToPage = (props, context) => ({
  shortlink: `/api/admin/team/shortlinks/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Shortlink',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
