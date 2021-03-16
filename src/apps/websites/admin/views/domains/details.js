import PropTypes from 'prop-types'
import { Audit, Comments, List } from '@admin'
import React from 'react'

const Details = ({ audits, domain }) => {

  const list = {
    items: [
      { label: 'Name', content: domain.name },
      { label: 'Type', content: domain.type }
    ],
    footer: <Comments entity={`websites_domains/${domain.id}`} />
  }

  if(domain.type === 'registration') {
    list.items.push({ label: 'Registration Status', content: domain.registration_status })
  }

  if(domain.type === 'transfer') {
    list.items.push({ label: 'Transfer Status', content: domain.transfer_status })
  }

  list.items.push({ label: 'DNS Status', content: domain.dns_status })

  list.items.push({ component: <Audit entries={ audits } /> })


  return <List { ...list } />

}

Details.propTypes = {
  audits: PropTypes.array,
  domain: PropTypes.object
}

export default Details
