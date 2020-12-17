import Section from './section'
import Layout from './layout'
import React from 'react'

export default function Page({ site, page }) {
  return (
    <Layout site={ site } page={ page }>
      { page.sections.map((section, sindex) => (
        <Section key={`section_${sindex}`} section={ section } sindex={ sindex } />
      ))}
    </Layout>
  )
}
