import Template from '../../components/template'
import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Template',
  component: Template
})

export default Page(null, mapPropsToPage)
