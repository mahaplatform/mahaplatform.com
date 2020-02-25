import AssetThumbnail from '../../asset/thumbnail'
import Message from '../../message'
import { connect } from 'react-redux'
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
          { files.length > 0 ?
            <div className="maha-attachments-list-items">
              { files.map((file, index) => (
                <div className="maha-attachments-list-item" key={`file_${index}`}>
                  <div className="maha-attachments-list-item-icon">
                    <AssetThumbnail { ...file } />
                  </div>
                  <div className="maha-attachments-list-item-name">
                    { file.name }
                  </div>
                  <div className="maha-attachments-list-item-remove">
                    <i className="fa fa-times" onClick={ this._handleRemove.bind(this, index) } />
                  </div>
                </div>
              )) }
            </div> :
            <Message { ...this._getEmpty() } />
          }
        </div>
      </div>
    )
  }

  _getEmpty() {
    return {
      icon: 'file-o',
      title: 'No Files',
      text: 'You have not selected any files'
    }
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

  _handleClose() {
    this.props.onClose()
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files
})

export default connect(mapStateToProps)(Review)
