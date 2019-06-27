import { CompactUserToken, Page } from 'maha-admin'
import FilenameToken from '../../components/filename_token'
import SourceToken from '../../components/source_token'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Team',
  collection: {
    table: [
      { label: 'Filename', key: 'original_file_name', primary: true, format: FilenameToken },
      { label: 'Uploaded By', key: 'user.full_name', primary: true },
      { label: 'Status', key: 'status', primary: true },
      { label: 'Created', key: 'created_at', primary: true }
    ],
    filters: [
      { label: 'User', name: 'user_id', type: 'select', endpoint: '/api/admin/platform/users', value: 'id', text: 'full_name', format: CompactUserToken },
      { label: 'Team', name: 'team_id', type: 'select', endpoint: '/api/admin/platform/teams', value: 'id', text: 'title' },
      { label: 'Source', name: 'source_id', type: 'select', endpoint: '/api/admin/profiles/sources', value: 'id', text: 'text', format: SourceToken },
      { label: 'Status', name: 'status_id', type: 'select', options: [{value:'chunked',text:'chunked'},{value:'assembled',text:'assembled'},{value:'processed',text:'processed'}] }
    ],
    endpoint: '/api/admin/platform/assets',
    entity: 'asset',
    link: (record) => `/admin/platform/assets/${record.id}`,
    defaultSort: { key: 'created_at', order: 'desc' },
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
