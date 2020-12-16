import Page from '../components/page'
import maha from '../../maha.config'

export default Page

export async function getStaticPaths() {
  return {
    paths: maha.pages.map(page => ({
      params: { permalink: page.permalink }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const page = maha.pages.find(page => {
    return page.permalink === params.permalink
  })
  return {
    props: {
      site: maha.site,
      page
    }
  }
}
