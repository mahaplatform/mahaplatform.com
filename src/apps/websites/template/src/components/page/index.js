import '../../css/style.less'
import React, { Fragment } from 'react'
import Section from './section'
import Style from '../style'
import Head from 'next/head'

function Page({ site, layout, page }) {

  const sections = layout.sections.reduce((sections, section) => [
    ...sections,
    ...section.type === 'content' ? page.sections : [section]
  ], [])

  return (
    <>
      <Head>
        <title>{ page.title } | { site.title }</title>
        <meta name="description" content={ page.description} />
      </Head>
      <Style site={ site } layout={ layout } page={ page } />
      <article>
        <header />
        <main>
          { sections.map((section, index) => (
            <Section key={`section_${index}`} section={ section } namespace={ index } />
          )) }
        </main>
      </article>
    </>
  )

}

export default Page
