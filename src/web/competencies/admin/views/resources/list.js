import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context) => ({
  title: 'Resources',
  collection: {
    endpoint: '/api/admin/competencies/resources',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true },
      { label: 'Description', key: 'description', visible: false },
      { label: 'URL', key: 'url', visible: false }
    ],
    filters: [
      { label: 'Competency', name: 'competencies_competencies.id', type: 'select', multiple: true, endpoint: '/api/admin/competencies/competencies', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' } },
      { label: 'Classification', name: 'competencies_expectations.classification_id', type: 'select', multiple: true, endpoint: '/api/admin/competencies/classifications', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' } },
      { label: 'Level', name: 'competencies_competencies.level', type: 'select', options: [{ value: 1, text: 'Level 1' }, { value: 2, text: 'Level 2' }, { value: 3, text: 'Level 3' }] }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Title', key: 'title' },
      { label: 'Description', key: 'description' },
      { label: 'URL', key: 'url' }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    entity: 'resource',
    icon: 'cube',
    link: (record) => `/admin/competencies/resources/${record.id}`,
    new: New
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
