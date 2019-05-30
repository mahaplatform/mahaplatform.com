import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Profiles extends React.Component {

  static contextTypes = {
    host: PropTypes.object,
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    sources: PropTypes.array,
    profiles: PropTypes.array,
    profileList: PropTypes.array,
    url: PropTypes.string,
    onAuthorize: PropTypes.func,
    onFetchSources: PropTypes.func,
    onFetchProfiles: PropTypes.func,
    onRevoke: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleRefresh = this._handleRefresh.bind(this)

  render() {
    const { sources } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-profiles-intro">
          <strong>Access Your Data</strong><br />
          By connecting your accounts with the Maha Platform, you can access
          and use data from various third party services.
        </div>
        { sources.map((source, index) => (
          <div className="maha-profile" key={` profile_${index} `}>
            <div className="maha-profile-icon">
              <img src={`/admin/images/${source.text}.png`} />
            </div>
            <div className="maha-profile-name">
              { _.capitalize(source.text) }
            </div>
            <div className="maha-profile-toggle" onClick={ this._handleClick.bind(this, source.text) }>
              <i className={ `fa fa-fw fa-${this._getIcon(source.text)}` } />
            </div>
          </div>
        )) }
      </ModalPanel>
    )
  }

  componentDidMount() {
    this.props.onFetchSources()
    this.props.onFetchProfiles()
    this.context.network.subscribe([
      { target: '/admin/account/profiles', action: 'refresh', handler: this._handleRefresh }
    ])
  }

  componentDidUpdate(prevProps) {
    const { url } = this.props
    if(url && url !== prevProps.url) {
      this.context.host.openWindow(url)
    }
  }

  componentWillUnmount() {
    this.context.network.unsubscribe([
      { target: '/admin/account/profiles', action: 'refresh', handler: this._handleRefresh }
    ])
  }

  _getPanel() {
    return {
      title: 'Manage Profiles',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ],
      rightItems: [
        { label: 'Done', handler: this._handleCancel }
      ]
    }
  }

  _getIcon(network) {
    const { profileList } = this.props
    return `toggle-${_.includes(profileList, network) ? 'on' : 'off'}`
  }

  _handleClick(network) {
    const { profiles, onRevoke, onAuthorize } = this.props
    const profile = _.find(profiles, { network })
    if(profile) return onRevoke(profile.id)
    onAuthorize(network)
  }

  _handleRefresh() {
    this.props.onFetchProfiles()
  }

  _handleCancel() {
    this.context.modal.pop()
  }

}

export default Profiles
