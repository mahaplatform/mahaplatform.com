import PropTypes from 'prop-types'
import { Button } from '@admin'
import React from 'react'
import _ from 'lodash'

const Status = ({ domain, records }, { flash }) => {

  if(domain.type === 'dns' && domain.dns_status === 'pending') {
    const check = {
      label: 'I already did. Please check.',
      className: 'ui blue button',
      request: {
        endpoint: `/api/admin/websites/domains/${domain.id}/check`,
        method: 'get',
        onFailure: () => flash.set('error', 'Unable to confirm nameservers')
      }
    }
    const ns = records.find(record => {
      return record.type === 'NS'
    })
    return (
      <div className="maha-list-status warning">
        We are currently waiting for you to change the nameservers at your
        domain registrar to:
        <ul>
          { ns.records.map((record, index) => (
            <li key={`record_${index}`}>
              { record.value.replace(/\.$/, '') }
            </li>
          ))}
        </ul>
        <Button { ...check } />
      </div>
    )

  }

  if(domain.type === 'registration' && _.includes(['pending','inprogress'], domain.registration_status)) {
    const check = {
      label: 'Check status',
      className: 'ui blue button',
      request: {
        endpoint: `/api/admin/websites/domains/${domain.id}/check`,
        method: 'get',
        onFailure: () => flash.set('error', 'Unable to confirm nameservers')
      }
    }
    return (
      <div className="maha-list-status warning">
        <p>We are currently waiting for your registration to complete</p>
        <Button { ...check } />
      </div>
    )

  }
  //
  // if(domain.type === 'registration') {
  //   list.items.push({ label: 'Registration Status', content: (
  //     <DomainStatusToken status={ domain.registration_status } />
  //   ) })
  // }
  //
  // if(domain.type === 'transfer') {
  //   list.items.push({ label: 'Transfer Status', content: (
  //     <DomainStatusToken status={ domain.transfer_status } />
  //   ) })
  // }
  //
  // if(domain.type === 'dns') {
  //   const check = {
  //     label: 'check',
  //     className: 'link',
  //     request: {
  //       endpoint: `/api/admin/websites/domains/${domain.id}/dns`,
  //       method: 'patch',
  //       onFailure: () => flash.set('error', 'Unable to confirm nameservers')
  //     }
  //   }
  //   list.items.push({ label: 'DNS Status', content: (
  //     <DomainStatusToken status={ domain.dns_status } check={ check } />
  //   ) })
  //   const ns = records.find(record => {
  //     return record.type === 'NS'
  //   })
  //   list.items.push({ label: 'Name Servers', content: (
  //     <>
  //       { ns.records.map((record, index) => (
  //         <div key={`record_${index}`}>
  //           { record.value }
  //         </div>
  //       ))}
  //     </>
  //   ) })
  // }

  return null

}

Status.contextTypes = {
  flash: PropTypes.object
}

Status.propTypes = {
  domain: PropTypes.object,
  records: PropTypes.array
}

export default Status
