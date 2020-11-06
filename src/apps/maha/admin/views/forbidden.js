import { Page } from '@admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: '403 Forbidden',
  message: {
    icon: 'exclamation-triangle',
    title: 'Forbidden',
    text: 'You do not have permission to access this content'
  }
})

export default Page(null, mapPropsToPage)
