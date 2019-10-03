import { Import } from 'maha-admin'
import React from 'react'

const _getImport = () => ({
  table: 'crm_contacts',
  fields: [
    { label: 'First Name', name: 'first_name', type: 'textfield' },
    { label: 'Last Name', name: 'last_name', type: 'textfield' },
    { label: 'Email', name: 'email', type: 'textfield', required: true },
    { label: 'Phone', name: 'phone', type: 'textfield' },
    { label: 'Organization', name: 'organization_id', type: 'integer' },
    { label: 'Photo', name: 'photo_id', type: 'integer' }
  ],
  primaryKey: 'email',
  rules: {
    email: ['required','email']
  },
  destination: (import_id) => `/admin/crm/contacts?$filter[import_id][$in]=${import_id}`,
  defaultParams: {
    values: {}
  },
  defaultMapping: [
    { field:'first_name', header:'First Name', type:'text' },
    { field:'last_name', header:'Last Name', type:'text' },
    { field:'email', header:'Email', type:'text' },
    { field:'phone', header:'Phone', type:'text' },
    { field:'organization_id', header:'Organization', type:'relation', relation:'crm_organizations', relationcolumn: 'name' },
    { field:'photo_id', header:'Photo', type:'upload' }
  ]
})

const ContactImport = () => (
  <Import { ..._getImport() } />
)

export default ContactImport
