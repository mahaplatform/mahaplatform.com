import OfferingToken from '../../tokens/offering_token'
import { AssetToken, List, Page } from 'maha-admin'
import NewOffering from '../offerings/new'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ training }) => {

  const list = {}

  list.items = [
    { label: 'Title', content: training.title },
    { label: 'Description', content: training.description }
  ]

  if(training.url) {
    list.items.push({ label: 'URL', content: <a href={ training.url } target="_blank">{ training.url }</a> })
  }
  if(training.location) {
    list.items.push({ label: 'Location', content: training.location })
  }
  if(training.contact) {
    list.items.push({ label: 'Contact', content: training.contact })
  }


  return <List { ...list } />

}

Details.propTypes = {
  training: PropTypes.object
}

const Materials = ({ materials }) => {

  const list = {
    items: materials.map(asset => ({
      content: asset,
      link: `/admin/assets/${asset.id}`,
      component: AssetToken
    })),
    empty: {
      icon: 'calendar',
      title: 'No offerings',
      text: 'There are no offerings for this training'
    }
  }

  return <List { ...list } />

}

Materials.propTypes = {
  materials: PropTypes.array
}

const Quizes = ({ training }) => {

  return <div />

}

Quizes.propTypes = {
  training: PropTypes.object
}

const Offerings = ({ training, offerings }) => {

  const list = {
    items: offerings.map(offering => ({
      link: `/admin/learning/trainings/${training.id}/offerings/${offering.id}`,
      content: offering,
      component: OfferingToken
    })),
    empty: {
      icon: 'calendar',
      title: 'No offerings',
      text: 'There are no offerings for this training',
      button: {
        label: 'Create Offering',
        modal: <NewOffering training={ training } />
      }
    }
  }

  return <List { ...list } />

}

Offerings.propTypes = {
  offerings: PropTypes.array
}

const mapResourcesToPage = (props, context) => ({
  training: `/api/admin/learning/trainings/${props.params.id}`,
  offerings: `/api/admin/learning/trainings/${props.params.id}/offerings`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Training',
  tabs: {
    items: [
      { label: 'Details', component: <Details training={ resources.training } /> },
      { label: 'Materials', component: <Materials materials={ resources.training.materials } /> },
      { label: 'Quizes', component: <Quizes training={ resources.training } /> },
      { label: 'Offerings', component: <Offerings training={ resources.training } offerings={ resources.offerings } /> }
    ]
  },
  tasks: {
    items: [
      { label: 'Create Offering', modal: <NewOffering training={ resources.training } /> }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
