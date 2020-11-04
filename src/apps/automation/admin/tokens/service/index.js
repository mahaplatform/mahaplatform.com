import React from 'react'

const services = {
  facebook: {
    title: 'Facebook'
  },
  forwardtofriend: {
    title: 'Forward to Friend'
  },
  instagram: {
    title: 'Instagram'
  },
  linkedin: {
    title: 'LinkedIn'
  },
  medium: {
    title: 'Medium'
  },
  pinterest: {
    title: 'Pinterest'
  },
  snapchat: {
    title: 'Snapchat'
  },
  website: {
    title: 'Website'
  },
  twitter: {
    title: 'Twitter'
  },
  vimeo: {
    title: 'Vimeo'
  },
  youtube: {
    title: 'YouTube'
  }
}

const ServiceToken = ({ value }) => {
  const service = services[value]
  return (
    <div className="service-token">
      <img src={`/images/emails/solid-color-${value}-96.png`} />
      { service.title }
    </div>
  )
}

export default ServiceToken
