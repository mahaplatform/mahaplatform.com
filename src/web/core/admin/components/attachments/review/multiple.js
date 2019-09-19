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
                  <AssetIcon content_type={ file.content_type } />
                </div>
              }
            </div>
            <div className="maha-attachments-review-item-label">
              <div className="maha-attachments-review-item-name">
                { file.name }<br />
                { file.asset ?
                  <span className="finished">
                    <i className="fa fa-fw fa-check" /> Imported
                  </span> :
                  <span>
                    <i className="fa fa-fw fa-spin fa-circle-o-notch" /> Importing
                  </span>
                }
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

  _handleRemove(index) {
    this.props.onRemove(index)
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files
})

export default connect(mapStateToProps)(Multiple)
