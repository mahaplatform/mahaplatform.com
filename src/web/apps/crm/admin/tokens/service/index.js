import React from 'react'

const services = {
  facebook: {
    title: 'Facebook'
  },
  forwardtofriend: {
    title: 'Forward to Friend'
  },
  linkedin: {
    title: 'LinkedIn'
  },
  pinterest: {
    title: 'Pinterest'
  },
  twitter: {
    title: 'Twitter'
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
