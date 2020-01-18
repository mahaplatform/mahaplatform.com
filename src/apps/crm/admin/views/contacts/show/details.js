import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ contact }) => {

  const list = {}

  list.items = [
    { label: 'Created', content: contact.created_at, format: 'date' },
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
    { label: 'Tags', content: (
      <div className="links">
        { contact.tags.map((tag, index) => (
          <Button label={ tag.text } route={`/admin/crm/contacts?$filter[crm_taggings.tag_id][$in]=${tag.id}`} className="link" key={`tag_${index}`} />
        )) }
      </div>
    ) }
  ]

  return <List { ...list } />

}

Details.propTypes = {
  contact: PropTypes.object
}

export default Details
