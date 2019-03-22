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
    onAdd: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    icon: 'camera'
  }

  button = null
  files = {}
  input = null
  resumable = null

  _handleAdd = this._handleAdd.bind(this)
  _handleClick = this._handleClick.bind(this)
  _handleFinish = this._handleFinish.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { icon } = this.props
    return (
      <div className="maha-camera" ref={ node => this.button = node }>
        <input type="file" ref={ node => this.input = node } capture />
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
    this.button.addEventListener('click', this._handleClick, false)
    this.resumable.assignBrowse(this.input)
    this.input.setAttribute('accept', 'image/*')
  }

  _handleAdd(file) {
    this.props.onAdd({
      content_type: file.file.type,
      file: file.file,
      identifier: file.uniqueIdentifier,
      source: 'device'
    })
    this.resumable.upload()
  }

  _handleClick() {
    this.input.style.display = 'block'
    this.input.focus()
    this.input.click()
    this.input.style.display = 'none'
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
  team: state.maha.admin.team
})

export default connect(mapStateToProps)(Camera)
