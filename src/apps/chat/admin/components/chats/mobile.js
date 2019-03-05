import { channels } from './selectors'
import MobileChat from '../mobilechat'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => ({
  channels: channels(state, props),
  status: state.chat.root.channels_status
})

export default connect(mapStateToProps)(MobileChat)
