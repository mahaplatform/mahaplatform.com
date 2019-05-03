import PropTypes from 'prop-types'
import React from 'react'
import { FileField } from '../../../client'

class Avatar extends React.Component {

  static contextTypes = {
    admin: PropTypes.object
  }

  static propTypes = {
    token: PropTypes.string,
    photo_id: PropTypes.number,
    onAvatar: PropTypes.func,
    onSetPhotoId: PropTypes.func,
    onChangeMode: PropTypes.func
  }

  _handleClick = this._handleClick.bind(this)
  _handleChange = this._handleChange.bind(this)

  render() {
    const { photo_id } = this.props
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          <div className="maha-signin-content">
            <h2>Upload a Photo</h2>
            <p>Please select a photo to help others identify you and
              your content across the platform</p>
            <FileField { ...this._getFilefield() } />
            <div className="field button-field">
              <button className="ui fluid large button" onClick={ this._handleClick }>
                { photo_id ? 'Continue' : 'Skip' } <i className="right chevron icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _getFilefield() {
    const { photo_id, token } = this.props
    return {
      type: 'filefield',
      button: <div className="maha-signin-avatar"><div className="maha-signin-avatar-placeholder"><i className="fa fa-user-circle" /></div></div>,
      action: '/api/admin/activate/assets/upload',
      endpoint: '/api/admin/activate/assets',
      token,
      multiple: false,
      defaultValue: photo_id,
      onChange: this._handleChange
    }
  }

  _handleBack() {
    this.props.onChangeMode('password')
  }

  _handleChange(id) {
    this.props.onSetPhotoId(id)
  }

  _handleClick() {
    const { photo_id, token, onAvatar, onChangeMode } = this.props
    if(!photo_id) return onChangeMode('notifications')
    onAvatar(token, photo_id)
  }

}

export default Avatar
