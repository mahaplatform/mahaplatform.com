import Loader from '../loader'
import Message from '../message'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Authorized extends React.Component {

  static contextTypes = {
    host: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    connected: PropTypes.bool,
    network: PropTypes.string,
    image: PropTypes.string,
    icon: PropTypes.string,
    url: PropTypes.string,
    onAuthorize: PropTypes.func,
    onAuthorized: PropTypes.func,
    onCheck: PropTypes.func
  }

  _handleAuthorized = this._handleAuthorized.bind(this)
  _handleClick = this._handleClick.bind(this)

  render() {
    const { children, connected } = this.props
    if(connected === null) return <Loader />
    if(connected === false) return <Message { ...this._getMessage() } key="message" />
    return children
  }

  componentDidMount() {
    const { network } = this.props
    this.props.onCheck(network)
    this.context.network.subscribe([
      { target: `/admin/sources/${network}/authorized`, action: 'refresh', handler: this._handleAuthorized }
    ])
  }

  componentDidUpdate(prevProps) {
    const { url } = this.props
    if(url !== prevProps.url) {
      this.context.host.openWindow(url)
    }
  }

  componentWillUnmount() {
    const { network } = this.props
    this.context.network.unsubscribe([
      { target: `/admin/sources/${network}/authorized`, action: 'refresh', handler: this._handleAuthorized }
    ])
  }

  _getAuthorize() {
    const { url, onAuthorize } = this.props
    return {
      url,
      onAuthorize
    }
  }

  _getMessage() {
    const { image, icon, network } = this.props
    return {
      image,
      icon,
      title: `Sign In to ${ _.capitalize(network) }`,
      text: `In order to access ${ _.capitalize(network) }, you must authorize the Maha Platform to access your account`,
      button: {
        label: 'Authorize',
        handler: this._handleClick
      }
    }
  }

  _handleClick() {
    const { network } = this.props
    this.props.onAuthorize(network)
  }

  _handleAuthorized() {
    this.props.onAuthorized()
  }

}

export default Authorized
