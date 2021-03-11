import { NextSeo } from 'next-seo'
import PropTypes from 'prop-types'
import React from 'react'

const image = (src) => {
  const parts = src.substr(1).split('/')
  const filename = parts.slice(-1)[0]
  const fileparts = filename.split('.')
  const path = parts.slice(0, parts.length - 1).join('/')
  const basename = fileparts.slice(0, fileparts.length - 1).join('.')
  const extname = fileparts.slice(-1)[0]
  const query = `dpi=1&fit=cover&w=1200&h=627&fm=${extname}`
  const host = process.env.NODE_ENV !== 'production' ? 'https://assets.mahaplatform.com' : ''
  return `${host}/imagecache/${query}/${path}/${basename}.png`
}

const getPrimaryDomain = (domains) => {
  const index = domains.findIndex(domain => {
    return domain.is_primary
  })
  return domains[Math.max(index, 0)].name
}

const Seo = ({ website, page }) => {

  const domain = getPrimaryDomain(website.domains)

  const seo = {
    title: `${page.title} | ${website.title}`,
    description: page.description,
    canonical: `https://${domain}/${page.permalink}`,
    openGraph: {
      type: 'article',
      locale: 'en_us',
      website_name: website.title,
      title: page.title,
      url: `https://${domain}/${page.permalink}`,
      description: page.description,
      article: {
        publishedTime: page.published_at,
        modifiedTime: page.updated_at,
        tags: page.tags
      },
      images: page.image ? [
        {
          url: image(page.image),
          width: 1200,
          height: 627,
          alt: page.title
        }
      ] : [],
    },
    twitter: {
      handle: '@handle',
      website: '@website',
      cardType: 'summary_large_image'
    }
  }

  return <NextSeo { ...seo } />

}

Seo.propTypes = {
  website: PropTypes.object,
  page: PropTypes.object
}

export default Seo
