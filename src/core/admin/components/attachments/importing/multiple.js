import AssetThumbnail from '../../asset/thumbnail'
import { connect } from 'react-redux'
import Message from '../../message'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'
import _ from 'lodash'

class Multiple extends React.Component {

  static propTypes = {
    files: PropTypes.array
  }

  render() {
    const { files } = this.props
    return (
      <div className="maha-attachments-multiple">
        { files.length > 0 ?
          <div className="maha-attachments-list-items">
            { files.map((file, index) => (
              <div className="maha-attachments-list-item" key={`plain_${index}`}>
                <div className="maha-attachments-list-item-icon">
                  <AssetThumbnail { ...file } />
                  <div className="maha-attachments-list-item-service">
                    <img src={ `/admin/images/services/${file.service}.png` } />
                  </div>
                </div>
                <div className="maha-attachments-list-item-name">
                  { file.name }<br />
                  <span className={ file.status }>
                    <i className={`fa fa-fw fa-${this._getIcon(file.status)}`} />
                    { _.capitalize(file.status) }
                    { file.status === 'uploading' &&
                      <span>({ numeral(file.progress).format('0%') })</span>
                    }
                  </span>
                </div>
              </div>
            )) }
          </div> :
          <Message { ...this._getEmpty() } />
        }
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

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files
})

export default connect(mapStateToProps)(Multiple)
