import { Page } from '@admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: '404 Not Found',
  message: {
    icon: 'warning',
    title: 'Not Found',
    text: 'Unable to locate the requested resource'
  }
})

export default Page(null, mapPropsToPage)
