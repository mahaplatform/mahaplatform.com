import { MultiForm } from '@admin'
import PropTypes from 'prop-types'
import Pricing from './pricing'
import Photos from './photos'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    product: PropTypes.object,
    store: PropTypes.object,
    variant: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <MultiForm { ...this._getMultiForm() } />
  }

  _getMultiForm() {
    const { store, product, variant } = this.props
    return {
      title: 'Edit Variant',
      endpoint: `/api/admin/stores/stores/${store.id}/products/${product.id}/variants/${variant.id}/edit`,
      action: `/api/admin/stores/stores/${store.id}/products/${product.id}/variants/${variant.id}`,
      method: 'patch',
      formatData: this._getData,
      getSteps: this._getSteps,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess
    }
  }

  _getData(variant) {
    return {
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
    }
  }

  _getSteps(formdata) {
    return [
      { label: 'Photos', component: Photos },
      { label: 'Pricing', component: Pricing }
    ]
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(store) {
    this.context.modal.close()
  }

}

export default Edit
