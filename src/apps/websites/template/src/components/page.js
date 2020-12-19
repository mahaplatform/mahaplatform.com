import '../css/style.less'
import React, { Fragment } from 'react'
import Section from './section'
import Head from 'next/head'
import Style from './style'

function Page({ site, layout, page }) {
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
          { layout.sections.map((section, lsindex) => (
            <Fragment key={`lsection_${lsindex}`}>
              { section.type === 'content' ?
                <Fragment>
                  { page.sections.map((section, psindex) => (
                    <Section key={`psection_${psindex}`} section={ section } namespace={ `p${psindex}` } />
                  )) }
                </Fragment> :
                <Section section={ section } namespace={ `l${lsindex}` } />
              }
            </Fragment>
          )) }
        </main>
      </article>
    </>
  )
}

export default Page
