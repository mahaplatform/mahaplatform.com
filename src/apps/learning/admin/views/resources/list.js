import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context) => ({
  title: 'Resources',
  collection: {
    endpoint: '/api/admin/learning/resources',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true },
      { label: 'Description', key: 'description', visible: false },
      { label: 'URL', key: 'url', visible: false }
    ],
    filters: [
      { label: 'Competency', name: 'competencies_competencies.id', type: 'select', multiple: true, endpoint: '/api/admin/learning/competencies', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' } },
      { label: 'Classification', name: 'competencies_expectations.classification_id', type: 'select', multiple: true, endpoint: '/api/admin/learning/classifications', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' } },
      { label: 'Level', name: 'competencies_competencies.level', type: 'select', options: [{ value: 1, text: 'Level 1' }, { value: 2, text: 'Level 2' }, { value: 3, text: 'Level 3' }] }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Title', key: 'title' },
      { label: 'Description', key: 'description' },
      { label: 'URL', key: 'url' }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    empty: {
      icon: 'cube',
      title: 'No Resources',
      text: 'You have not yet created any resources',
      buttons: [
        { label: 'Create Resource', modal: New }
      ]
    },
    entity: 'resource',
    onClick: (record) => context.router.history.push(`/admin/learning/resources/${record.id}`)
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
