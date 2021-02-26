import Editor from '../../components/editor'
import { Page } from '@admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Record',
  component: Editor
})

export default Page(null, mapPropsToPage)
