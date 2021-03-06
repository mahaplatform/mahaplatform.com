import { connect } from 'react-redux'
import Resumable from 'resumablejs'
import PropTypes from 'prop-types'
import React from 'react'

class Camera extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    icon: PropTypes.string,
    team: PropTypes.object,
    onAddAsset: PropTypes.func,
    onUpdateAsset: PropTypes.func
  }

  static defaultProps = {
    icon: 'camera'
  }

  button = null
  input = null
  resumable = null

  _handleAdd = this._handleAdd.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { icon } = this.props
    return (
      <div className="maha-camera" ref={ node => this.button = node}>
        <i className={`fa fa-${icon}`} />
      </div>
    )
  }

  componentDidMount() {
    const { team } = this.props
    this.resumable = new Resumable({
      target: '/api/admin/assets/upload',
      chunkSize: 1024 * 128,
      permanentErrors: [204, 400, 404, 409, 415, 500, 501],
      headers: {
        'Authorization': `Bearer ${team.token}`
      },
      maxFiles: 1,
      fileType: ['jpg','png','gif','jpeg']
    })
    this.resumable.on('fileAdded', this._handleAdd)
    this.resumable.on('fileSuccess', this._handleSuccess)
    this.resumable.assignBrowse(this.button)
    this.input = this.button.lastChild
    this.input.setAttribute('capture', true)
    this.input.setAttribute('accept', 'image/*')
  }

  _handleAdd(file) {
    this.resumable.upload()
    this.props.onAddAsset({ file })
  }

  _handleSuccess(file, message) {
    const response = JSON.parse(message)
    const asset = response.data
    this.resumable.removeFile(file)
    this.props.onUpdateAsset(file.uniqueIdentifier, asset)
  }

}

const mapStateToProps = (state, props) => ({
  team: state.maha.admin.team
})

export default connect(mapStateToProps)(Camera)
