import { Form } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Manual extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    q: PropTypes.string,
    onDone: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { q } = this.props
    return {
      title: 'Edit Address',
      cancelIcon: 'chevron-left',
      saveText: 'Done',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Street 1', name: 'street_1', type: 'textfield', placeholder: 'Enter street 1', required: true, defaultValue: q },
            { label: 'Street 2', name: 'street_2', type: 'textfield', placeholder: 'Enter street 2' },
            { label: 'City', name: 'city', type: 'textfield', placeholder: 'Enter city', required: true },
            { label: 'State/Province', name: 'state_province', type: 'textfield', placeholder: 'Enter state/province', required: true },
            { label: 'Postal Code', name: 'postal_code', type: 'textfield', placeholder: 'Enter postal code', required: true }
          ]
        }
      ]
    }
  }

  _getDescription(address) {
    const { street_1, street_2, city, state_province, postal_code } = address
    const parts = [street_1]
    if(street_2) parts.push(street_2)
    parts.push(city)
    parts.push(state_province)
    parts.push(postal_code)
    return parts.join(', ')
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleSuccess(address) {
    this.props.onDone({
      description: this._getDescription(address),
      manual: true,
      ...address,
      country: 'US'
    })
    this.context.form.pop()
  }

}

export default Manual
