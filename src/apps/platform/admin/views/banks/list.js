import StatusToken from '@apps/finance/admin/tokens/status'
import { Page } from 'maha-admin'

const mapResourcesToPage = (props, context) => ({
  app: '/api/admin/apps/finance/settings'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Bank Accounts',
  collection: {
    endpoint: '/api/admin/platform/banks',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true },
      { label: 'Team', key: 'team.title', sort: 'team', primary: true },
      { label: 'Status', key: 'status', collapsing: true, primary: true, padded: true, format: StatusToken  }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    onClick: (record) => context.router.history.push(`/platform/banks/${record.id}`),
    empty: {
      icon: 'university',
      title: 'No Bank Accounts',
      text: 'You have not yet added any bank accounts'
    },
    entity: 'invoice'
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
