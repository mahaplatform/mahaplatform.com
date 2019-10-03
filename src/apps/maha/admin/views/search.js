import OmniSearch from '../components/omnisearch'
import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources) => ({
  title: 'Search',
  component: OmniSearch
})

export default Page(null, mapPropsToPage)
