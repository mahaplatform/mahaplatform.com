import { Audit, Comments, List, SensitiveText } from '@admin'
import PropTypes from 'prop-types'
import Status from './status'
import React from 'react'

const Details = ({ audits, domain, records }, { flash }) => {

  const list = {
    items: [
      { component: <Status domain={ domain } records={ records } /> },
      { label: 'Name', content: domain.name },
      { label: 'Registrar', content: domain.type === 'dns' ? '3rd Party' : 'Maha (Amazon)' }
    ],
    footer: <Comments entity={`websites_domains/${domain.id}`} />
  }

  if(domain.type !== 'dns') {
    list.items.push({ label: 'Auto Renew', content: domain.auto_renew ? 'enabled' : 'diabled' })
    list.items.push({ label: 'Transfer Lock', content: domain.is_locked ? 'enabled' : 'diabled' })
    if(!domain.is_locked) {
      list.items.push({ label: 'Auth Code', content: <SensitiveText text={domain.auth_code} /> })
    }
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
