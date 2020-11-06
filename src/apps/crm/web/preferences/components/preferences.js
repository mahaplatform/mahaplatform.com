import PropTypes from 'prop-types'
import { Form } from '@client'
import React from 'react'

class Preferences extends React.Component {

  static propTypes = {
    contact: PropTypes.object,
    email_address: PropTypes.object,
    email_code: PropTypes.string,
    mailing_address: PropTypes.object,
    phone_number: PropTypes.object,
    program: PropTypes.object,
    token: PropTypes.string,
    topics: PropTypes.array,
    type: PropTypes.string
  }

  state = {
    mode: 'form'
  }

  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { contact, program, type } = this.props
    const { mode } = this.state
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
            { mode === 'form' &&
              <div className="maha-form-body">
                <Form { ...this._getForm() } />
              </div>
            }
            { mode === 'thankyou' &&
              <div className="maha-form-thankyou">
                Thank you! We&apos;ve updated your communication preferences!
              </div>
            }
            { mode === 'form' &&
              <div className="maha-form-footer">
                <p>
                  <strong>Disclaimer</strong><br />
                  You may still receive non-marketing or transactional
                  communications if you have signed up for one or more of
                  our services
                </p>
                { type === 'email' &&
                  <p>
                    <strong>Not your email address?</strong><br />
                    An email may have been forwarded to you from a friend or
                    colleague. Please contact them directly to stop receiving
                    forwarded emails
                  </p>
                }
              </div>
            }
          </div>
        </div>
      </div>
    )
  }

  _getEndpoint() {
    const { program, email_code, email_address, phone_number, mailing_address, type } = this.props
    const code = email_code || program.code
    if(type === 'email') return `/api/crm/preferences/email/${code}${email_address.code}`
    if(type === 'sms') return `/api/crm/preferences/sms/${code}${phone_number.code}`
    if(type === 'voice') return `/api/crm/preferences/voice/${code}${phone_number.code}`
    if(type === 'mail') return `/api/crm/preferences/mail/${code}${mailing_address.code}`
  }

  _getForm() {
    const { token } = this.props
    return {
      endpoint: this._getEndpoint(),
      method: 'PATCH',
      captcha: true,
      token,
      fields: this._getFields(),
      submitText: 'Update Preferences',
      onSuccess: this._handleSuccess
    }
  }

  _getFields() {
    const { contact, topics } = this.props
    const options = topics.map(topic => ({
      value: topic.id,
      text: topic.title
    }))
    return [
      { label: 'First Name', name: 'first_name', type: 'textfield', defaultValue: contact.first_name },
      { label: 'Last Name', name: 'last_name', type: 'textfield', defaultValue: contact.last_name },
      this._getChannel(),
      ...topics.length > 0 ? [{ label: 'I am interested in the following topics:', name: 'topic_ids', type: 'checkboxes', options, defaultValue: contact.topic_ids }] : [],
      this._getConsent()
    ]
  }

  _getChannel() {
    const { email_address, mailing_address, phone_number, type } = this.props
    if(type === 'email') {
      return { label: 'Email', name: 'email', type: 'emailfield', defaultValue: email_address.address, disabled: true }
    } else if(type === 'voice') {
      return { label: 'Phone', name: 'phone', type: 'textfield', defaultValue: phone_number.number, disabled: true }
    } else if(type === 'sms') {
      return { label: 'Phone', name: 'phone', type: 'textfield', defaultValue: phone_number.number, disabled: true }
    } else if(type === 'mail') {
      return { label: 'Address', name: 'address', type: 'textfield', defaultValue: mailing_address.address.description, disabled: true }
    }
  }

  _getConsent() {
    const { contact, type } = this.props
    if(contact.optout) {
      if(type === 'email') {
        return { prompt: 'Please contact me with marketing information at this email address', name: 'optin', type: 'checkbox' }
      } else if(type === 'voice') {
        return { prompt: 'Please call me with marketing information at this phone number', name: 'optin', type: 'checkbox' }
      } else if(type === 'sms') {
        return { prompt: 'Please text me with marketing information at this phone number', name: 'optin', type: 'checkbox' }
      } else if(type === 'mail') {
        return { prompt: 'Please send marketing materials to this address', name: 'optin', type: 'checkbox' }
      }
    } else {
      if(type === 'email') {
        return { prompt: 'Please do not send marketing emails to this email address', name: 'optout', type: 'checkbox' }
      } else if(type === 'voice') {
        return { prompt: 'Please do make marketing calls to this phone number', name: 'optout', type: 'checkbox' }
      } else if(type === 'sms') {
        return { prompt: 'Please do not send marketing text messages to this phone number', name: 'optout', type: 'checkbox' }
      } else if(type === 'mail') {
        return { prompt: 'Please do not send marketing materials to this address', name: 'optout', type: 'checkbox' }
      }
    }
  }

  _handleSuccess(result) {
    this.setState({
      mode: 'thankyou'
    })
  }

}

export default Preferences
