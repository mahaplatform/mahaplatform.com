import PropTypes from 'prop-types'
import { Audit, Button, Comments, List } from 'maha-admin'
import React from 'react'

const Details = ({ audits, program }) => {

  const list = {
    items: [
      { label: 'Title', content: program.title },
      { label: 'Phone Number', content: program.phone_number ? program.phone_number.formatted : 'NONE' }
    ],
    footer: <Comments entity={`crm_programs/${program.id}`} />
  }

  if(program.voice_campaign) {

    const inbound_voice = {
      label: 'Manage Workflow',
      className: 'link',
      route: `/admin/crm/campaigns/voice/${program.voice_campaign.id}`
    }

    list.items.push({ label: 'Inbound Voice', content: <Button { ...inbound_voice } /> })

  }

  list.items.push({ label: 'Invoice Address', content: <span dangerouslySetInnerHTML={{ __html: program.address ? program.address.replace(/\n/g,'<br />') : 'NONE' }} /> })
  list.items.push({ label: 'Merchant Account', content: program.merchant ? program.merchant.title : 'NONE' })
  list.items.push({ component: <Audit entries={ audits } /> })

  return <List { ...list } />

}

Details.propTypes = {
  audits: PropTypes.array,
  program: PropTypes.object
}

export default Details
