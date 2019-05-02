import Starred from '../components/mobilechat/starred'
import FullChat from '../components/chats/full'
import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: document.body.clientWidth <= 768 ? 'Starred' : 'Chat',
  component: document.body.clientWidth <= 768 ? Starred : FullChat,
  rights: []
})

export default Page(null, mapPropsToPage)
