import DomainTypeToken from '@apps/websites/admin/tokens/domain_type'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Transfer extends React.Component {

  static propTypes = {
    formdata: PropTypes.object,
    onBack: PropTypes.func,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onNext: PropTypes.func,
    onSave: PropTypes.func
  }

  form = null

  _handleBack = this._handleBack.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      reference: node => this.form = node,
      action: '/api/admin/websites/domains/auth',
      method: 'GET',
      showHeader: false,
      buttons: [
        { label: 'Prev', color: 'red', handler: this._handleBack },
        { label: 'Save', color: 'red', handler: this._handleSubmit }
      ],
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Domain Name', name: 'name', type: 'textfield', placeholder: 'Enter Domain Name' },
            { label: 'Auth Code', name: 'auth_code', type: 'textfield', placeholder: 'Enter Auth Code' }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleSubmit() {
    this.form.submit()
  }

  _handleSuccess(store) {
    this.props.onSave(store)
  }

}

export default Transfer
