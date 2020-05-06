import ImportToken from '../../../../maha/admin/tokens/import'
import ListCriteria from '../../components/listcriteria'
import AddressCriteria from '../../components/addresscriteria'

const criteria = [
  { label: 'Contact', fields: [
    { name: 'First Name', key: 'first_name', type: 'text' },
    { name: 'Last Name', key: 'last_name', type: 'text' },
    { name: 'Email', key: 'email', type: 'text' },
    { name: 'Phone', key: 'phone', type: 'text' },
    { name: 'Birthday', key: 'birthday', type: 'text' },
    { name: 'Spouse', key: 'spouse', type: 'text' }
  ] },
  { label: 'Address', fields: [
    { name: 'Address', key: 'address', type: AddressCriteria },
    { name: 'City', key: 'city', type: 'text' },
    { name: 'County', key: 'county', type: AddressCriteria },
    { name: 'State/Province', key: 'state_province', type: 'select', endpoint: '/api/admin/states', multiple: true, text: 'full_name', value: 'short_name' },
    { name: 'Postal Code', key: 'postal_code', type: 'text' }
  ] },
  { label: 'Classifications', fields: [
    { name: 'List', key: 'list_id', type: ListCriteria, endpoint: '/api/admin/crm/lists', text: 'title', value: 'id', multiple: true, subject: false, comparisons: [
      { value: '$jin', text: 'is subscribed to' },
      { value: '$njin', text: 'is not subscribed to' }
    ] },
    { name: 'Organization', key: 'organization_id', type: 'select', endpoint: '/api/admin/crm/organizations', multiple: true, subject: false, text: 'name', value: 'id', comparisons: [
      { value: '$jin', text: 'belongs to' },
      { value: '$njin', text: 'does not belong to' }
    ] },
    { name: 'Tags', key: 'tag_id', type: 'select', endpoint: '/api/admin/crm/tags', text: 'text', value: 'id', multiple: true, subject: false, comparisons: [
      { value: '$jin', text: 'is tagged with' },
      { value: '$njin', text: 'id not tagged with' }
    ] },
    { name: 'Topic', key: 'topic_id', type: ListCriteria, endpoint: '/api/admin/crm/topics', text: 'title', value: 'id', multiple: true, subject: false, comparisons: [
      { value: '$jin', text: 'is interested in' },
      { value: '$njin', text: 'is not interested in' }
    ] }
  ] },
  { label: 'Activities', fields: [
    { name: 'Email Campaign', key: 'email_campaign_id', type: ListCriteria, endpoint: '/api/admin/crm/campaigns/email', text: 'title', value: 'id', subject: false, comparisons: [
      { value: '$se', text: 'was sent the email' },
      { value: '$nse', text: 'was not sent the email' },
      { value: '$de', text: 'received the email' },
      { value: '$nde', text: 'did not receive the email' },
      { value: '$op', text: 'opened the email' },
      { value: '$nop', text: 'did not open the email' },
      { value: '$cl', text: 'clicked link in the email' },
      { value: '$ncl', text: 'did not click link in the email' }
    ] },
    { name: 'Event', key: 'event_id', type: ListCriteria, endpoint: '/api/admin/events/events', text: 'title', value: 'id', multiple: false, subject: false, comparisons: [
      { value: '$jeq', text: 'registered for' },
      { value: '$njeq', text: 'did not registered for' }
    ] },
    { name: 'Form', key: 'form_id', type: ListCriteria, endpoint: '/api/admin/crm/forms', text: 'title', value: 'id', multiple: false, subject: false, comparisons: [
      { value: '$jeq', text: 'filled out' },
      { value: '$njeq', text: 'did not fill out' }
    ] },
    { name: 'Import', key: 'import_id', type: 'select', endpoint: '/api/admin/crm/imports', filter:  { stage: { $eq: 'complete' } }, text: 'description', value: 'id', subject: false, format: ImportToken, comparisons: [
      { value: '$jeq', text: 'was included in import' },
      { value: '$njeq', text: 'was not included in import' }
    ] },
    { name: 'Purchase', key: 'product_id', type: 'select', endpoint: '/api/admin/finance/products', text: 'title', value: 'id', subject: false, comparisons: [
      { value: '$jeq', text: 'purchased' },
      { value: '$njeq', text: 'did not purchase' }
    ] },
    { name: 'Workflow', key: 'enrollment_id', type: ListCriteria, endpoint: '/api/admin/crm/workflows', text: 'display_name', value: 'id', multiple: false, subject: false, comparisons: [
      { value: '$jeq', text: 'enrolled in workflow' },
      { value: '$njeq', text: 'not enrolled in workflow' },
      { value: '$wcv', text: 'enrolled and coverted in workflow' },
      { value: '$nwcv', text: 'enrolled, but did not covert in workflow' },
      { value: '$wcm', text: 'enrolled and complete workflow' },
      { value: '$nwcm', text: 'enrolled, but did not complete workflow' }
    ] },
    { name: 'Workflow Email', key: 'email_id', type: ListCriteria, endpoint: '/api/admin/crm/emails', text: 'display_name', value: 'id', subject: false, comparisons: [
      { value: '$se', text: 'was sent the email' },
      { value: '$nse', text: 'was not sent the email' },
      { value: '$de', text: 'received the email' },
      { value: '$nde', text: 'did not receive the email' },
      { value: '$op', text: 'opened the email' },
      { value: '$nop', text: 'did not open the email' },
      { value: '$cl', text: 'clicked link in the email' },
      { value: '$ncl', text: 'did not click link in the email' }
    ] }
  ] }
]

export default criteria
