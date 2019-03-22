import React from 'react'

const Article = ({ link, image_url, title, text, service_icon, service_name }) => (
  <a href={ link } rel="noopener noreferrer" target="_blank" className="maha-link-article">
    { image_url &&
      <div className="maha-link-article-image">
        <img src={ image_url } />
      </div>
    }
    <div className="maha-link-details">
      <div className="maha-link-title">
        { title }
      </div>
      <div className="maha-link-text">
        { text }
      </div>
      <div className="maha-link-service">
        { service_icon && <img src={ service_icon } />}
        { service_name }
      </div>
    </div>
  </a>
)

export default Article
