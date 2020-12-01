import '@client/style.less'
import '../style.less'
import Section from './section'
import Head from 'next/head'
import React, { Fragment } from 'react'

function Layout({ children, config }) {
  return (
    <>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" crossOrigin="anonymous" />
        <link href="/css/font-awesome.min.css" rel="stylesheet" />
      </Head>
      <div className="maha-page">
        { config.sections.map((section, index) => {
          if(section.type === 'content') {
            return (
              <Fragment key={`block_${index}`}>
                { children }
              </Fragment>
            )
          }
          return <Section config={ section } key={`block_${index}`} />
        }) }
      </div>
    </>
  )
}

export default Layout