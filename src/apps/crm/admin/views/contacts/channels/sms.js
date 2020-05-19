import SmsChannel from '../../../components/sms_channel'
import { Page } from 'maha-admin'

const getTasks = () => ({})

const mapResourcesToPage = (props, context) => ({
  channel: `/api/admin/crm/contacts/${props.params.contact_id}/channels/programs/${props.params.program_id}/sms/${props.params.id}`,
  contact: `/api/admin/crm/contacts/${props.params.contact_id}`,
  program: `/api/admin/crm/programs/${props.params.program_id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'SMS Channel',
  component: SmsChannel,
  tasks: getTasks(props.user, resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
