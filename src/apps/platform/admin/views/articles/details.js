import { AssetViewer, Audit, Comments, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ audits, article }) => {


  const config = {
    items: [
      { label: 'Title', content: article.title },
      { label: 'App', content: article.app ? article.app.title : 'Maha' },
      { label: 'Desktop', content: article.desktop, format: (asset) => (
        <div className="platform-desktop-video">
          <AssetViewer asset={ asset } />
        </div>
      ) },
      { label: 'Mobile', content: article.mobile, format: (asset) => (
        <div className="platform-mobile-video">
          <AssetViewer asset={ asset } />
        </div>
      ) }
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
