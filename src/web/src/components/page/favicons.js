import PropTypes from 'prop-types'
import Head from 'next/head'
import React from 'react'

const icon = (src, size) => {
  const parts = src.substr(1).split('/')
  const filename = parts.slice(-1)[0]
  const fileparts = filename.split('.')
  const path = parts.slice(0, parts.length - 1).join('/')
  const basename = fileparts.slice(0, fileparts.length - 1).join('.')
  const extname = fileparts.slice(-1)[0]
  const query = `dpi=1&fit=cover&w=${size}&h=${size}&fm=${extname}`
  const host = process.env.NODE_ENV !== 'production' ? 'https://assets.mahaplatform.com' : ''
  return `${host}/imagecache/${query}/${path}/${basename}.png`
}

const Page = ({ favicon }) => {

  return (
    <Head>
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" sizes="16x16" type="image/png" href={ icon(favicon, 16) } />
      <link rel="icon" sizes="32x32" type="image/png" href={ icon(favicon, 32) } />
      <link rel="icon" sizes="96x96" type="image/png" href={ icon(favicon, 96) } />
      <link rel="icon" sizes="192x192" type="image/png" href={ icon(favicon, 192) } />
      <link rel="icon" sizes="228x228" type="image/png" href={ icon(favicon, 228) } />
      <link rel="apple-touch-icon" type="image/png" sizes="120x120" href={ icon(favicon, 120) } />
      <link rel="apple-touch-icon" type="image/png" sizes="180x180" href={ icon(favicon, 180) } />
      <link rel="apple-touch-icon" type="image/png" sizes="152x152" href={ icon(favicon, 152) } />
      <link rel="apple-touch-icon" type="image/png" sizes="167x167" href={ icon(favicon, 167) } />
    </Head>
  )

}

Page.propTypes = {
  favicon: PropTypes.string
}

export default Page
