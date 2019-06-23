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
    return (
      <div className="drive-items">
        <div className="drive-items">
          <div className="drive-item" onClick={ this._handleDrive }>
            <div className="drive-item-icon">
              <div className="maha-asset-icon">
                <i className="fa fa-fw fa-hdd-o" />
              </div>
            </div>
            <div className="drive-item-name">
              My Drive
            </div>
            <div className="drive-item-action">
              <i className="fa fa-fw fa-chevron-right" />
            </div>
          </div>
          <div className="drive-item" onClick={ this._handleShared }>
            <div className="drive-item-icon">
              <div className="maha-asset-icon">
                <i className="fa fa-fw fa-handshake-o" />
              </div>
            </div>
            <div className="drive-item-name">
              Shared With Me
            </div>
            <div className="drive-item-action">
              <i className="fa fa-fw fa-chevron-right" />
            </div>
          </div>
          <div className="drive-item" onClick={ this._handleStarred }>
            <div className="drive-item-icon">
              <div className="maha-asset-icon">
                <i className="fa fa-fw fa-star" />
              </div>
            </div>
            <div className="drive-item-name">
              Starred Items
            </div>
            <div className="drive-item-action">
              <i className="fa fa-fw fa-chevron-right" />
            </div>
          </div>
          <div className="drive-item" onClick={ this._handleTrash }>
            <div className="drive-item-icon">
              <div className="maha-asset-icon">
                <i className="fa fa-fw fa-trash" />
              </div>
            </div>
            <div className="drive-item-name">
              Trash
            </div>
            <div className="drive-item-action">
              <i className="fa fa-fw fa-chevron-right" />
            </div>
          </div>
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
