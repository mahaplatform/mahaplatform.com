import { channels } from './selectors'
import Channels from '../channels'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import New from '../../views/new'
import React from 'react'

class MobileChannels extends React.Component {

    static contextTypes = {
      modal: PropTypes.object,
      router: PropTypes.object
    }

    static propTypes = {
      channel: PropTypes.object
    }

    _handleChoose = this._handleChoose.bind(this)
    _handleNew = this._handleNew.bind(this)

    render() {
      return <Channels { ...this._getChannels() } />
    }

    _getChannels() {
      const { channels, status } = this.props
      return {
        channels,
        selected: null,
        showNew: false,
        status,
        onChoose: this._handleChoose,
        onNew: this._handleNew
      }
    }

    _handleChoose(id) {
      this.context.router.push(`/admin/chat/channels/${id}`)
    }

    _handleNew() {
      this.context.modal.push(<New />)
    }


}

const mapStateToProps = (state, props) => ({
  channels: channels(state, props),
  status: state.chat.root.channels_status
})

export default connect(mapStateToProps)(MobileChannels)
