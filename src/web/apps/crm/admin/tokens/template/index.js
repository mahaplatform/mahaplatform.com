import React from 'react'

const templates = {
  email: {
    icon: 'envelope-o',
    title: 'Email Template',
    description: 'Create an email template'
  },
  webpage: {
    icon: 'columns',
    title: 'Webpage Template',
    description: 'Create an webpage template'
  }
}

const TemplateToken = ({ value }) => {
  const template = templates[value]
  return (
    <div className="campaign-token">
      <div className="campaign-token-icon">
        <i className={`fa fa-fw fa-${ template.icon }`} />
      </div>
      <div className="campaign-token-label">
        <strong>{ template.title }</strong><br />
        { template.description }
      </div>
    </div>
  )
}

export default TemplateToken
