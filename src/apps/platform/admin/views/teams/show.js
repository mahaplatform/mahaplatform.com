import MerchantToken from '../../tokens/merchant'
import { AppToken, List, Page } from 'maha-admin'
import PropTypes from 'prop-types'
import Merchant from './merchant'
import React from 'react'
import Edit from './edit'

const Details = ({ team }) => {

  const items = [
    { label: 'Title ', content: team.title },
    { label: 'Team Name ', content: team.subdomain },
    { label: 'Authentication', content: team.authentication_strategy }
  ]

  return <List items={ items } />

}

Details.propTypes = {
  team: PropTypes.object
}

const Apps = ({ apps }) => {

  const items = apps.map((app, index) => ({
    component: <AppToken { ...app } />,
    extra: app.installed ? <span className="red">INSTALLED</span> : null
  }))

  return <List items={ items } />

}

Apps.propTypes = {
  apps: PropTypes.array
}

const Merchants = ({ merchants }) => {

  const items = merchants.map(merchant => ({
    component: <MerchantToken merchant={ merchant } />
  }))

  return <List items={ items } />

}

Merchants.propTypes = {
  merchants: PropTypes.array
}


const getTabs = ({ team, apps, merchants }) => ({
  items:  [
    { label: 'Details', component: <Details team={ team } /> },
    { label: 'Apps', component: <Apps apps={ apps } /> },
    { label: 'Bank Accounts', component: <Merchants merchants={ merchants } /> }
  ]
})

const getTasks = ({ team }) => ({
  items: [
    {
      label: 'Edit Team',
      modal: <Edit team_id={ team.id } />
    }, {
      label: 'Add Bank Account',
      modal: <Merchant team_id={ team.id } />
    }
  ]
})

const mapResourcesToPage = (props, context) => ({
  apps: `/api/admin/platform/teams/${props.params.id}/apps`,
  merchants: `/api/admin/platform/teams/${props.params.id}/merchants`,
  team: `/api/admin/platform/teams/${props.params.id}`
})

const mapPropsToPage = (props, context, resources) => ({
  title: resources.team.title,
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
