import { channels } from './selectors'
import { connect } from 'react-redux'
import ChatBar from '../chatbar'

const mapStateToProps = (state, props) => ({
  channels: channels(state, props),
  status: state.chat.root.channels_status
})

export default connect(mapStateToProps)(ChatBar)
