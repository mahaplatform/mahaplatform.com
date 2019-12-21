import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class New extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    products: PropTypes.array,
    onSubmit: PropTypes.func
  }

  state = {
    product_id: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
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
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Product', name: 'product_id', required: true, type: 'lookup', placeholder: 'Choose a product', endpoint: '/api/admin/finance/products', value: 'id', text: 'title' },
            ...this._getProductFields()
          ]
        }
      ]
    }
  }

  _getProductFields() {
    const { product_id } = this.state
    const { products } = this.props
    if(!product_id) return []
    const product = _.find(products, { id: product_id })
    const fields = []
    fields.push({ label: 'Description', name: 'description', required: true, type: 'textfield', placeholder: 'Describe this item', defaultValue: product.title })
    fields.push({ label: 'Quantity', name: 'quantity', required: true, type: 'numberfield', numberType: 'integer', placeholder: 'Enter a quantity' })
    return fields
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleChangeField(key, value) {
    if(key === 'product_id') {
      this.setState({
        product_id: value
      })
    }
  }

  _handleSubmit(line_item) {
    const { products } = this.props
    const { product_id, description, quantity } = line_item
    const product = _.find(products, { id: product_id })
    const { price, tax_rate } = product
    this.props.onSubmit({
      product_id,
      description,
      price,
      quantity,
      tax_rate
    })
    return true
  }

  _handleSuccess(result) {
    this.context.form.pop()
  }

}

export default New
