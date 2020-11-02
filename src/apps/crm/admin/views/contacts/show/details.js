import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ contact, duplicates }) => {

  const list = {}

  const getButton = (contact) => ({
    label: contact.full_name,
    className: 'link',
    route: `/admin/crm/contacts/${contact.id}`
  })

  const getEmailIcon = (email_address) => {
    if(email_address.was_hard_bounced) {
      return <i className="fa fa-fw fa-exclamation-circle" title="An email delivered to this address was hard bounced" />
    }
    if(email_address.soft_bounce_count > 0) {
      return <i className="fa fa-fw fa-exclamation-circle" title={`${email_address.soft_bounce_count} emails delivered to this address were soft bounced`} />
    }
    if(!email_address.is_valid) {
      return <i className="fa fa-fw fa-exclamation-circle" title="This is an invalid email" />
    }
    return <i className="fa fa-fw fa-envelope-o" />
  }

  const getPhoneIcon = (phone_number) => {
    if(phone_number.undelivered_count > 0) {
      return <i className="fa fa-fw fa-exclamation-circle" title={`${phone_number.undelivered_count} sms messages sent to this number were unabled to be delivered`} />
    }
    return <i className="fa fa-fw fa-phone" />
  }

  list.items = [
    { label: 'Email Addresses', content: contact.email_addresses.map((email_address, index) => (
      <div key={`email_address_${index}`}>
        { getEmailIcon(email_address) } { email_address.address } { email_address.is_primary && <span className="alert">PRIMARY</span> }
      </div>
    )) },
    { label: 'Phone Numbers', content: contact.phone_numbers.map((phone_number, index) => (
      <div key={`number_${index}`}>
        { getPhoneIcon(phone_number) } { phone_number.formatted } { phone_number.is_primary && <span className="alert">PRIMARY</span> }
      </div>
    )) },
    { label: 'Mailing Addresses', content: contact.mailing_addresses.map((mailing_address, index) => (
      <div key={`mailing_address_${index}`}>
        <div>
          { mailing_address.address.street_1 }
        </div>
        { mailing_address.address.street_2 &&
          <div>{ mailing_address.address.street_2 }</div>
        }
        <div>
          { mailing_address.address.city }, { mailing_address.address.state_province } { mailing_address.address.postal_code } { mailing_address.is_primary && <span className="alert">PRIMARY</span> }
        </div>
      </div>
    )) },
    { label: 'Organization', content: contact.organization },
    { label: 'Job Title', content: contact.position },
    { label: 'Birthday', content: contact.birthday, format: 'date' },
    { label: 'Spouse', content: contact.spouse },
    ...duplicates.length > 0 ? [
      { label: 'Potential Duplicates', color: 'yellow', content: (
        <div>
          { duplicates.map((contact, index) => (
            <div key={`duplicate_${index}`}>
              <Button { ...getButton(contact)} />
            </div>
          ))}
        </div>
      ) }
    ] : [],
    { label: 'Created', content: contact.created_at, format: 'date' }
  ]

  return <List { ...list } />

}

Details.propTypes = {
  contact: PropTypes.object,
  duplicates: PropTypes.array
}

export default Details
