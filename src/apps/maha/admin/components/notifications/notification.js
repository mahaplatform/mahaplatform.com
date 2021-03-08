import { Avatar, Logo } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Notification extends React.Component {

  static propTypes = {
    notification: PropTypes.object,
    onClick: PropTypes.func,
    onRemove: PropTypes.func
  }

  state = {
    y0: null,
    offset: 0
  }

  _handleClick = this._handleClick.bind(this)
  _handleRemove = this._handleRemove.bind(this)
  _handleTouchStart = this._handleTouchStart.bind(this)
  _handleTouchMove = this._handleTouchMove.bind(this)
  _handleTouchEnd = this._handleTouchEnd.bind(this)

  render() {
    const { notification } = this.props
    return (
      <div className="maha-notifications-item" { ...this._getItem() }>
        <div className="maha-notifications-item-avatar">
          { this._getImage(notification) }
        </div>
        <div className="maha-notifications-item-label">
          <strong>{ this._getTitle(notification) }</strong><br />
          { notification.body }
        </div>
        <div className="maha-notifications-item-remove" onClick={ this._handleRemove }>
          <i className="fa fa-fw fa-remove" />
        </div>
      </div>
    )
  }

  _getItem() {
    return {
      style: this._getStyle(),
      onClick: this._handleClick,
      onTouchStart: this._handleTouchStart,
      onTouchMove: this._handleTouchMove,
      onTouchEnd: this._handleTouchEnd
    }
  }

  _getStyle() {
    const { offset } = this.state
    if(!offset) return {}
    if(offset < 0) return { transform: `translateY(${offset}px)` }
    if(offset > 0) return { transform: `scale(${parseFloat(100 + Math.min(offset / 10, 10)) / 100})` }
  }

  _handleClick(e) {
    e.stopPropagation()
    this.props.onClick()
  }

  _handleRemove(e) {
    e.stopPropagation()
    this.props.onRemove()
  }

  _handleTouchStart(e) {
    this.setState({
      y0: e.touches ? e.touches[0].clientY : e.clientY
    })
  }

  _handleTouchMove(e) {
    const { y0 } = this.state
    const y1 = e.touches ? e.touches[0].clientY : e.clientY
    this.setState({
      offset: y1 - y0
    })
  }

  _handleTouchEnd(e) {
    const { offset } = this.state
    if(offset < -20) return this.props.onRemove()
    this.setState({ y0: 0, offset: 0 })
  }

  _getTitle() {
    const { team, title } = this.props.notification
    if(team && team.title) return team.title
    return title
  }

  _getImage() {
    const { image, team, user } = this.props.notification
    if(team && team.logo) return <Logo team={ team } />
    if(user && user.photo) return <Avatar user={ user } presence={ false } />
    if(image) return <img src={ image } />
    return <img src="/images/maha.png" />
  }

}

export default Notification
