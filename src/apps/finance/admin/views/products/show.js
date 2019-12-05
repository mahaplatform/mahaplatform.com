import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ product }) => {

  const items = [
    { label: 'Details', component: <Details product={ product }/> }
  ]

  return { items }

}

const getTasks = ({ product }) => {

  const items = []

  return { items }
}

const mapResourcesToPage = (props, context) => ({
  product: `/api/admin/finance/products/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Products',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
