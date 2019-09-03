import Designer from '../components/designer'
import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Designer',
  component: Designer
})

export default Page(null, mapPropsToPage)
