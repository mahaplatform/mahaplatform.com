import ProgramForm from '../../components/programform'
import EmailToken from '../../tokens/email'
import { Page } from 'maha-admin'
import React from 'react'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Emails',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/emails',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'display_name', sort: 'title', primary: true, format: EmailToken },
      { label: 'Program', key: 'program.title', sort: 'program', primary: true },
      { label: 'Opened', key: 'opened', collapsing: true, align: 'right' },
      { label: 'Clicked', key: 'clicked', collapsing: true, align: 'right' },
      { label: 'Bounced', key: 'bounced', collapsing: true, align: 'right' },
      { label: 'Unsubscribed', key: 'unsubscribed', collapsing: true, align: 'right' }
    ],
    empty: {
      icon: 'envelope-o',
      title: 'No Emails',
      text: 'You have not yet created any emails',
      buttons: resources.programs.length > 0 ? [
        { label: 'Create New Email', modal: <ProgramForm programs={ resources.programs } form={ New } /> }
      ] : null
    },
    defaultSort: { key: 'created_at', order: 'desc' },
    entity: 'email',
    onClick: (record) => context.router.history.push(`/admin/crm/emails/${record.id}`)
  },
  task: resources.programs.length > 0 ? {
    label: 'Create Email',
    icon: 'plus',
    modal: <ProgramForm programs={ resources.programs } form={ New } />
  } : null
})

const mapResourcesToPage = (props, context) => ({
  programs: {
    endpoint: '/api/admin/crm/programs',
    filter: {
      access_type: {
        $in: ['manage','edit']
      }
    }
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
