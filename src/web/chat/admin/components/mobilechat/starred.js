import Starred from '../starred'
import PropTypes from 'prop-types'
import React from 'react'

class MobileStarred extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
  }

  _handleShowMessage = this._handleShowMessage.bind(this)

  render() {
    return <Starred { ...this._getStarred() } />
  }

  _getStarred() {
    return {
      onShowMessage: this._handleShowMessage
    }
  }

  _handleShowMessage(message) {
    const { router } = this.context
    router.push(`/admin/chat/channels/${message.channel_id}/messages/${message.id}`)
  }

}

export default MobileStarred
