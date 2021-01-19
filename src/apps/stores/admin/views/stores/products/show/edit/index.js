import { MultiForm } from '@admin'
import PropTypes from 'prop-types'
import Details from './details'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    variant: PropTypes.object,
    store: PropTypes.object
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

  _getData(store) {
    return {
      contact_config: store.contact_config,
      permalink: store.permalink,
      title: store.title
    }
  }

  _getSteps(formdata) {
    return [
      { label: 'Details', component: Details }
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
