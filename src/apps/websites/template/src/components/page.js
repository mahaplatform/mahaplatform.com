import Layout from './layout'
import React from 'react'
import Row from './row'

export default function Page({ site, page }) {
  return (
    <Layout site={ site } page={ page }>
      { page.rows.map((row, index) => (
        <Row key={`row_${index}`} row={ row } rindex={ index } />
      ))}
    </Layout>
  )
}
