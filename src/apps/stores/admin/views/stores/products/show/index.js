import Variants from './variants'
import { Page } from '@admin'
import Details from './details'
import React from 'react'

const getTabs = ({ audits, product }) => ({
  items: [
    { label: 'Details', component: <Details product={ product } audits={ audits } /> },
    { label: 'Variants', component: <Variants /> }
  ]
})

const getTasks = ({ product, store }, { flash, router }) => {

  if(product.deleted_at) return {}

  return {
    items: [
      // { label: 'Edit Product', modal: <Edit store={ product } /> },
      {
        label: 'Delete Product',
        confirm: `
          Are you sure you want to delete this product? You will also delete all of
          the associated variants
        `,
        request: {
          endpoint: `/api/admin/stores/stores/${store.id}/products/${product.id}`,
          method: 'delete',
          onFailure: () => {
            flash.set('error', 'Unable to delete this product')
          },
          onSuccess: () => {
            flash.set('success', 'The product was successfuly deleted')
            router.history.goBack()
          }

        }
      }
    ]
  }

}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/stores_products/${props.params.id}/audits`,
  product: `/api/admin/stores/stores/${props.params.store_id}/products/${props.params.id}`,
  store: `/api/admin/stores/stores/${props.params.store_id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Product',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
