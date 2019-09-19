import AssetIcon from '../../asset/icon'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

class Multiple extends React.Component {

  static propTypes = {
    files: PropTypes.array,
    onRemove: PropTypes.func
  }

  render() {
    const { files } = this.props
    return (
      <div className="maha-attachments-review">
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
                  <AssetIcon content_type={ file.content_type } source={ file.service } />
                </div>
              }
            </div>
            <div className="maha-attachments-review-item-label">
              <div className="maha-attachments-review-item-name">
                { file.name }<br />
                <span className="finished">
                  <i className={`fa fa-fw fa-${this._getIcon(file.status)}`} /> { file.status }
                </span>
              </div>
            </div>
            <div className="maha-attachments-review-item-remove">
              <i className="fa fa-times" onClick={ this._handleRemove.bind(this, index) } />
            </div>
          </div>
        )) }
      </div>
    )
  }

  _getIcon(status) {
    if(status === 'importing') return 'circle-o-notch fa-spin'
    if(status === 'imported') return 'check'
    if(status === 'failed') return 'exclamation-triangle'
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files
})

export default connect(mapStateToProps)(Multiple)
