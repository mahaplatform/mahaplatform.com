import Info from '../components/mobilechat/info'
import FullChat from '../components/chats/full'
import { Page } from '@admin'

const mapResourcesToPage = (props, context) => ({
  channel: `/api/admin/chat/channels/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: document.body.clientWidth <= 768 ? 'Info' : 'Chat',
  component: document.body.clientWidth <= 768 ? Info : FullChat,
  rights: []
})

export default Page(mapResourcesToPage, mapPropsToPage)
