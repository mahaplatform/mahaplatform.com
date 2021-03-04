import { connect } from 'react-redux'
import Message from '../../message'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class Single extends React.Component {

  static propTypes = {
    files: PropTypes.array,
    onBack: PropTypes.func
  }

  render() {
    return (
      <div className="maha-attachments-single">
        <Message { ...this._getMessage() } />
      </div>
    )
  }

  _getMessage() {
    const file = this.props.files[0]
    const progress = numeral(file.progress).format('0%')
    return {
      icon: this._getIcon(file.content_type),
      title: file.name,
      component: (
        <div className="maha-attachments-single-progress">
          <div className="maha-filefield-progress">
            <div className="ui green tiny progress">
              <div className="bar" style={{ width: progress }} />
            </div>
          </div>
          { file.progress < 1 ?
            <div className="maha-attachments-single-text">
              Uploading
            </div> :
            <div className="maha-attachments-single-text">
              <i className="fa fa-fw fa-spin fa-circle-o-notch" /> Processing
            </div>
          }
        </div>
      )
    }
  }

  _getIcon(content_type) {
    if(content_type.match(/image/)) return 'file-image-o'
    if(content_type.match(/drawing/)) return 'file-image-o'
    if(content_type.match(/audio/)) return 'file-audio-o'
    if(content_type.match(/video/)) return 'file-video-o'
    if(content_type.match(/pdf/)) return 'file-pdf-o'
    if(content_type.match(/excel/)) return 'file-excel-o'
    if(content_type.match(/spreadsheet/)) return 'file-excel-o'
    if(content_type.match(/msword/)) return 'file-word-o'
    if(content_type.match(/powerpoint/)) return 'file-powerpoint-o'
    if(content_type.match(/presentation/)) return 'file-powerpoint-o'
    if(content_type.match(/wordprocessing/)) return 'file-word-o'
    if(content_type.match(/document/)) return 'file-word-o'
    if(content_type.match(/map/)) return 'map-o'
    if(content_type.match(/zip/)) return 'file-archive-o'
    if(content_type.match(/xml/)) return 'file-code-o'
    if(content_type.match(/html/)) return 'file-code-o'
    return 'file-text-o'
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files
})

export default connect(mapStateToProps)(Single)
