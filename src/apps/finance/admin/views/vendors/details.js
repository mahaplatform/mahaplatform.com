import { Audit, Comments, List } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ audits, vendor, integration }) => {

  const list = {
    title: 'Vendor Details',
    items: [
      { label: 'Name', content: vendor.name },
      { component: <Audit entries={ audits } /> }
    ],
    footer: <Comments entity={`finance_vendors/${vendor.id}`} />
  }

  return <List { ...list } />

}

Details.propTypes = {
  audits: PropTypes.array,
  integration: PropTypes.string,
  vendor: PropTypes.object
}

export default Details
