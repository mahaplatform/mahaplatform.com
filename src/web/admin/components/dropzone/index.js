import { connect } from 'react-redux'
import Message from '../message'
import Resumable from 'resumablejs'
import PropTypes from 'prop-types'
import React from 'react'

class DropZone extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    token: PropTypes.string,
    user: PropTypes.object,
    onAdd: PropTypes.func,
    onUpdate: PropTypes.func
  }

  drop = null
  files = {}
  resumable = null

  state = {
    hovering: false
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleDrop = this._handleDrop.bind(this)
  _handleFinish = this._handleFinish.bind(this)
  _handleStartHover = this._handleStartHover.bind(this)
  _handleStopHover = this._handleStopHover.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { hovering } = this.state
    return (
      <div { ...this._getDropzone() }>
        { this.props.children }
        { hovering &&
          <div { ...this._getHovering() }>
            <Message { ...this._getMessage() } />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { token } = this.props
    this.resumable = new Resumable({
      target: '/api/admin/assets/upload',
      chunkSize: 1024 * 128,
      permanentErrors: [204, 400, 404, 409, 415, 500, 501],
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    this.resumable.on('fileAdded', this._handleAdd)
    this.resumable.on('fileSuccess', this._handleSuccess)
    this.resumable.assignDrop(this.drop)
  }

  _getDropzone() {
    return {
      className: 'maha-dropzone',
      ref: node => this.drop = node,
      onDrag: this._handleStartHover,
      onDragStart: this._handleStartHover,
      onDragEnter: this._handleStartHover,
      onDragOver: this._handleStartHover
    }
  }

  _getHovering() {
    return {
      className: 'maha-dropzone-hovering',
      onDragEnd: this._handleStopHover,
      onDragExit: this._handleStopHover,
      onDragLeave: this._handleStopHover,
      onDrop: this._handleDrop
    }
  }

  _getMessage() {
    return {
      icon: 'upload',
      title: 'Drop Files',
      text: 'Drop files here to attach them'
    }
  }

  _handleAdd(file) {
    this.setState({ hovering: false })
    this.props.onAdd([{
      content_type: file.file.type,
      file_name: file.file.name,
      file: file.file,
      identifier: file.uniqueIdentifier,
      source: 'device'
    }])
    this.resumable.upload()
  }

  _handleDrop(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  _handleStartHover(e) {
    e.preventDefault()
    e.stopPropagation()
    if(this.state.hovering) return
    this.setState({ hovering: true })
  }

  _handleStopHover(e) {
    e.preventDefault()
    e.stopPropagation()
    if(!this.state.hovering) return
    this.setState({ hovering: false })
  }

  _handleFinish(asset) {
    const { network } = this.context
    if(asset.status !== 'processed') return
    const file = this.files[asset.id]
    network.leave(`/admin/assets/${asset.id}`)
    network.unsubscribe([
      { target: `/admin/assets/${asset.id}`, action: 'refresh', handler: this._handleFinish }
    ])
    delete this.files[asset.id]
    this.props.onUpdate(file.uniqueIdentifier, asset)
  }

  _handleSuccess(file, message) {
    const { network } = this.context
    const response = JSON.parse(message)
    const asset = response.data
    this.resumable.removeFile(file)
    this.props.onUpdate(file.uniqueIdentifier, asset)
    this.files[asset.id] = file
    network.join(`/admin/assets/${asset.id}`)
    network.subscribe([
      { target: `/admin/assets/${asset.id}`, action: 'refresh', handler: this._handleFinish }
    ])
  }

}

const mapStateToProps = (state, props) => ({
  token: state.maha.admin.team.token
})

export default connect(mapStateToProps)(DropZone)
