import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    product: PropTypes.object,
    store: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { product, store } = this.props
    return {
      title: 'Edit Product',
      method: 'patch',
      endpoint: `/api/admin/stores/stores/${store.id}/products/${product.id}/edit`,
      action: `/api/admin/stores/stores/${store.id}/products/${product.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true, placeholder: 'Enter title' },
            { label: 'Categories', name: 'category_ids', type: 'checkboxes', endpoint: `/api/admin/stores/stores/${store.id}/categories`, value: 'id', text: 'title', required: true, placeholder: 'Choose a category' },
            { label: 'Description', name: 'description', type: 'htmlfield', placeholder: 'Enter an optional description' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Edit
