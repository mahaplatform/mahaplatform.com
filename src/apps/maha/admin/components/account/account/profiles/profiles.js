import { Loader, ModalPanel, ProfileToken } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Profiles extends React.Component {

  static contextTypes = {
    confirm: PropTypes.object,
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    profiles: PropTypes.array,
    status: PropTypes.string,
    types: PropTypes.object,
    onFetch: PropTypes.func,
    onRevoke: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleRefresh = this._handleRefresh.bind(this)

  render() {
    const { status, types } = this.props
    if(status === 'pending') return null
    if(status === 'loading') return <Loader />
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-profiles">
          <div className="maha-profiles-intro">
            <strong>Access Your Data</strong><br />
            By connecting your accounts with the Maha Platform, you can access
            and use data from various third party services.
          </div>
          { Object.keys(types).map((type, i) => (
            <div className="maha-profiles-type" key={` type_${i} `}>
              <div className="maha-profiles-header">
                { type }
              </div>
              { types[type].length === 0 &&
                <div className="maha-profiles-empty">
                  You have no connected services to access { type }
                </div>
              }
              { types[type].map((profile, j) => (
                <div className="maha-profile" key={` profile_${j} `}>
                  <div className="maha-profile-label">
                    <ProfileToken profile={ profile } />
                  </div>
                  <div className="maha-profile-toggle" onClick={ this._handleRevoke.bind(this, profile.id) }>
                    <i className="fa fa-fw fa-times" />
                  </div>
                </div>
              )) }
            </div>
          ))}
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    this.props.onFetch()
    this.context.network.subscribe([
      { target: '/admin/account/profiles', action: 'refresh', handler: this._handleRefresh }
    ])
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
        { icon: 'chevron-left', handler: this._handleCancel }
      ],
      rightItems: [
        { label: 'Done', handler: this._handleCancel }
      ]
    }
  }

  _handleRevoke(id) {
    this.context.confirm.open('Are you sure you want to disconnect this profile?', () => {
      this.props.onRevoke(id)
    })
  }

  _handleRefresh() {
    this.props.onFetch()
  }

  _handleCancel() {
    this.context.modal.pop()
  }

}

export default Profiles
