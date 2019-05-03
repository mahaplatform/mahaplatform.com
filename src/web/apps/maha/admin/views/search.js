import Search from '../components/search'
import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources) => ({
  title: 'Search',
  component: Search
})

export default Page(null, mapPropsToPage)
