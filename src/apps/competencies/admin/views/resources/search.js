import { Page } from 'maha-admin'
import Explorer from '../../components/explorer'

const mapPropsToPage = (props, context) => ({
  title: 'Resources',
  component: Explorer
})

export default Page(null, mapPropsToPage)
