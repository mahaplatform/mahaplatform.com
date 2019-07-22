import { Page } from 'maha-admin'
import AssignUsers from '../users'
import Details from './details'
import Access from './access'
import Users from './users'
import Edit from '../edit'
import React from 'react'

const getTabs = ({ role, users, access}) => ({
  items: [
    { label: 'Details', component: <Details role={ role } /> },
    { label: 'Users', component: <Users role={ role } users={ users } /> },
    { label: 'Access', component: <Access access={ access } /> }
  ]
})

const getTasks = ({ role }, { flash, router }) => ({
  items: [
    {
      label: 'Edit Role',
      modal: (props) => <Edit role={ role } />,
      rights: ['team:manage_people']
    }, {
      label: 'Manage Users',
      modal: (props) => <AssignUsers role_id={ role.id } />,
      rights: ['team:manage_people']
    }, {
      label: 'Delete Role',
      confirm: 'Are you sure you want to delete this role',
      request: {
        method: 'DELETE',
        endpoint: `/api/admin/team/roles/${role.id}`,
        onSuccess: (result) => {
          flash.set('success', 'Successfully deleted this role')
          router.goBack()
        },
        onFailure: (result) => {
          flash.set('error', 'Unable to delete this role')
        }
      }
    }
  ]
})

const mapResourcesToPage = (props, context) => ({
  role: `/api/admin/team/roles/${props.params.id}`,
  users: `/api/admin/team/roles/${props.params.id}/users`,
  access: `/api/admin/team/roles/${props.params.id}/access`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: resources.role.title,
  rights: ['team:manage_people'],
  tabs: getTabs(resources),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
