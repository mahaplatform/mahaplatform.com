import Channels from '../../components/contact_channels'
import { Page } from '@admin'

const getTasks = () => ({})

const mapResourcesToPage = (props, context) => ({
  contact: `/api/admin/crm/contacts/${props.params.contact_id}`,
  program: `/api/admin/crm/programs/${props.params.program_id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Channels',
  component: Channels,
  tasks: getTasks()
})

export default Page(mapResourcesToPage, mapPropsToPage)
