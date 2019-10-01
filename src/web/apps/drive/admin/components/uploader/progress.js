import { AssetIcon, Message } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'
import _ from 'lodash'

class Progress extends React.Component {

  static propTypes = {
    files: PropTypes.array,
    onClose: PropTypes.func
  }

  _handleClose = this._handleClose.bind(this)

  render() {
    const { files } = this.props
    return (
      <div className="drive-uploader-progress">
        <div className="drive-uploader-progress-header" onClick={ this._handleClose }>
          Close
        </div>
        <div className="drive-uploader-progress-body">
          { files.length > 0 ?
            <div className="drive-uploader-progress-items">
              { files.map((file, index) => (
                <div className="drive-uploader-progress-item" key={`plain_${index}`}>
                  <div className="drive-uploader-progress-item-preview">
                    { file.thumbnail ?
                      <div className="drive-uploader-progress-item-image">
                        <div style={{backgroundImage:`url('${file.thumbnail}')`}}>
                          <img src={ `/admin/images/services/${file.service}.png` } />
                        </div>
                      </div> :
                      <div className="drive-uploader-progress-item-icon">
                        <AssetIcon content_type={ file.content_type } source={ file.service } />
                      </div>
                    }
                  </div>
                  <div className="drive-uploader-progress-item-label">
                    <div className="drive-uploader-progress-item-name">
                      { file.name }<br />
                      <span className={ file.status }>
                        <i className={`fa fa-fw fa-${this._getIcon(file.status)}`} />
                        { _.capitalize(file.status) } ({numeral(file.progress).format('0%')})
                      </span>
                    </div>
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

  _getIcon(status) {
    if(status === 'pending') return 'clock-o'
    if(_.includes(['importing','uploading','processing'], status)) return 'circle-o-notch fa-spin'
    if(status === 'complete') return 'check'
    if(status === 'failed') return 'exclamation-triangle'
  }

  _handleClose() {
    this.props.onClose()
  }

}

export default Progress
