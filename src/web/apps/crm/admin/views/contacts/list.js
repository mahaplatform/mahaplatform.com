import { Import, Page, CompactUserToken } from 'maha-admin'
import React from 'react'
import New from './new'

// const _getImport = (admin) => ({
//   table: 'crm_contacts',
//   fields: [
//     { label: 'First Name', name: 'first_name', type: 'textfield' },
//     { label: 'Last Name', name: 'last_name', type: 'textfield' },
//     { label: 'Email', name: 'email', type: 'textfield', required: true },
//     { label: 'Phone', name: 'phone', type: 'textfield' },
//     { label: 'Organization', name: 'organization_id', type: 'integer' },
//     { label: 'Photo', name: 'photo_id', type: 'integer' }
//   ],
//   primaryKey: 'email',
//   rules: {
//     email: ['required','email']
//   },
//   destination: (import_id) => `/admin/crm/contacts?$filter[import_id][$in]=${import_id}`,
//   defaultParams: {
//     owner_id: admin.user.id,
//     values:{}
//   },
//   defaultMapping: [
//     {
//       field:'first_name',
//       header:'First Name',
//       type:'text',
//       relation:null
//     },{
//       field:'last_name',
//       header:'Last Name',
//       type:'text',
//       relation:null
//     },{
//       field:'email',
//       header:'Email',
//       type:'text',
//       relation:null
//     },{
//       field:'phone',
//       header:'Phone',
//       type:'text',
//       relation:null
//     },{
//       field:'organization_id',
//       header:'Organization',
//       type:'relation',
//       relation:'crm_organizations',
//       relationcolumn:'name'
//     },{
//       field:'photo_id',
//       header:'Photo',
//       type:'upload',
//       relation:null
//     }
//   ]
// })

const mapResourcesToPage = (props, context) => ({
  fields: '/api/admin/crm_contacts/fields'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Contacts',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/contacts',
    table: [
      { label: 'Name', key: 'full_name', primary: true, format: CompactUserToken },
      { label: 'Email', key: 'email' }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Name', key: 'full_name' },
      { label: 'Email', key: 'email' }
    ],
    empty: 'You have not yet created any contacts',
    entity: 'contact',
    icon: 'user-circle',
    link: (record) => `/admin/crm/contacts/${record.id}`,
    new: () => <New fields={ resources.fields } />,
    defaultSort: { key: 'last_name', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Add Contact',
        modal: () => <New fields={ resources.fields } />
      // }, {
      //   label: 'Import Contacts',
      //   modal: () => <Import { ..._getImport(context.admin) } />
      }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
