import { Avatar, Page } from 'maha-admin'
import Details from './details'
import Teams from './teams'
import React from 'react'

const getTabs = ({ account, teams }) => ({
  header: <Avatar user={ account } width="120" presence={ false } />,
  items:  [
    { label: 'Details', component: <Details account={ account } /> },
    { label: 'Teams', component: <Teams teams={ teams } /> }
  ]
})

const getTasks = ({ account }, { flash }) => ({
  items: [
    {
      label: 'Reset Password',
      request: {
        method: 'PATCH',
        endpoint: `/api/admin/platform/accounts/${account.id}/reset`,
        onFailure: (result) => flash.set('error', 'Unable to reset the accounts password'),
        onSuccess: (result) => flash.set('success', `A reset email has been sent to ${account.email}`)
      }
    },
    {
      label: 'Sign Out of All Devices',
      request: {
        method: 'PATCH',
        endpoint: `/api/admin/platform/accounts/${account.id}/signout`,
        onFailure: (result) => flash.set('error', 'Unable to sign out this account'),
        onSuccess: (result) => flash.set('success', 'The account has been signed out of all devices')
      }
    }
  ]
})

const mapResourcesToPage = (props, context) => ({
  account: `/api/admin/platform/accounts/${props.params.id}`,
  teams: `/api/admin/platform/accounts/${props.params.id}/teams`
})

const mapPropsToPage = (props, context, resources) => ({
  title: resources.account.full_name,
  tabs: getTabs(resources),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
