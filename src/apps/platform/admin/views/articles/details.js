import { AssetViewer, Audit, Button, Comments, List } from 'maha-admin'
import Highlight from 'react-highlight'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ audits, article }) => {

  const desktop = {
    label: 'watch video',
    className: 'link',
    modal: {
      component: <AssetViewer asset={ article.desktop } />,
      options: {
        width: 1024,
        height: 768
      }
    }
  }

  const desktop_small = {
    label: 'watch video',
    className: 'link',
    modal: {
      component: <AssetViewer asset={ article.desktop_small } />,
      options: {
        width: 644,
        height: 483
      }
    }
  }

  const mobile = {
    label: 'watch video',
    className: 'link',
    modal: {
      component: <AssetViewer asset={ article.mobile } />,
      options: {
        width: 279,
        height: 483
      }
    }
  }

  const config = {
    items: [
      { label: 'Title', content: article.title },
      { label: 'App', content: article.app ? article.app.title : 'Maha' },
      { label: 'Desktop', content: article.desktop ? <Button { ...desktop } /> : '' },
      { label: 'Desktop Small', content: article.desktop_small ? <Button { ...desktop_small } /> : '' },
      { label: 'Mobile', content: article.mobile ? <Button { ...mobile } /> : '' },
      { label: 'Body', content: (
        <div className="maha-help-article-input">
          <div className="maha-help-article-body" dangerouslySetInnerHTML={{ __html: article.body }} />
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
