import PropTypes from 'prop-types'
import { Audit, Button, Comments, List } from '@admin'
import React from 'react'

const Details = ({ audits, domain }, { flash }) => {

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

  if(domain.dns_status === 'pending') {

    const dns_status = {
      label: 'check',
      className: 'link',
      request: {
        endpoint: `/api/admin/websites/domains/${domain.id}/dns`,
        method: 'patch',
        onFailure: () => flash.set('error', 'Unable to confirm nameservers')
      }
    }

    list.items.push({ label: 'DNS Status', content: (
      <span>
        <i className="fa fa-circle-o-notch fa-spin fa-fw" /> awaiting pointer (
        <Button { ...dns_status } />)
      </span>
    ) })

  } else if(domain.dns_status === 'success') {
    list.items.push({ label: 'DNS Status', content: (
      <span>
        <i className="fa fa-check-circle-o" /> mapped
      </span>
    ) })
  }

  list.items.push({ component: <Audit entries={ audits } /> })


  return <List { ...list } />

}

Details.propTypes = {
  audits: PropTypes.array,
  domain: PropTypes.object
}

Details.contextTypes = {
  flash: PropTypes.object
}

export default Details
