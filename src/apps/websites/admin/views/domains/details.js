import { Audit, Button, Comments, List } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const Details = ({ audits, domain }, { flash }) => {

  const list = {
    items: [
      { label: 'Name', content: domain.name },
      { label: 'Type', content: domain.type }
    ],
    footer: <Comments entity={`websites_domains/${domain.id}`} />
  }

  if(domain.type === 'registration') {
    list.items.push({ label: 'Registration Status', content: (
      <span>
        { domain.registration_status === 'pending' ?
          <i className="fa fa-fw fa-circle-o-notch fa-spin" /> :
          <i className="fa fa-fw fa-check-circle-o" />
        }
        { domain.registration_status }
      </span>
    ) })
  }

  if(domain.type === 'transfer') {
    list.items.push({ label: 'Transfer Status', content: (
      <span>
        { domain.transfer_status === 'pending' ?
          <i className="fa fa-fw fa-circle-o-notch fa-spin" /> :
          <i className="fa fa-fw fa-check-circle-o" />
        }
        { domain.transfer_status }
      </span>
    ) })
  }

  if(domain.type === 'dns') {
    if(_.includes(['pending','inprogress'], domain.dns_status)) {

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
