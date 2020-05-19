import EmailChannel from '../../../components/email_channel'
import { Page } from 'maha-admin'

const getTasks = () => ({})

const mapResourcesToPage = (props, context) => ({
  channel: `/api/admin/crm/contacts/${props.params.contact_id}/channels/programs/${props.params.program_id}/email/${props.params.id}`,
  contact: `/api/admin/crm/contacts/${props.params.contact_id}`,
  program: `/api/admin/crm/programs/${props.params.program_id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email Channel',
  component: EmailChannel,
  tasks: getTasks()
})

export default Page(mapResourcesToPage, mapPropsToPage)
