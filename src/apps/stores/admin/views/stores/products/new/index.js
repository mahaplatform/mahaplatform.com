import { MultiForm } from '@admin'
import Inventory from './inventory'
import PropTypes from 'prop-types'
import Variants from './variants'
import Shipping from './shipping'
import Product from './product'
import Pricing from './pricing'
import Photos from './photos'
import React from 'react'
import File from './file'
import URL from './url'

class ProductForm extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    store: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <MultiForm { ...this._getMultiForm() } />
  }

  _getMultiForm() {
    const { store } = this.props
    return {
      title: 'New Product',
      action: `/api/admin/stores/stores/${store.id}/products`,
      method: 'post',
      formatData: this._getData,
      props: { store },
      getSteps: this._getSteps.bind(this),
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess
    }
  }

  _getData(product) {
    return {
      title: product.title,
      type: product.type,
      category_ids: product.category_ids,
      description: product.description,
      options: product.options,
      variants: product.variants.map(variant => ({
        is_active: variant.is_active,
        options: variant.options || {},
        photo_ids: variant.photos.map(photo => photo.id),
        price_type: variant.price_type,
        project_id: variant.project_id,
        revenue_type_id: variant.revenue_type_id,
        fixed_price: variant.fixed_price,
        low_price: variant.low_price,
        high_price: variant.high_price,
        overage_strategy: variant.overage_strategy,
        donation_revenue_type_id: variant.donation_revenue_type_id,
        tax_rate: variant.tax_rate,
        inventory_policy: variant.inventory_policy,
        inventory_quantity: variant.inventory_quantity,
        shipping_strategy: variant.shipping_strategy,
        shipping_fee: variant.shipping_fee,
        file_id: variant.file ? variant.file.id : null,
        url: variant.url
      }))
    }
  }

  _getSteps(formdata) {
    return [
      { label: 'Details', component: Product },
      { label: 'Variants', component: Variants },
      { label: 'Photos', component: Photos },
      { label: 'Inventory', component: Inventory },
      { label: 'Pricing', component: Pricing },
      this._getFinalStep(formdata)
    ]
  }

  _getFinalStep(formdata) {
    if(formdata.type === 'file') return{ label: 'File', component: File }
    if(formdata.type === 'url') return { label: 'URL', component: URL }
    return { label: 'Shipping', component: Shipping }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(product) {
    const { store } = this.props
    this.context.router.history.push(`/stores/stores/${store.id}/products/${product.id}`)
    this.context.modal.close()
  }


}

export default ProductForm
