import DomainStatusToken from '@apps/websites/admin/tokens/domain_status'
import ContactToken from '@apps/websites/admin/tokens/contact'
import { Audit, Comments, List } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ audits, domain, records }, { flash }) => {

  const list = {
    items: [
      { label: 'Name', content: domain.name },
      { label: 'Type', content: domain.type }
    ],
    footer: <Comments entity={`websites_domains/${domain.id}`} />
  }

  if(domain.type === 'registration') {
    list.items.push({ label: 'Registration Status', content: (
      <DomainStatusToken status={ domain.registration_status } />
    ) })
  }

  if(domain.type === 'transfer') {
    list.items.push({ label: 'Transfer Status', content: (
      <DomainStatusToken status={ domain.transfer_status } />
    ) })
  }

  if(domain.type === 'dns') {
    const check = {
      label: 'check',
      className: 'link',
      request: {
        endpoint: `/api/admin/websites/domains/${domain.id}/dns`,
        method: 'patch',
        onFailure: () => flash.set('error', 'Unable to confirm nameservers')
      }
    }
    list.items.push({ label: 'DNS Status', content: (
      <DomainStatusToken status={ domain.dns_status } check={ check } />
    ) })
    const ns = records.find(record => {
      return record.type === 'NS'
    })
    list.items.push({ label: 'Name Servers', content: (
      <>
        { ns.records.map((record, index) => (
          <div key={`record_${index}`}>
            { record.value }
          </div>
        ))}
      </>
    ) })
  }

  if(domain.type !== 'dns') {
    list.items.push({ label: 'Registrant Contact', content: <ContactToken contact={ domain.registrant_contact } /> })
    list.items.push({ label: 'Admin Contact', content:  <ContactToken contact={ domain.admin_contact } /> })
    list.items.push({ label: 'Tech Contact', content:  <ContactToken contact={ domain.tech_contact } /> })
  }

  list.items.push({ component: <Audit entries={ audits } /> })


  return <List { ...list } />

}

Details.propTypes = {
  audits: PropTypes.array,
  domain: PropTypes.object,
  records: PropTypes.array
}

Details.contextTypes = {
  flash: PropTypes.object
}

export default Details
