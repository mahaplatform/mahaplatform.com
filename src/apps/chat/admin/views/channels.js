import Channels from '../components/mobilechat/channels'
import FullChat from '../components/chats/full'
import New from './new'
import { Page } from '@admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Chat',
  component: document.body.clientWidth <= 768 ? Channels: FullChat,
  task: document.body.clientWidth <= 768 ? {
    icon: 'plus',
    modal: New
  } : null
})

export default Page(null, mapPropsToPage)
