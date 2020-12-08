import { Audit, Button, Comments, List } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ audits, store }) => {

  const link = {
    label: 'View Public Store',
    className: 'link',
    link: store.url
  }

  const config = {
    sections: [
      {
        items: [
          { label: 'Title', content: store.title },
          { label: 'Program', content: store.program.title },
          { label: 'URL', content: <Button { ...link } /> }
        ]
      }
    ]
  }

  if(store.deleted_at !== null) {
    config.alert = { color: 'red', message: 'This store was deleted' }
  }

  config.sections.push({
    items: [
      { component: <Audit entries={ audits } /> }
    ]
  })

  config.footer = <Comments entity={`stores_stores/${store.id}`} />

  return <List { ...config } />

}

Details.propTypes = {
  audits: PropTypes.array,
  store: PropTypes.object
}

export default Details
