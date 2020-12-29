import '../../css/style.less'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Section from './section'
import Style from '../style'
import Head from 'next/head'

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

const Page = ({ site, layout, page }) => {

  const sections = layout.sections.reduce((sections, section) => [
    ...sections,
    ...section.type === 'content' ? page.sections : [section]
  ], [])

  return (
    <>
      <Head>
        <title>{ page.title } | { site.title }</title>
        <meta name="description" content={ page.description} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" sizes="16x16" type="image/png" href={ icon(site.favicon, 16) } />
        <link rel="icon" sizes="32x32" type="image/png" href={ icon(site.favicon, 32) } />
        <link rel="icon" sizes="96x96" type="image/png" href={ icon(site.favicon, 96) } />
        <link rel="apple-touch-icon" type="image/png" sizes="120x120" href={ icon(site.favicon, 120) } />
        <link rel="apple-touch-icon" type="image/png" sizes="180x180" href={ icon(site.favicon, 180) } />
        <link rel="apple-touch-icon" type="image/png" sizes="152x152" href={ icon(site.favicon, 152) } />
        <link rel="apple-touch-icon" type="image/png" sizes="167x167" href={ icon(site.favicon, 167) } />
      </Head>
      <Style site={ site } layout={ layout } page={ page } />
      <article>
        <header />
        <main>
          { sections.map((section, index) => (
            <Section key={`section_${index}`} section={ section } namespace={ `${index}` } />
          )) }
        </main>
      </article>
    </>
  )

}

Page.propTypes = {
  site: PropTypes.object,
  layout: PropTypes.object,
  page: PropTypes.object
}

export default Page
