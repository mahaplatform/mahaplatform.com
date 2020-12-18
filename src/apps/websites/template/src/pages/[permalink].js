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
  const layout = maha.layouts.find(layout => {
    return page.layout_id === layout.id
  })
  return {
    props: {
      site: maha.site,
      layout,
      page
    }
  }
}
