import PropTypes from 'prop-types'
import { Audit, Comments, List } from '@admin'
import React from 'react'

const Details = ({ audits, website }) => {

  const list = {
    items: [
      { label: 'Title', content: website.title }
    ],
    footer: <Comments entity={`websites_websites/${website.id}`} />
  }

  list.items.push({ component: <Audit entries={ audits } /> })

  return <List { ...list } />

}

Details.propTypes = {
  audits: PropTypes.array,
  website: PropTypes.object
}

export default Details
