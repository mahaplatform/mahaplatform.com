import { Audit, Comments, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ audits, article }) => {


  const config = {
    items: [
      { label: 'Title', content: article.title },
      { label: 'App', content: article.app ? article.app.title : 'Maha' }
    ]
  }

  config.items.push({ component: <Audit entries={ audits } /> })

  config.footer = <Comments entity={`maha_help_articles/${article.id}`} />

  return <List { ...config } />

}

Details.propTypes = {
  audits: PropTypes.array,
  article: PropTypes.object
}

export default Details
