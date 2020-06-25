import VariantsField from '../../components/variantsfield'
import OptionsField from '../../components/optionsfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Product',
      method: 'post',
      action: '/api/admin/stores/products',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true, placeholder: 'Enter title' },
            { label: 'Description', name: 'description', type: 'htmlfield', placeholder: 'Enter an optional description' },
            { label: 'Base Pricing', name: 'pricing', type: 'pricefield' },
            { label: 'Options', name: 'options', type: OptionsField },
            { label: 'Variants', name: 'variants', type: VariantsField }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.router.history.push(`/admin/stores/products/${result.id}`)
    this.context.modal.close()
  }

}

export default New
