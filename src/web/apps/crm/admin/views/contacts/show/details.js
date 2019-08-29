import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ contact }) => {

  const list = {}

  list.items = [
    { label: 'Created', content: contact.created_at, format: 'date' },
    { label: 'Email', content: contact.email_addresses.map((email_address, index) => (
      <div key={`address_${index}`}>
        { email_address.address } { email_address.is_primary && <span>[primary]</span> }
      </div>
    )) },
    { label: 'Phone', content: contact.phone_numbers.map((phone_number, index) => (
      <div key={`number_${index}`}>
        { phone_number.number } { phone_number.is_primary && <span>[primary]</span> }
      </div>
    )) },
    { label: 'Organizations', content: (
      <div className="links">
        { contact.organizations.map((organization, index) => (
          <Button label={ organization.name } route={`/admin/crm/organizations/${organization.id}`} className="link" key={`organization_${index}`} />
        )) }
      </div>
    ) },
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
