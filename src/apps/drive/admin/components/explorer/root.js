import PropTypes from 'prop-types'
import React from 'react'

class Root extends React.Component {

  static propTypes = {
    onDrive: PropTypes.func,
    onShared: PropTypes.func,
    onStarred: PropTypes.func,
    onTrash: PropTypes.func
  }

  _handleDrive = this._handleDrive.bind(this)
  _handleShared = this._handleShared.bind(this)
  _handleStarred = this._handleStarred.bind(this)
  _handleTrash = this._handleTrash.bind(this)

  render() {
    const specials = [
      { label: 'My Drive', icon: 'hdd-o', onClick: this._handleDrive },
      { label: 'Shared With Me', icon: 'handshake-o', onClick: this._handleShared },
      { label: 'Starred Items', icon: 'star', onClick: this._handleStarred },
      { label: 'Trash', icon: 'trash', onClick: this._handleTrash }
    ]
    return (
      <div className="drive-items">
        <div className="drive-items">
          { specials.map((special, index) => (
            <div className="drive-item" onClick={ special.onClick } key={`special_${index}`}>
              <div className="drive-item-meta drive-name">
                <div className="drive-item-token">
                  <div className="drive-item-token-icon">
                    <div className="maha-asset-icon">
                      <i className={`fa fa-fw fa-${special.icon}`} />
                    </div>
                  </div>
                  <div className="drive-item-token-label">
                    { special.label }
                  </div>
                </div>
              </div>
              <div className="drive-item-meta drive-action">
                <i className="fa fa-fw fa-chevron-right" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  _handleDrive(e) {
    e.stopPropagation()
    this.props.onDrive()
  }

  _handleShared(e) {
    e.stopPropagation()
    this.props.onShared()
  }

  _handleStarred(e) {
    e.stopPropagation()
    this.props.onStarred()
  }

  _handleTrash(e) {
    e.stopPropagation()
    this.props.onTrash()
  }

}

export default Root
