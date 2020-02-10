import PropTypes from 'prop-types'
import Button from './button'
import Fields from './fields'
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

  render() {
    return (
      <div className="ui form">
        <Fields { ...this._getFields() } />
        <Button { ...this._getButton() } />
      </div>
    )
  }

  _getButton() {
    return {
      label: 'Update Preferences',
      color: 'blue'
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
      fields.push({ label: 'Email', name: 'email', type: 'emailfield', defaultValue: email_address.address })
    } else if (phone_number) {
      fields.push({ label: 'Phone', name: 'phone', type: 'textfield', defaultValue: phone_number.number })
    } else if (mailing_address) {
      fields.push({ label: 'Address', name: 'address', type: 'textfield', defaultValue: mailing_address.address.description })
    }
    fields.push({ label: 'I am interested in the following topics:', name: 'topic_ids', type: 'checkboxes', options })
    if(email_address) {
      fields.push({ prompt: 'Please do not send marketing emails to this email address', name: 'consent', type: 'confirmation' })
    } else if (phone_number) {
      fields.push({ prompt: 'Please do not send marketing text messages to this phone number', name: 'consent', type: 'confirmation' })
      fields.push({ prompt: 'Please do make marketing calls to this phone number', name: 'consent', type: 'confirmation' })
    } else if (mailing_address) {
      fields.push({ prompt: 'Please do not send marketing materials to this address', name: 'consent', type: 'confirmation' })
    }
    return {
      data: {},
      errors: {},
      fields
    }
  }

}

export default Preferences
