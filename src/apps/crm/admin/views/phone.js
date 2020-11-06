import Phone from '../components/phone'
import { Page } from '@admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Phone',
  component: Phone
})

export default Page(null, mapPropsToPage)
