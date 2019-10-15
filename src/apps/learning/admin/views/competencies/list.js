import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Competencies',
  collection: {
    endpoint: '/api/admin/learning/competencies',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true },
      { label: 'Level', key: 'level', visible: true, collapsing: true },
      { label: 'Category', key: 'category', sort: 'competencies_categories.title', visible: false }
    ],
    filters: [
      { label: 'Category', name: 'category_id', type: 'select', multiple: true, endpoint: '/api/admin/learning/categories', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' } },
      { label: 'Classification', name: 'classification_id', type: 'select', multiple: true, endpoint: '/api/admin/learning/classifications', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' } },
      { label: 'Level', name: 'level', type: 'select', options: [{ value: 1, text: 'Level 1' }, { value: 2, text: 'Level 2' }, { value: 3, text: 'Level 3' }] }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Title', key: 'title' },
      { label: 'Level', key: 'level' },
      { label: 'Category', key: 'category' }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    empty: {
      icon: 'trophy',
      title: 'No Competencies',
      text: 'You have not yet created any competencies',
      buttons: [
        { label: 'Create Competency', modal: New }
      ]
    },
    entity: 'competency',
    link: (record) => `/admin/learning/competencies/${record.id}`
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
