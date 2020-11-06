import RevenueTypeToken from '../../tokens/revenue_type'
import ProjectToken from '../../tokens/project'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    products: PropTypes.array,
    onDone: PropTypes.func
  }

  state = {
    line_item: null
  }

  _handleCancel = this._handleCancel.bind(this)
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
            { label: 'Project', name: 'project_id', type: 'lookup', placeholder: 'Choose a Project', endpoint: '/api/admin/finance/memberships', value: 'id', text: 'title', required: true, format: ProjectToken },
            { label: 'Revenue Type', name: 'revenue_type_id', type: 'lookup', placeholder: 'Choose a Revenue Type', endpoint: '/api/admin/finance/revenue_types', value: 'id', text: 'title', required: true, format: RevenueTypeToken },
            { label: 'Description', name: 'description', required: true, type: 'textfield', placeholder: 'Describe this item' },
            { label: 'Unit Price', name: 'price', required: true, type: 'moneyfield', placeholder: '0.00' },
            { label: 'Tax Rate', name: 'tax_rate', required: true, type: 'number', placeholder: '0.000' },
            { label: 'Quantity', name: 'quantity', required: true, type: 'numberfield', number_type: 'integer', placeholder: 'Enter a quantity' },
            { label: 'Tax Deductible?', name: 'is_tax_deductible', type: 'checkbox', prompt: 'Is this product tax deductable?', defaultValue: false }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleSuccess(line_item) {
    this.props.onDone(line_item)
    this.context.form.pop()
  }

}

export default New
