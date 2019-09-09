import LawfulGroundsToken from '../../tokens/lawful_grounds'
import ConsentField from '../../components/consentfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Consent extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    platform: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    contact: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { contact } = this.props
    return {
      title: 'Manage Consent',
      method: 'patch',
      endpoint: `/api/admin/crm/contacts/${contact.id}/consent/edit`,
      action: `/api/admin/crm/contacts/${contact.id}/consent`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Legal Reason', name: 'lawful_grounds', type: 'lookup', options: ['consent','contract','legal obligation','vital interests','public interest','legitimate interest'], format: LawfulGroundsToken },
            { name: 'consent', type: ConsentField, endpoint: `/api/admin/crm/contacts/${contact.id}/consent` }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.modal.close()
  }

}

export default Consent
