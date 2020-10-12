import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Offer from './offer'
import React from 'react'
import _ from 'lodash'

class Browser extends React.Component {

  static childContextTypes = {
    host: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    device: PropTypes.object,
    team: PropTypes.object,
    title: PropTypes.string,
    unseen: PropTypes.number,
    onSavePush: PropTypes.func,
    onSetTitle: PropTypes.func,
    onUpdateUnseen: PropTypes.func
  }

  link = null

  state = {
    offer: false
  }

  _handleHasFocus = this._handleHasFocus.bind(this)
  _handleMessage = this._handleMessage.bind(this)
  _handleOpenWindow = this._handleOpenWindow.bind(this)
  _handlePushRoute = this._handlePushRoute.bind(this)
  _handleSetTitle = this._handleSetTitle.bind(this)
  _handleSignin = this._handleSignin.bind(this)
  _handleUpdateHead = this._handleUpdateHead.bind(this)
  _handleUpdateUnseen = this._handleUpdateUnseen.bind(this)

  render() {
    const { offer } = this.state
    return (
      <div className="maha-browser">
        { this.props.children }
        { offer && <div className="maha-push-modal-overlay" /> }
        { offer &&
          <div className="maha-browser-modal">
            <Offer />
          </div>
        }
        <a ref={ node => this.link = node } target="_blank" />
      </div>
    )
  }

  componentDidMount() {
    window.addEventListener('message', this._handleMessage, false)
    if(navigator.serviceWorker) navigator.serviceWorker.addEventListener('message', this._handleMessage, false)
    // this.setState({ offer: true })
  }

  componentDidUpdate(prevProps) {
    const { team, title, unseen } = this.props
    if(title !== prevProps.title || unseen !== prevProps.unseen) {
      this._handleUpdateHead()
    }
    if(!_.isEqual(team, prevProps.team)) {
      this._handleUpdateHead()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('message', this._handleMessage, false)
    if(navigator.serviceWorker) navigator.serviceWorker.removeEventListener('message', this._handleMessage, false)
  }

  getChildContext() {
    return {
      host: {
        mobile: false,
        checkForUpdates: () => {},
        hasFocus: this._handleHasFocus,
        installUpdate: () => {},
        openWindow: this._handleOpenWindow,
        setTitle: this._handleSetTitle,
        signin: this._handleSignin,
        updateUnseen: this._handleUpdateUnseen
      }
    }
  }

  _getFavicon() {
    const { unseen } = this.props
    const count = unseen > 0 ? 'x' : '0'
    return `/images/icons/favicon-${count}.png`
  }

  _getTitle() {
    const { team, title, unseen } = this.props
    const titlecount = unseen > 0 ? ` (${unseen})` : ''
    const parts = []
    if(team) parts.push(team ? team.title : 'Maha')
    if(title) parts.push(title)
    return parts.join(' | ') + titlecount
  }

  _handleHasFocus() {
    return document.hasFocus()
  }

  _handleMessage(e) {
    const message = e.data
    if(message.action === 'pushRoute') {
      this._handlePushRoute(message.data.route)
    }
  }

  _handleOpenWindow(url) {
    this.link.href = url
    this.link.click()
  }

  _handlePushRoute(route) {
    this.context.router.history.push(route)
  }

  _handleSetTitle(title) {
    this.props.onSetTitle(title)
  }

  _handleSignin(url) {
    window.location.href = url
  }

  _handleUpdateHead() {
    const link = document.getElementById('favicon')
    link.type = 'image/x-icon'
    link.rel = 'shortcut icon'
    link.href = this._getFavicon()
    document.getElementsByTagName('head')[0].appendChild(link)
    document.getElementsByTagName('title')[0].text = this._getTitle()
  }

  _handleUpdateUnseen(unseen) {
    this.props.onUpdateUnseen(unseen)
  }

}

const mapStateToProps = (state, props) => ({
  team: state.maha.admin ? state.maha.admin.team : null
})

export default connect(mapStateToProps)(Browser)
