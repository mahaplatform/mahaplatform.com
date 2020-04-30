import ImportToken from '../../../../maha/admin/tokens/import'
import ListCriteria from '../../components/listcriteria'

const criteria = [
  { label: 'Contact', fields: [
    { name: 'First Name', key: 'first_name', type: 'text' },
    { name: 'Last Name', key: 'last_name', type: 'text' },
    { name: 'Email', key: 'email', type: 'text' },
    { name: 'Phone', key: 'phone', type: 'text' },
    { name: 'Street', key: 'street_1', type: 'text' },
    { name: 'City', key: 'city', type: 'text' },
    { name: 'State/Province', key: 'state_province', type: 'text' },
    { name: 'Postal Code', key: 'postal_code', type: 'text' },
    { name: 'Birthday', key: 'birthday', type: 'text' },
    { name: 'Spouse', key: 'spouse', type: 'text' }
  ] },
  { label: 'Classifications', fields: [
    { name: 'List', key: 'list_id', type: ListCriteria, endpoint: '/api/admin/crm/lists', text: 'title', value: 'id', multiple: true, subject: false, comparisons: [
      { value: '$in', text: 'is subscribed to' },
      { value: '$nin', text: 'is not subscribed to' }
    ] },
    { name: 'Organization', key: 'organization_id', type: 'select', endpoint: '/api/admin/crm/organizations', multiple: true, subject: false, text: 'name', value: 'id', comparisons: [
      { value: '$in', text: 'belongs to' },
      { value: '$nin', text: 'does not belong to' }
    ] },
    { name: 'Tags', key: 'tag_id', type: 'select', endpoint: '/api/admin/crm/tags', text: 'text', value: 'id', multiple: true, subject: false, comparisons: [
      { value: '$in', text: 'is tagged with' },
      { value: '$nin', text: 'id not tagged with' }
    ] },
    { name: 'Topic', key: 'topic_id', type: ListCriteria, endpoint: '/api/admin/crm/topics', text: 'title', value: 'id', multiple: true, subject: false, comparisons: [
      { value: '$in', text: 'is interested in' },
      { value: '$nin', text: 'is not interested in' }
    ] }
  ] },
  { label: 'Activities', fields: [
    { name: 'Event', key: 'event_id', type: ListCriteria, endpoint: '/api/admin/events/events', text: 'title', value: 'id', multiple: false, subject: false, comparisons: [
      { value: '$act', text: 'registered for' },
      { value: '$nact', text: 'did not register for' }
    ] },
    { name: 'Form', key: 'form_id', type: ListCriteria, endpoint: '/api/admin/crm/forms', text: 'title', value: 'id', multiple: false, subject: false, comparisons: [
      { value: '$act', text: 'filled out' },
      { value: '$nact', text: 'did not fill out' }
    ] },
    { name: 'Import', key: 'import_id', type: 'select', endpoint: '/api/admin/crm/imports', filter:  { stage: { $eq: 'complete' } }, text: 'description', value: 'id', subject: false, format: ImportToken, comparisons: [
      { value: '$eq', text: 'was included in import' },
      { value: '$neq', text: 'was not included in import' }
    ] },
    { name: 'Email Delivery', key: 'email_campaign_id', type: 'select', endpoint: '/api/admin/crm/campaigns', filter: { type: { $eq: 'email' }, status: { $eq: 'sent' } }, text: 'title', value: 'id', subject: false, comparisons: [
      { value: '$de', text: 'received the email' },
      { value: '$nde', text: 'did not receive the email' }
    ] },
    { name: 'Email Open', key: 'email_campaign_id', type: 'select', endpoint: '/api/admin/crm/campaigns', filter: { type: { $eq: 'email' }, status: { $eq: 'sent' } }, text: 'title', value: 'id', subject: false, comparisons: [
      { value: '$op', text: 'opened the email' },
      { value: '$nop', text: 'did not open the email' }
    ] },
    { name: 'Email Click', key: 'email_campaign_id', type: 'select', endpoint: '/api/admin/crm/campaigns', filter: { type: { $eq: 'email' }, status: { $eq: 'sent' } }, text: 'title', value: 'id', subject: false, comparisons: [
      { value: '$cl', text: 'clicked link in the email' },
      { value: '$ncl', text: 'did not click link in the email' }
    ] },
    { name: 'Workflow Enrollment', key: 'enrollment_id', type: ListCriteria, endpoint: '/api/admin/crm/workflows', text: 'title', value: 'id', multiple: false, subject: false, comparisons: [
      { value: '$act', text: 'enrolled in workflow' },
      { value: '$n$act', text: 'not enrolled in workflow' }
    ] },
    { name: 'Workflow Conversion', key: 'enrollment_id', type: ListCriteria, endpoint: '/api/admin/crm/workflows', text: 'title', value: 'id', multiple: false, subject: false, comparisons: [
      { value: '$wcv', text: 'enrolled and coverted in workflow' },
      { value: '$nwcv', text: 'enrolled, but did not covert in workflow' }
    ] },
    { name: 'Workflow Completion', key: 'enrollment_id', type: ListCriteria, endpoint: '/api/admin/crm/workflows', text: 'title', value: 'id', multiple: false, subject: false, comparisons: [
      { value: '$wcm', text: 'enrolled and complete workflow' },
      { value: '$nwcm', text: 'enrolled, but did not complete workflow' }
    ] },
    { name: 'Purchase', key: 'product_id', type: 'select', endpoint: '/api/admin/finance/products', text: 'title', value: 'id', subject: false, comparisons: [
      { value: '$pr', text: 'purchased' },
      { value: '$npr', text: 'did not purchase' }
    ] }
  ] }
]

export default criteria
