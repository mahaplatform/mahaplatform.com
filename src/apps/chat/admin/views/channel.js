import Channel from '../components/mobilechat/channel'
import FullChat from '../components/chats/full'
import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: document.body.clientWidth <= 768 ? 'Conversation' : 'Chat',
  component: document.body.clientWidth <= 768 ? Channel : FullChat,
  task: document.body.clientWidth <= 768 ? {
    icon: 'info-circle',
    route: `/admin/chat/channels/${props.params.id}/info`
  } : null
})

export default Page(null, mapPropsToPage)
