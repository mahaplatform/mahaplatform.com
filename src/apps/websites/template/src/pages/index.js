import Page from '../components/page'
import maha from '../../maha.config'

export default Page

export async function getStaticProps({ params }) {
  const page = maha.pages.find(page => {
    return page.id === maha.site.homepage
  })
  return {
    props: {
      site: maha.site,
      page
    }
  }
}
