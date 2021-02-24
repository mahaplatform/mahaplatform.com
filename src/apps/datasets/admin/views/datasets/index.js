import Manager from '../../components/manager'
import { Page } from '@admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Datasets',
  component: Manager
})

export default Page(null, mapPropsToPage)
