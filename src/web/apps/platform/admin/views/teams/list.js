import { Logo, Page } from 'maha-admin'
import React from 'react'
import New from './new'

const TeamToken = (team) => (
  <div className="team-token">
    <div className="team-token-logo">
      <Logo team={ team } />
    </div>
    <div className="team-token-label">
      { team.title }
    </div>
  </div>
)

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Team',
  collection: {
    table: [
      { label: 'Title', key: 'title', primary: true, format: TeamToken }
    ],
    endpoint: '/api/admin/platform/teams',
    entity: 'users',
    link: (record) => `/admin/platform/teams/${record.id}`,
    defaultSort: { key: 'title', order: 'asc' }
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
