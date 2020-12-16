import Layout from '../components/layout'
import Head from 'next/head'
import config from '../../maha.config'

export default function Page({ site, page }) {
  return (
    <Layout>
      <Head>
        <title>{site.title} | { page.title }</title>
      </Head>
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
