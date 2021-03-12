import '../../css/style.less'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Favicons from './favicons'
import Section from './section'
import Style from '../style'
import Head from 'next/head'
import Seo from './seo'

class Page extends React.Component {

  static contextTypes = {
    analytics: PropTypes.object
  }

  static propTypes = {
    error: PropTypes.string,
    website: PropTypes.object,
    layout: PropTypes.object,
    page: PropTypes.object
  }

  render() {
    const { error, website, layout, page } = this.props
    if(error) return <div>{ error }</div>
    const sections = this._getSections()
    return (
      <>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#FFFFFF" />
        </Head>
        { website.favicon &&
          <Favicons favicon={ website.favicon } />
        }
        <Seo website={ website } page={ page } />
        <Style website={ website } layout={ layout } page={ page } />
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

  componentDidMount() {
    // this.context.analytics.view()
  }

  _getSections() {
    const { layout, page } = this.props
    return layout.config.sections.reduce((sections, section) => [
      ...sections,
      ...section.type === 'content' ? page.config.sections : [section]
    ], [])
  }

}

export default Page
