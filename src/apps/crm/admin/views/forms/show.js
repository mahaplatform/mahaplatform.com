import Form from '../../components/template'
import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Form',
  component: Form
})

export default Page(null, mapPropsToPage)
