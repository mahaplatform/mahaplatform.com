import { Button, ModalPanel } from 'maha-admin'
import Resumable from 'resumablejs'
import PropTypes from 'prop-types'
import { convert } from './utils'
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

  leftchannel = []
  recordingLength = 0
  resumable = null
  rightchannel = []
  sampleRate = null
  stream = null

  _handleBack = this._handleBack.bind(this)
  _handleData = this._handleData.bind(this)
  _handleProcess = this._handleProcess.bind(this)
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

  componentDidMount() {
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
    const audioContext = window.AudioContext || window.webkitAudioContext
    const context = new audioContext()
    this.sampleRate = context.sampleRate
    const volume = context.createGain()
    volume.gain.value = 0.5
    const audioInput = context.createMediaStreamSource(stream)
    audioInput.connect(volume)
    const recorder = context.createScriptProcessor(2048, 2, 2)
    recorder.addEventListener('audioprocess', this._handleProcess)
    volume.connect(recorder)
    recorder.connect(context.destination)
    this.setState({
      status: 'recording'
    })
  }

  _handleProcess(stream) {
    var left = stream.inputBuffer.getChannelData (0)
    var right = stream.inputBuffer.getChannelData (1)
    this.leftchannel.push (new Float32Array(left))
    this.rightchannel.push (new Float32Array(right))
    this.recordingLength += 2048
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
    this.setState({
      status: 'processing'
    })
    const data = convert({
      leftchannel: this.leftchannel,
      rightchannel: this.rightchannel,
      recordingLength: this.recordingLength,
      sampleRate: this.sampleRate
    })
    const file = new File([data], 'recording.wav', {
      type: 'audio/x-wav'
    })
    this.resumable.addFile(file)

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
