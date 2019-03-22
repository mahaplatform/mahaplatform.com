import React from 'react'
import { Page, Feed, CompactUserToken, AppToken } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Activities',
  rights: ['team:manage_team'],
  collection: {
    endpoint: '/api/admin/team/activities',
    filters: [
      { label: 'User', name: 'user_id', type: 'select', multiple: true, endpoint: '/api/admin/team/users', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' }, format: CompactUserToken },
      { label: 'App', name: 'app_id', type: 'select', multiple: true, endpoint: '/api/admin/team/apps', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' }, format: AppToken },
      { label: 'Date Range', name: 'created_at', type: 'daterange', include: ['this','last'] }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Date', key: 'created_at' },
      { label: 'User', key: 'user.full_name' },
      { label: 'App', key: 'app.title' },
      { label: 'Description', key: 'description' }
    ],
    icon: 'bolt',
    empty: 'We have not yet recorded any activities',
    entity: 'activity',
    defaultSort: { key: 'created_at', order: 'desc' },
    layout: (props) => <Feed { ...props } onClick={ (item) => context.router.push(item.url) } />
  }
})

export default Page(null, mapPropsToPage)
