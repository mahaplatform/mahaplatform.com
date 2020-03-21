import Post from '../components/post'
import { Page } from 'maha-admin'

const mapResourcesToPage = (props, context) => ({
  post: `/api/admin/news/posts/${props.params.id}`
})

const mapPropsToPage = (props, context, resources) => ({
  title: 'Post',
  component: Post
})

export default Page(mapResourcesToPage, mapPropsToPage)
