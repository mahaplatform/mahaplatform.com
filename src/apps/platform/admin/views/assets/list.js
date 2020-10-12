import { UserToken, Page } from 'maha-admin'
import FilenameToken from '../../tokens/filename'
import SourceToken from '../../tokens/source'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Team',
  collection: {
    endpoint: '/api/admin/platform/assets',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Filename', key: 'original_file_name', primary: true, format: FilenameToken },
      { label: 'Uploaded By', key: 'user.full_name', primary: true },
      { label: 'Status', key: 'status', primary: true },
      { label: 'Created', key: 'created_at', primary: true }
    ],
    filters: [
      { label: 'User', name: 'user_id', type: 'select', endpoint: '/api/admin/users', value: 'id', text: 'full_name', format: UserToken },
      { label: 'Team', name: 'team_id', type: 'select', endpoint: '/api/admin/platform/teams', value: 'id', text: 'title' },
      { label: 'Source', name: 'source_id', type: 'select', endpoint: '/api/admin/profiles/sources', value: 'id', text: 'text', format: SourceToken },
      { label: 'Status', name: 'status', type: 'select', options: ['chunked','assembled','processed'] }
    ],
    entity: 'asset',
    defaultSort: { key: 'created_at', order: 'desc' },
    onClick: (record) => context.router.history.push(`/assets/${record.id}`),
    recordTasks: (record) => [
      {
        label: 'Reprocess Asset',
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/platform/assets/${record.id}/reprocess`,
          onFailure: (result) => context.flash.set('error', 'Unable to reprocess out this asset'),
          onSuccess: (result) => context.flash.set('success', 'The asset has been reprocessed')
        }
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
