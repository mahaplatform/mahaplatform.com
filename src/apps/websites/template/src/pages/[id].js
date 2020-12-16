import Layout from '../components/layout'

export default function Page() {
  return (
    <Layout>
      <div className="grid">
        <div className="row">
          <div className="col-4">
            one
          </div>
          <div className="col-4">
            tweo
          </div>
          <div className="col-4">
            three
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: 'page-one' } },
      { params: { id: 'page-two' } },
      { params: { id: 'page-three' } }
    ],
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {}
  }
}
