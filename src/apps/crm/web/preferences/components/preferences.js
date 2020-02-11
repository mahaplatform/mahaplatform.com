import PropTypes from 'prop-types'
import { Form } from 'maha-client'
import React from 'react'

class Preferences extends React.Component {

  static propTypes = {
    contact: PropTypes.object,
    email_address: PropTypes.object,
    mailing_address: PropTypes.object,
    phone_number: PropTypes.object,
    program: PropTypes.object,
    token: PropTypes.string,
    topics: PropTypes.array
  }

  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { contact, email_address, mailing_address, phone_number, program, topics } = this.props
    return (
      <div className="overlay">
        <div className="preferences">
          <div className="maha-form">
            <div className="maha-form-header">
              <div className="maha-form-header-logo">
                <img src={`/imagecache/fit=cover&w=80&h=80${program.logo}`} />
              </div>
              <div className="maha-form-header-details">
                <h1>{ program.title }</h1>
                <p><strong>Communication Preferences for { contact.full_name }</strong></p>
              </div>
            </div>
            <div className="maha-form-body">
              <Form { ...this._getForm() } />
            </div>
            <div className="maha-form-footer">
              <p><strong>Not your email address?</strong></p>
              <p>
                An email may have been forwarded to you from a friend or
                colleague. Please contact them directly to stop receiving
                forwarded emails
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _getForm() {
    const { token } = this.props
    return {
      endpoint: '/api/crm/preferences',
      method: 'POST',
      captcha: false,
      token,
      fields: this._getFields(),
      submitText: 'Update Preferences',
      onSuccess: this._handleSuccess
    }
  }

  _getFields() {
    const { contact, email_address, mailing_address, phone_number, topics } = this.props
    const options = topics.map(topic => ({
      value: topic.id,
      text: topic.title
    }))
    const fields = [
      { label: 'First Name', name: 'first_name', type: 'textfield', defaultValue: contact.first_name },
      { label: 'Last Name', name: 'last_name', type: 'textfield', defaultValue: contact.last_name }
    ]
    if(email_address) {
      fields.push({ label: 'Email', name: 'email', type: 'emailfield', defaultValue: email_address.address, disabled: true })
    } else if (phone_number) {
      fields.push({ label: 'Phone', name: 'phone', type: 'textfield', defaultValue: phone_number.number, disabled: true })
    } else if (mailing_address) {
      fields.push({ label: 'Address', name: 'address', type: 'textfield', defaultValue: mailing_address.address.description, disabled: true })
    }
    fields.push({ label: 'I am interested in the following topics:', name: 'topic_ids', type: 'checkboxes', options })
    if(email_address) {
      fields.push({ prompt: 'Please do not send marketing emails to this email address', name: 'consent', type: 'checkbox' })
    } else if (phone_number) {
      fields.push({ prompt: 'Please do not send marketing text messages to this phone number', name: 'consent', type: 'checkbox' })
      fields.push({ prompt: 'Please do make marketing calls to this phone number', name: 'consent', type: 'checkbox' })
    } else if (mailing_address) {
      fields.push({ prompt: 'Please do not send marketing materials to this address', name: 'consent', type: 'checkbox' })
    }
    return fields
  }

  _handleSuccess(result) {
    console.log(result)
  }

}

export default Preferences
