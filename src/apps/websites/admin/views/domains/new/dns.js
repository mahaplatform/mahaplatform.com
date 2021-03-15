import DomainTypeToken from '@apps/websites/admin/tokens/domain_type'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Register extends React.Component {

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
      showHeader: false,
      buttons: [
        { label: 'Prev', color: 'red', handler: this._handleBack },
        { label: 'Next', color: 'red', handler: this._handleSubmit }
      ],
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'type', type: 'radiogroup', deselectable: false, options: ['register','transfer','dns'], format: DomainTypeToken, defaultValue: 'register' }
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
    this.props.onNext(store)
  }

}

export default Register
