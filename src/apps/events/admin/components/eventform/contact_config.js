import ContactFieldsField from '@apps/crm/admin/components/contactfieldsfield'
import { Form } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class ContactConfig extends React.PureComponent {

  static propTypes = {
    event: PropTypes.object,
    onBack: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { event } = this.props
    return {
      title: 'Contact Fields',
      cancelIcon: 'chevron-left',
      saveText: 'Next',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'contact_config', type: ContactFieldsField, program: event.program, defaultValue: event.contact_config }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange({ contact_config }) {
    this.props.onChange({ contact_config })
  }

  _handleSuccess({ contact_config }) {
    this.props.onDone({ contact_config })
  }

}

export default ContactConfig
