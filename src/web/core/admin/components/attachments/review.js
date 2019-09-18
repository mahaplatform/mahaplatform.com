import AssetIcon from '../asset/icon'
import PropTypes from 'prop-types'
import React from 'react'

class Review extends React.Component {

  static propTypes = {
    files: PropTypes.array,
    onClose: PropTypes.func,
    onRemove: PropTypes.func
  }

  _handleClose = this._handleClose.bind(this)

  render() {
    const { files } = this.props
    return (
      <div className="maha-attachments-review">
        <div className="maha-attachments-review-header" onClick={ this._handleClose }>
          Close
        </div>
        <div className="maha-attachments-review-body">
          { files.map((file, index) => (
            <div className="maha-attachments-review-item" key={`plain_${index}`}>
              <div className="maha-attachments-review-item-preview">
                { file.thumbnail ?
                  <div className="maha-attachments-review-item-image">
                    <div style={{backgroundImage:`url(${file.thumbnail })`}}>
                      <img src={ `/admin/images/services/${file.service}.png` } />
                    </div>
                  </div> :
                  <div className="maha-attachments-review-item-icon">
                    <AssetIcon content_type={ file.content_type } />
                  </div>
                }
              </div>
              <div className="maha-attachments-review-item-label">
                <div className="maha-attachments-review-item-name">
                  { file.name }<br />
                </div>
              </div>
              <div className="maha-attachments-review-item-remove">
                <i className="fa fa-times" onClick={ this._handleRemove.bind(this, index) } />
              </div>
            </div>
          )) }
        </div>
      </div>
    )
  }

  _handleClose() {
    this.props.onClose()
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

}

export default Review
