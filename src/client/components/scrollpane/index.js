import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Scrollpane extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    notificationPercent: PropTypes.number,
    onReachBottom: PropTypes.func
  }

  static defaultProps = {
    notificationPercent: 30,
    onReachBottom: null
  }

  notified = false

  _handleScrollToTop = this._handleScrollToTop.bind(this)

  render() {
    const { children } = this.props
    return (
      <div className="maha-scrollpane">
        <div className="maha-scrollpane-inner" ref={ (node) => this.scrollpane = node }>
          { children }
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.listener = _.throttle(this._scrollListener.bind(this), 100)
    this._attachScrollListener()
  }

  componentDidUpdate() {
    this.notified = false
  }

  componentWillUnmount() {
    this._detachScrollListener()
  }

  _attachScrollListener() {
    this.scrollpane.addEventListener('scroll', this.listener, true)
    this.scrollpane.addEventListener('resize', this.listener, true)
    this._scrollListener()
  }

  _detachScrollListener() {
    this.scrollpane.removeEventListener('scroll', this.listener, true)
    this.scrollpane.removeEventListener('resize', this.listener, true)
  }

  _scrollListener() {
    const { notificationPercent, onReachBottom } = this.props
    const bottomPosition = this.scrollpane.scrollHeight - (this.scrollpane.scrollTop + this.scrollpane.offsetHeight)
    const percentRemaining = (bottomPosition / this.scrollpane.scrollHeight) * 100
    if(!this.notified && percentRemaining <= notificationPercent) {
      if(onReachBottom) onReachBottom()
      this.notified = true
    }
  }

  _handleScrollToTop() {
    this.scrollpane.scrollTop = 0
  }

}

export default Scrollpane
