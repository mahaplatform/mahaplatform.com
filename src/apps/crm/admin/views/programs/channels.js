import Channels from '../../components/program_channels'
import { Page } from '@admin'

const getTasks = () => ({})

const mapResourcesToPage = (props, context) => ({
  program: `/api/admin/crm/programs/${props.params.program_id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Channels',
  component: Channels,
  tasks: getTasks()
})

export default Page(mapResourcesToPage, mapPropsToPage)
