import PropTypes from 'prop-types'
import React from 'react'

class Root extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    onUpdateLikerIds: PropTypes.func
  }

  _handleUpdateLikerIds = this._handleUpdateLikerIds.bind(this)

  render() {
    return this.props.children
  }

  componentDidMount() {
    this._handleJoin()
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _handleJoin() {
    const { network } = this.context
    const target = '/admin/news'
    network.join(target)
    network.subscribe([
      { target, action: 'add_post', handler: this._handleAddPost },
      { target, action: 'remove_post', handler: this._handleRemovePost },
      { target, action: 'update_liker_ids', handler: this._handleUpdateLikerIds }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const target = '/admin/news'
    network.leave(target)
    network.unsubscribe([
      { target, action: 'update_liker_ids', handler: this._handleUpdateLikerIds }
    ])
  }

  _handleUpdateLikerIds({ post_id, liker_ids }) {
    this.props.onUpdateLikerIds(post_id, liker_ids)
  }


}

export default Root
