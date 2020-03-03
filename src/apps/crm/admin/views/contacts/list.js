import ImportToken from '../../../../maha/admin/tokens/import'
import ContactImport from '../../components/contactimport'
import ContactToken from '../../tokens/contact'
import Interests from './interests'
import { Page } from 'maha-admin'
import Lists from './lists'
import Tags from './tags'
import React from 'react'
import New from './new'

import ListCriteria from './listcriteria'

const mapResourcesToPage = (props, context) => ({
  fields: '/api/admin/crm/fields'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Contacts',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/contacts',
    table: [
      { label: 'ID', key: 'id', width: 80, visible: false },
      { label: 'Name', key: 'display_name', sort: 'last_name', primary: true, format: ContactToken },
      { label: 'Email', key: 'email' },
      { label: 'Phone', key: 'phone', format: 'phone' },
      { label: 'Organization', key: 'organization', visible: false },
      { label: 'Birthday', key: 'birthday', visible: false },
      { label: 'Spouse', key: 'spouse', visible: false }
    ],
    criteria: [
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
        { name: 'Interest', key: 'topic_id', type: ListCriteria, endpoint: '/api/admin/crm/topics', text: 'title', value: 'id', subject: false, comparisons: [
          { value: '$in', text: 'is interested in' },
          { value: '$nin', text: 'is not interested in' }
        ] },
        { name: 'List', key: 'list_id', type: ListCriteria, endpoint: '/api/admin/crm/lists', text: 'title', value: 'id', subject: false, comparisons: [
          { value: '$in', text: 'is subscribed to' },
          { value: '$nin', text: 'is not subscribed to' }
        ] },
        { name: 'Organization', key: 'organization_id', type: 'select', endpoint: '/api/admin/crm/organizations', subject: false, text: 'name', value: 'id', comparisons: [
          { value: '$in', text: 'belongs to' },
          { value: '$nin', text: 'does not belong to' }
        ] },
        { name: 'Tags', key: 'tag_id', type: 'select', endpoint: '/api/admin/crm/tags', text: 'text', value: 'id', subject: false, comparisons: [
          { value: '$in', text: 'is tagged with' },
          { value: '$nin', text: 'id not tagged with' }
        ] }
      ] },
      { label: 'Activities', fields: [
        { name: 'Form', key: 'form_id', type: ListCriteria, endpoint: '/api/admin/crm/forms', text: 'title', value: 'id', subject: false, comparisons: [
          { value: '$eq', text: 'filled out' },
          { value: '$neq', text: 'did not fill out' }
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
        { name: 'Workflow Enrollment', key: 'enrollment_id', type: ListCriteria, endpoint: '/api/admin/crm/workflows', text: 'title', value: 'id', subject: false, comparisons: [
          { value: '$wen', text: 'enrolled in workflow' },
          { value: '$nwen', text: 'not enrolled in workflow' }
        ] },
        { name: 'Workflow Conversion', key: 'enrollment_id', type: ListCriteria, endpoint: '/api/admin/crm/workflows', text: 'title', value: 'id', subject: false, comparisons: [
          { value: '$wcv', text: 'enrolled and coverted in workflow' },
          { value: '$nwcv', text: 'enrolled, but did not covert in workflow' }
        ] },
        { name: 'Workflow Completion', key: 'enrollment_id', type: ListCriteria, endpoint: '/api/admin/crm/workflows', text: 'title', value: 'id', subject: false, comparisons: [
          { value: '$wcm', text: 'enrolled and complete workflow' },
          { value: '$nwcm', text: 'enrolled, but did not complete workflow' }
        ] },
        { name: 'Purchase', key: 'product_id', type: 'select', endpoint: '/api/admin/finance/products', text: 'title', value: 'id', subject: false, comparisons: [
          { value: '$pr', text: 'purchased' },
          { value: '$npr', text: 'did not purchase' }
        ] }
      ] }
    ],
    defaultSort: { key: 'last_name', order: 'asc' },
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Name', key: 'full_name' },
      { label: 'Email', key: 'email' }
    ],
    empty: {
      icon: 'user-circle',
      title: 'No Contacts',
      text: 'You have not yet created any contacts',
      buttons: [
        { label: 'Create Contact', modal: <New fields={ resources.fields } /> },
        { label: 'Import Contacts', modal: ContactImport }
      ]
    },
    entity: 'contact',
    onClick: (record) => context.router.history.push(`/admin/crm/contacts/${record.id}`),
    selectable: true,
    buttons: (selected) => [{
      label: 'Tag Contacts',
      color: 'red',
      modal: <Tags filter={ selected.filter } />
    },{
      label: 'Add Consent',
      color: 'red',
      modal: <Tags filter={ selected.filter } />
    },{
      label: 'Add to List',
      color: 'red',
      modal: <Lists filter={ selected.filter } />
    },{
      label: 'Add to Interest',
      color: 'red',
      modal: <Interests filter={ selected.filter } />
    }]
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Add Contact',
        modal: <New fields={ resources.fields } />
      }, {
        label: 'Import Contacts',
        modal: ContactImport
      }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
