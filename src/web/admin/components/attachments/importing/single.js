import { connect } from 'react-redux'
import Message from '../../message'
import PropTypes from 'prop-types'
import React from 'react'

class Processing extends React.Component {

  static propTypes = {
    files: PropTypes.array,
    onBack: PropTypes.func
  }

  render() {
    const file = this.props.files[0]
    return <Message { ...this._getMessage() } />
    // return (
    //   <div className="maha-attachments-single">
    //     { file.thumbnail ?
    //       <div className="maha-attachments-single-image">
    //         <div style={{backgroundImage:`url(${file.thumbnail })`}}>
    //           <img src={ `/admin/images/services/${file.service}.png` } />
    //         </div>
    //       </div> :
    //       <div className="maha-attachments-single-icon">
    //         <AssetIcon content_type={ file.content_type } source={ file.service } />
    //       </div>
    //     }
    //     { file.name }<br />
    //     { file.asset ?
    //       <span className="finished">
    //         <i className="fa fa-fw fa-check" /> Imported
    //       </span> :
    //       <span>
    //         <i className="fa fa-fw fa-spin fa-circle-o-notch" /> Importing
    //       </span>
    //     }
    //   </div>
    // )
  }

  _getMessage() {
    const file = this.props.files[0]
    return {
      icon: this._getIcon(file.content_type),
      title: file.name,
      text: (
        <span>
          <i className="fa fa-fw fa-spin fa-circle-o-notch" /> Importing
        </span>
      )
    }
  }

  _getIcon(type) {
    if(type === 'image') return 'picture-o'
    if(type === 'audio') return 'volume-up'
    if(type === 'video') return 'video-camera'
    if(type === 'pdf') return 'file-pdf-o'
    if(type === 'excel') return 'file-excel-o'
    if(type === 'word') return 'file-word-o'
    if(type === 'powerpoint') return 'file-powerpoint-o'
    return 'file-text-o'
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files
})

export default connect(mapStateToProps)(Processing)
