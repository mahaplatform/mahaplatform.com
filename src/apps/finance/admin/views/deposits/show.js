import { Page } from 'maha-admin'
import Payments from './payments'
import Details from './details'
import React from 'react'
import _ from 'lodash'

const getTabs = ({ audits, deposit, payments }) => ({
  items: [
    { label: 'Details', component: <Details audits={ audits } deposit={ deposit } /> },
    { label: 'Payments', component: <Payments deposit={ deposit } payments={ payments } /> }
  ]
})

const getTasks = ({ deposit }, { team, rights }) => {
  if(deposit.status === 'pending' || !_.includes(rights, 'finance:manage_configuration')) return null
  return {
    items: [
      {
        label: 'Download Export',
        url: `/api/admin/finance/deposits/${deposit.id}/export.csv?$page[limit]=0&download=true&enclosure="&token=${team.token}`
      }
    ]
  }
}

const getButtons = ({ deposit }, { team, rights }) => {

  if(deposit.status === 'pending' && _.includes(rights, 'finance:manage_configuration')) {

    return [
      {
        color: 'purple',
        text: 'Export',
        request: {
          endpoint: `/api/admin/finance/deposits/${deposit.id}/export`,
          method: 'post',
          onSuccess: () => {
            window.location.href = `/api/admin/finance/deposits/${deposit.id}/export.csv?$page[limit]=0&download=true&enclosure="&token=${team.token}`
          }
        }
      }
    ]

  }

  return null

}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/finance_deposits/${props.params.id}/audits`,
  deposit: `/api/admin/finance/deposits/${props.params.id}`,
  payments: `/api/admin/finance/deposits/${props.params.id}/payments`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Deposit',
  tabs: getTabs(resources, props),
  tasks: getTasks(resources, props),
  buttons: getButtons(resources, props)
})

export default Page(mapResourcesToPage, mapPropsToPage)
