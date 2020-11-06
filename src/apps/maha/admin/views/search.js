import OmniSearch from '../components/omnisearch'
import { Page } from '@admin'

const mapPropsToPage = (props, context, resources) => ({
  title: 'Search',
  component: OmniSearch
})

export default Page(null, mapPropsToPage)
