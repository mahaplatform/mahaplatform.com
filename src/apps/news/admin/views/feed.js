import Feed from '../components/feed'
import { Page } from '@admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'News',
  component: Feed
})

export default Page(null, mapPropsToPage)
