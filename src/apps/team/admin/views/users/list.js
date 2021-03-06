import { Import, Page, AppToken, UserToken } from '@admin'
import UsersNew from './new'
import UserImportFinalize from './user_import_finalize'
import React from 'react'

const _getImport = () => ({
  table: 'maha_users',
  fields: [
    { label: 'ID', key: 'id', collapsing: true, visible: false },
    { label: 'First Name', name: 'first_name', type: 'textfield' },
    { label: 'Last Name', name: 'last_name', type: 'textfield' },
    { label: 'Email', name: 'email', type: 'textfield', required: true },
    { label: 'Photo', name: 'photo_id', type: 'integer' }
  ],
  primaryKey: 'email',
  rules: {
    email: ['required','email']
  },
  destination: (import_id) => `/admin/team/users?$filter[import_id][$in]=${import_id}`,
  defaultParams: {
    values:{}
  },
  defaultMapping: [
    {
      field:'first_name',
      header:'First Name',
      type:'text',
      relation:null
    },{
      field:'last_name',
      header:'Last Name',
      type:'text',
      relation:null
    },{
      field:'email',
      header:'Email',
      type:'text',
      relation:null
    },{
      field:'photo_id',
      header:'Photo',
      type:'upload',
      relation:null
    }
  ],
  finalizeComponent: UserImportFinalize
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Users',
  rights: ['team:manage_people'],
  collection: {
    endpoint: '/api/admin/team/users',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Name', key: 'last_name', primary: true, format: UserToken },
      { label: 'Email', key: 'email' }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'First Name', key: 'first_name' },
      { label: 'Last Name', key: 'last_name' },
      { label: 'Email', key: 'email' }
    ],
    filters: [
      { label: 'Group', name: 'group_id', type: 'select', endpoint: '/api/admin/team/groups', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' } },
      { label: 'Role', name: 'role_id', type: 'select', endpoint: '/api/admin/team/roles', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' } },
      { label: 'App', name: 'app_id', type: 'select', endpoint: '/api/admin/team/apps', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' }, format: AppToken },
      { label: 'Active', name: 'is_active', type: 'select', options: [{ value: '1', text: 'Active' }, { value: '0', text: 'Inactive' }] }
    ],
    defaultSort: { key: 'last_name', order: 'asc' },
    entity: 'user',
    onClick: (record) => context.router.history.push(`/team/users/${record.id}`)
  },
  tasks : {
    icon: 'plus',
    rights: ['team:manage_people'],
    items: [
      {
        label: 'Add User',
        modal: () => <UsersNew />
      }, {
        label: 'Import Users',
        modal: () => <Import { ..._getImport() } />
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
