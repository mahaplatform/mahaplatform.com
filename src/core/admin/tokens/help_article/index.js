import PropTypes from 'prop-types'
import React from 'react'

const HelpArticleToken = ({ app, title }) => (
  <div className="help-article-token">
    <div className="help-article-token-icon">
      { app ?
        <div className={ `help-article-token-icon-block ${app.color}` }>
          <i className={ `fa fa-${app.icon}` } />
        </div> :
        <div className="help-article-token-icon-block blue">
          <i className="fa fa-bars" />
        </div>
      }
    </div>
    <div className="help-article-token-label">
      { title }
    </div>
  </div>
)

HelpArticleToken.propTypes = {
  title: PropTypes.string,
  app: PropTypes.object
}

export default HelpArticleToken
