import { List, Page } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'

const Details = ({ settings }) => {

  const sections = []

  sections.push({
    label: 'Payments',
    items: [
      { label: 'ACH ', content: settings.ach_enabled ? 'ENABLED' : 'DISABLED' },
      { label: 'ApplePay ', content: settings.applepay_enabled ? 'ENABLED' : 'DISABLED' },
      { label: 'GooglePay ', content: settings.googlepay_enabled ? 'ENABLED' : 'DISABLED' },
      { label: 'PayPal', content: settings.paypal_enabled ? 'ENABLED' : 'DISABLED' }
    ]
  })

  return <List sections={ sections } />

}

Details.propTypes = {
  settings: PropTypes.object
}

const getTabs = ({ settings }) => ({
  items:  [
    { label: 'Details', component: <Details settings={ settings } /> }
  ]
})

const getTasks = ({ team }) => ({
  items: [
    {
      label: 'Edit Settings',
      modal: <Edit />
    }
  ]
})

const mapResourcesToPage = (props, context) => ({
  settings: '/api/admin/platform/settings'
})

const mapPropsToPage = (props, context, resources) => ({
  title: 'Platform Settings',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
