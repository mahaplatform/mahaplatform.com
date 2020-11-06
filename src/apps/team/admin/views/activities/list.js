import React from 'react'
import { Page, Feed, UserToken, AppToken } from '@admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Activities',
  rights: ['team:manage_team'],
  collection: {
    endpoint: '/api/admin/team/activities',
    filters: [
      { label: 'User', name: 'user_id', type: 'select', multiple: true, endpoint: '/api/admin/team/users', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' }, format: UserToken },
      { label: 'App', name: 'app_id', type: 'select', multiple: true, endpoint: '/api/admin/team/apps', value: 'id', text: 'title', sort: { key: 'code', order: 'asc' }, format: AppToken },
      { label: 'Date Range', name: 'created_at', type: 'daterange', include: ['this','last'] }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Date', key: 'created_at' },
      { label: 'User', key: 'user.full_name' },
      { label: 'App', key: 'app.title' },
      { label: 'Description', key: 'description' }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'bolt',
      title: 'No Activities',
      text: 'We have not yet recorded any activities'
    },
    entity: 'activity',
    layout: (props) => <Feed { ...props } onClick={ (item) => context.router.history.push(item.url) } />
  }
})

export default Page(null, mapPropsToPage)
