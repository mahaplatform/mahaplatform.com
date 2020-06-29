import { Page } from 'maha-admin'
import Payments from './payments'
import Details from './details'
import React from 'react'
import _ from 'lodash'

const getTabs = ({ audits, disbursement, payments }) => ({
  items: [
    { label: 'Details', component: <Details audits={ audits } disbursement={ disbursement } /> },
    { label: 'Payments', component: <Payments disbursement={ disbursement } payments={ payments } /> }
  ]
})

const getTasks = ({ disbursement }, { team, rights }) => {
  if(disbursement.status === 'pending' || !_.includes(rights, 'finance:manage_configuration')) return null
  return {
    items: [
      {
        label: 'Download Export',
        url: `/api/admin/finance/disbursements/${disbursement.id}/export.csv?$page[limit]=0&download=true&enclosure="&token=${team.token}`
      }
    ]
  }
}

const getButtons = ({ disbursement }, { team, rights }) => {

  if(disbursement.status === 'pending' && _.includes(rights, 'finance:manage_configuration')) {

    return [
      {
        color: 'purple',
        text: 'Export',
        request: {
          endpoint: `/api/admin/finance/disbursements/${disbursement.id}/export`,
          method: 'post',
          onSuccess: () => {
            window.location.href = `/api/admin/finance/disbursements/${disbursement.id}/export.csv?$page[limit]=0&download=true&enclosure="&token=${team.token}`
          }
        }
      }
    ]

  }

  return null

}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/finance_disbursements/${props.params.id}/audits`,
  disbursement: `/api/admin/finance/disbursements/${props.params.id}`,
  payments: `/api/admin/finance/disbursements/${props.params.id}/payments`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Disbursement',
  tabs: getTabs(resources, props),
  tasks: getTasks(resources, props),
  buttons: getButtons(resources, props)
})

export default Page(mapResourcesToPage, mapPropsToPage)
