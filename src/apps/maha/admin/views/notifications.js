import Notifications from '../components/notifications/page'
import { Page } from '@admin'

const mapPropsToPage = (props, context, resources) => ({
  title: 'Notifications',
  component: Notifications
})

export default Page(null, mapPropsToPage)
