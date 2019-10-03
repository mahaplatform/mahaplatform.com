import { connect } from 'react-redux'
import { channel } from './selectors'
import Channel from '../channel'
import PropTypes from 'prop-types'
import React from 'react'

class MobileChannel extends React.Component {

    static contextTypes = {
      modal: PropTypes.object,
      router: PropTypes.object
    }

    static propTypes = {
      channel: PropTypes.object
    }

    _handleShowMessage = this._handleShowMessage.bind(this)

    render() {
      const { channel } = this.props
      if(!channel) return null
      return <Channel { ...this._getChannel() } />
    }

    _getChannel() {
      const { channel } = this.props
      return {
        channel,
        id: channel.id,
        onShowMessage: this._handleShowMessage
      }
    }

    _handleShowMessage(message) {
      this.context.router.history.push(`/admin/chat/channels/${message.channel_id}/messages/${message.id}`)
    }


}

const mapStateToProps = (state, props) => ({
  channel: channel(state, props)
})

export default connect(mapStateToProps)(MobileChannel)
