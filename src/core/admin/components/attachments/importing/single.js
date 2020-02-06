import { connect } from 'react-redux'
import Message from '../../message'
import PropTypes from 'prop-types'
import React from 'react'

class Single extends React.Component {

  static propTypes = {
    files: PropTypes.array,
    onBack: PropTypes.func
  }

  render() {
    return <Message { ...this._getMessage() } />
  }

  _getMessage() {
    const file = this.props.files[0]
    return {
      icon: this._getIcon(file.content_type),
      title: file.name,
      component: (
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

export default connect(mapStateToProps)(Single)
