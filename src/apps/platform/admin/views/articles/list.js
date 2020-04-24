import { Page, HelpArticleToken } from 'maha-admin'
import pluralize from 'pluralize'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Help Articles',
  collection: {
    endpoint: '/api/admin/platform/articles',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true, format: HelpArticleToken },
      { label: 'App', key: 'app.title' },
      { label: 'Published', key: 'is_published', collapsing: true, format: 'check_times' }
    ],
    entity: 'asset',
    defaultSort: { key: 'created_at', order: 'desc' },
    onClick: (record) => context.router.history.push(`/admin/platform/help/articles/${record.id}`),
    selectable: true,
    buttons: (selected, onSuccess) => [{
      color: 'red',
      text: 'Publish Selected',
      request: {
        method: 'PATCH',
        endpoint: '/api/admin/platform/articles/publish',
        body: {
          filter: selected.filter,
          is_published: true
        },
        onFailure: (result) => context.flash.set('error', `Unable to publish these ${pluralize('item', selected.total, true)}`),
        onSuccess: (result) => context.flash.set('success', `You successfully published ${pluralize('item', selected.total, true)}`)
      }
    },{
      color: 'red',
      text: 'Unpublish Selected',
      request: {
        method: 'PATCH',
        endpoint: '/api/admin/platform/articles/publish',
        body: {
          filter: selected.filter,
          is_published: false
        },
        onFailure: (result) => context.flash.set('error', `Unable to unpublish these ${pluralize('item', selected.total, true)}`),
        onSuccess: (result) => context.flash.set('success', `You successfully unpublished ${pluralize('item', selected.total, true)}`)
      }
    }]
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
