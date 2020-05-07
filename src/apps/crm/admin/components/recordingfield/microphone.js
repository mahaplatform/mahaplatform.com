import { Button, ModalPanel } from 'maha-admin'
import Resumable from 'resumablejs'
import PropTypes from 'prop-types'
import React from 'react'

class Microphone extends React.PureComponent {

  static contextTypes = {
    admin: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    onAdd: PropTypes.func,
    onBack: PropTypes.func
  }

  state = {
    status: 'pending'
  }

  recorder = null
  resumable = null
  sream = null

  _handleBack = this._handleBack.bind(this)
  _handleData = this._handleData.bind(this)
  _handleRecord = this._handleRecord.bind(this)
  _handleStart = this._handleStart.bind(this)
  _handleStop = this._handleStop.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)
  _handleUpload = this._handleUpload.bind(this)

  render() {
    const { status } = this.state
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="crm-recordingfield-panel">
          { status === 'pending' &&
            <Button { ...this._getStartButton() } />
          }
          { status === 'recording' &&
            <Button { ...this._getStopButton() } />
          }
          { status === 'processing' &&
            <div className="crm-recordingfield-status reviewing">
              Processing...
            </div>
          }
        </div>
      </ModalPanel>
    )
  }

  componentDidUpdate(prevProps) {
    const { token } = this.context.admin.team
    this.resumable = new Resumable({
      target: '/api/admin/assets/upload',
      chunkSize: 1024 * 128,
      permanentErrors: [204, 400, 404, 409, 415, 500, 501],
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    this.resumable.on('fileAdded', this._handleUpload)
    this.resumable.on('fileSuccess', this._handleSuccess)
  }

  _getPanel() {
    return {
      title: 'Record Message',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      instructions: `
        You can record a message with your device's microphone.
      `
    }
  }

  _getStartButton() {
    return {
      label: 'Start Recording',
      color: 'black',
      handler: this._handleStart
    }
  }

  _getStopButton() {
    return {
      label: 'Stop Recording',
      color: 'red',
      handler: this._handleStop
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleData(e) {
    const file = new File([e.data], 'recording.webm', {
      type: 'audio/webm'
    })
    this.resumable.addFile(file)
  }

  _handleRecord(stream) {
    this.stream = stream
    this.setState({
      status: 'recording'
    })
    this.recorder = new MediaRecorder(stream, {
      mimeType: 'audio/webm'
    })
    this.recorder.addEventListener('dataavailable', this._handleData)
    this.recorder.addEventListener('stop', this._handleRecordingStop)
    this.recorder.start()
  }

  _handleStart() {
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    }).then(this._handleRecord)
  }

  _handleStop() {
    const tracks = this.stream.getTracks()
    tracks.map(track => {
      track.stop()
    })
    this.recorder.stop()
    this.setState({
      status: 'processing'
    })
  }

  _handleSuccess(file, data) {
    const asset = JSON.parse(data).data
    this.props.onAdd({
      id: asset.id,
      name: asset.original_file_name,
      service: 'record',
      content_type: asset.content_type,
      asset,
      thumbnail: asset.signed_url,
      status: 'imported'
    })
  }

  _handleUpload() {
    this.resumable.upload()
  }

}

export default Microphone
