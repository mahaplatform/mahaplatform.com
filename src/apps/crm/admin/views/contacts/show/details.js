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

  list.items = [
    { label: 'Email Addresses', content: contact.email_addresses.map((email_address, index) => (
      <div key={`email_address_${index}`}>
        { email_address.address } { email_address.is_primary && <span className="alert">PRIMARY</span> }
      </div>
    )) },
    { label: 'Phone Numbers', content: contact.phone_numbers.map((phone_number, index) => (
      <div key={`number_${index}`}>
        { phone_number.formatted } { phone_number.is_primary && <span className="alert">PRIMARY</span> }
      </div>
    )) },
    { label: 'Mailing Addresses', content: contact.mailing_addresses.map((mailing_address, index) => (
      <div key={`mailing_address_${index}`}>
        <div>
          { mailing_address.address.street_1 } { mailing_address.is_primary && <span className="alert">PRIMARY</span> }
        </div>
        { mailing_address.address.street_2 &&
          <div>{ mailing_address.address.street_2 }</div>
        }
        <div>
          { mailing_address.address.city }, { mailing_address.address.state_province } { mailing_address.address.postal_code }
        </div>
      </div>
    )) },
    { label: 'Organizations', content: contact.organizations.map((organization, index) => (
      <div key={`organization_${index}`}>
        { organization.name }
      </div>
    )) },
    { label: 'Birthday', content: contact.birthday },
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
