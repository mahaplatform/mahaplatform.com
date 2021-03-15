import DomainTypeToken from '@apps/websites/admin/tokens/domain_type'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Type extends React.Component {

  static propTypes = {
    onNext: PropTypes.func
  }

  _handleFailure = this._handleFailure.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Domain Type',
      saveText: 'Next',
      cancelText: null,
      cancelIcon: 'chevron-left',
      onFailure: this._handleFailure,
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

  _handleFailure() {
    this.setState({
      resend: true
    })
  }

  _handleSuccess() {
    this.props.onNext()
  }

}

export default Type
