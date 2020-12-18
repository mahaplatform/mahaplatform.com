import Page from '../components/page'
import maha from '../../maha.config'

export default Page

export async function getStaticProps({ params }) {
  const page = maha.pages.find(page => {
    return page.id === maha.site.homepage
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
