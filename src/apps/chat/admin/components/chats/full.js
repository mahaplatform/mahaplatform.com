import { channels } from './selectors'
import { connect } from 'react-redux'
import FullChat from '../fullchat'

const mapStateToProps = (state, props) => ({
  channels: channels(state, props),
  status: state.chat.root.channels_status
})

export default connect(mapStateToProps)(FullChat)
