import Dashboard from '../components/dashboard.new'
import { Page } from '@admin'

const mapPropsToPage = (props, context, resources) => ({
  component: Dashboard
})

export default Page(null, mapPropsToPage)
