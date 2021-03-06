import ContactField from '@apps/websites/admin/components/contactfield'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Contacts extends React.Component {

  static propTypes = {
    formdata: PropTypes.object,
    onBack: PropTypes.func,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onNext: PropTypes.func,
    onSave: PropTypes.func
  }

  form = null

  state = {
    domain: {}
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { domain } = this.state
    return {
      reference: node => this.form = node,
      showHeader: false,
      buttons: [
        { label: 'Prev', color: 'red', handler: this._handleBack },
        { label: 'Save', color: 'red', handler: this._handleSubmit }
      ],
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Registrant Contact', name: 'registrant_contact', type: ContactField, required: true  },
            { label: 'Admin Contact', type: 'segment', fields: [
              { name: 'admin_strategy', type: 'radiogroup', deselectable: false, options: [
                { value: 'registrant', text: 'Use registrant contact' },
                { value: 'custom', text: 'Custom contact' }
              ], defaultValue: 'registrant' },
              ...domain.admin_strategy === 'custom' ? [
                { name: 'admin_contact', type: ContactField  }
              ] : []
            ] },
            { label: 'Technical Contact', type: 'segment', fields: [
              { name: 'tech_strategy', type: 'radiogroup', deselectable: false, options: [
                { value: 'registrant', text: 'Use registrant contact' },
                { value: 'custom', text: 'Custom contact' }
              ], defaultValue: 'registrant' },
              ...domain.tech_strategy === 'custom' ? [
                { name: 'tech_contact', type: ContactField  }
              ] : []
            ] }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange(domain) {
    this.setState({ domain })
  }

  _handleSubmit() {
    this.form.submit()
  }

  _handleSuccess(store) {
    this.props.onSave(store)
  }

}

export default Contacts
