import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    coupon: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  constructor(props) {
    super(props)
    this.state = {
      type: props.coupon.type
    }
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { coupon } = this.props
    return {
      title: 'Edit Coupon',
      method: 'patch',
      endpoint: `/api/admin/finance/coupons/${coupon.id}/edit`,
      action: `/api/admin/finance/coupons/${coupon.id}`,
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Code', name: 'code', type: 'textfield', placeholder: 'Enter a code', required: true },
            { label: 'Product', name: 'product_id', type: 'lookup', placeholder: 'Choose a product', endpoint: '/api/admin/finance/products', value: 'id', text: 'title', required: true },
            { label: 'Type', name: 'type', type: 'radiogroup', options: [{value:'amount',text:'Fixed Amount'},{value:'percent',text:'Percent'}], required: true },
            ...this._getType(),
            {
              label: 'Restrictions',
              type: 'segment',
              fields: [
                { type: 'fields', fields: [
                  { label: 'Start Date', name: 'start_date', type: 'datefield', placeholder: 'Enter a start date'},
                  { label: 'End Date', name: 'end_date', type: 'datefield', placeholder: 'Enter an end date'}
                ] },
                { label: 'Max Uses', name: 'max_uses', type: 'numberfield', number_type: 'integer', placeholder: 'Enter a number, leave blank for infininte'}
              ]
            }
          ]
        }
      ]
    }
  }

  _getType() {
    const { type } = this.state
    if(type === 'amount') {
      return [
        { label: 'Amount', name: 'amount', type: 'moneyfield', placeholder: 'Enter an amount' }
      ]
    } else {
      return [
        { label: 'Percent', name: 'percent', type: 'moneyfield', placeholder: 'Enter a percent' }
      ]
    }
  }
  
  _handleCancel() {
    this.context.modal.close()
  }

  _handleChangeField(key, value) {
    if(key === 'type') {
      this.setState({
        type: value
      })
    }
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Edit
