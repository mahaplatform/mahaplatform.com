import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    projectEndpoint: PropTypes.string,
    onSubmit: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Line Item',
      saveText: 'Done',
      onSubmit: this._handleSubmit,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Product', name: 'product_id', required: true, type: 'lookup', placeholder: 'Choose a product', endpoint: '/api/admin/finance/products', value: 'id', text: 'title' },
            { label: 'Quantity', name: 'quantity', required: true, type: 'textfield', placeholder: 'Enter a quanity' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleSubmit(line_item) {
    this.props.onSubmit(line_item)
    return true
  }

  _handleSuccess(result) {
    this.context.form.pop()
  }

}

export default New
