import Layout from './layout'
import Head from 'next/head'

export default function Page({ site, page }) {
  return (
    <Layout site={ site } page={ page }>
      <div className="grid">
        <div className="row">
          <div className="col-4">
            one
          </div>
          <div className="col-4">
            two
          </div>
          <div className="col-4">
            three
          </div>
        </div>
      </div>
    </Layout>
  )
}
