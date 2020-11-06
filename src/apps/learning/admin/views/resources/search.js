import Resources from '../../components/resources'
import { Page } from '@admin'

const mapPropsToPage = (props, context) => ({
  title: 'Resources',
  component: Resources
})

export default Page(null, mapPropsToPage)
