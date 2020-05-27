import PropTypes from 'prop-types'
import { Audit, Comments, List } from 'maha-admin'
import React from 'react'

const Details = ({ audits,program }) => {

  const list = {
    items: [
      { label: 'Title', content: program.title },
      { label: 'Phone Number', content: program.phone_number ? program.phone_number.formatted : 'NONE' },
      { label: 'Invoice Address', content: <span dangerouslySetInnerHTML={{ __html: program.address ? program.address.replace(/\n/g,'<br />') : 'NONE' }} /> },
      { label: 'Merchant Account', content: program.merchant ? program.merchant.title : 'NONE' },
      { component: <Audit entries={ audits } /> }
    ],
    footer: <Comments entity={`crm_programs/${program.id}`} />
  }

  return <List { ...list } />

}

Details.propTypes = {
  audits: PropTypes.array,
  program: PropTypes.object
}

export default Details
