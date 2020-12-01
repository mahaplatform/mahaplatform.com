import PropTypes from 'prop-types'
import Message from '../message'
import Loader from '../loader'
import React from 'react'

class Authorized extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    host: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    image: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.string,
    profile: PropTypes.object,
    service: PropTypes.string,
    status: PropTypes.string,
    type: PropTypes.string,
    onAuthorized: PropTypes.func,
    onProfile: PropTypes.func,
    onCheck: PropTypes.func
  }

  static defaultProps = {
    onProfile: () => {}
  }

  _handleAuthorized = this._handleAuthorized.bind(this)

  render() {
    const { children, profile, status } = this.props
    if(status === 'loading') return <Loader />
    if(profile === null) return <Message { ...this._getMessage() } key="message" />
    return children
  }

  componentDidMount() {
    const { service } = this.props
    this.props.onCheck(service)
    this.context.network.subscribe([
      { target: `/admin/sources/${service}/authorized`, action: 'authorized', handler: this._handleAuthorized }
    ])
  }

  componentDidUpdate(prevProps) {
    const { profile } = this.props
    if(profile !== prevProps.profile) {
      this.props.onProfile(profile)
    }
  }

  componentWillUnmount() {
    const { service } = this.props
    this.context.network.unsubscribe([
      { target: `/admin/sources/${service}/authorized`, action: 'authorized', handler: this._handleAuthorized }
    ])
  }

  _getMessage() {
    const { image, icon, label , service, type } = this.props
    const { token } = this.context.admin.team
    return {
      image,
      icon,
      title: label,
      text: `In order to access ${label}, you must authorize the Maha Platform to access your account`,
      button: {
        label: 'Authorize',
        link: `${process.env.WEB_HOST}/admin/oauth/${service}/authorize?type=${type}&token=${token}`
      }
    }
  }

  _handleAuthorized({ profile }) {
    this.props.onAuthorized(profile)
  }

}

export default Authorized
