import { Button, Loader } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Scanner extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    endpoint: PropTypes.string
  }

  state = {
    message: null,
    ready: false,
    total: 0
  }

  canvas = null
  canvasElement = null
  video = null

  _handleCheck = this._handleCheck.bind(this)
  _handleCheckin = this._handleCheckin.bind(this)
  _handleDrawLine = this._handleDrawLine.bind(this)
  _handleFailure = this._handleFailure.bind(this)
  _handleFound = this._handleFound.bind(this)
  _handleInitStream = this._handleInitStream.bind(this)
  _handleReset = this._handleReset.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)
  _handleTick = this._handleTick.bind(this)

  render() {
    const { message, ready, total } = this.state
    if(!ready) return <Loader />
    return (
      <div className="event-scanner">
        <div className="event-scanner-header">
          Tickets Scanned: { total }
        </div>
        <div className="event-scanner-canvas">
          <canvas ref={ node => this.canvasElement = node } hidden={ true } />
          <div className="event-scanner-overlay" />
        </div>
        { message &&
          <div className="event-scanner-body">
            <div className="event-scanner-message">
              <i className={`fa fa-${message.icon}`} />
              <div className="event-scanner-message-text">
                { message.text }
              </div>
              <Button { ...this._getButton() } />
            </div>
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    this._handleLoad()
  }

  componentDidUpdate(prevProps, prevState) {
    const { ready } = this.state
    if(ready !== prevState.ready && ready) {
      this._handleInitVideo()
    }
  }

  _getButton() {
    return {
      label: 'Scan Another',
      color: 'red',
      handler: this._handleReset
    }
  }

  _handleCheck() {
    const ready = typeof window !== 'undefined' && typeof window.jsQR !== 'undefined'
    this.setState({ ready })
    if(!ready) setTimeout(this._handleCheck, 1000)
  }

  _handleCheckin(code) {
    const { endpoint } = this.props
    this.context.network.request({
      endpoint,
      method: 'POST',
      body: {
        code
      },
      onSuccess: this._handleSuccess,
      onFailure: this._handleFailure
    })
  }

  _handleDrawLine(begin, end, color) {
    this.canvas.beginPath()
    this.canvas.moveTo(begin.x, begin.y)
    this.canvas.lineTo(end.x, end.y)
    this.canvas.lineWidth = 4
    this.canvas.strokeStyle = color
    this.canvas.stroke()
  }

  _handleFailure({ data }) {
    this.setState({
      message: {
        icon: 'times-circle',
        text: data.message
      }
    })
  }

  _handleFound(code) {
    this._handleDrawLine(code.location.topLeftCorner, code.location.topRightCorner, '#FF3B58')
    this._handleDrawLine(code.location.topRightCorner, code.location.bottomRightCorner, '#FF3B58')
    this._handleDrawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, '#FF3B58')
    this._handleDrawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, '#FF3B58')
    this._handleCheckin(code.data)
  }

  _handleInitStream(stream) {
    this.video.srcObject = stream
    this.video.setAttribute('playsinline', true)
    this.video.play()
    requestAnimationFrame(this._handleTick)
  }

  _handleInitVideo() {
    this.video = document.createElement('video')
    this.canvas = this.canvasElement.getContext('2d')
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
        aspectRatio: {
          ideal: 1
        }
      }
    }).then(this._handleInitStream)
  }

  _handleLoad() {
    const ready = typeof window !== 'undefined' && typeof window.jsQR !== 'undefined'
    if(ready) return this.setState({ ready })
    const script = document.createElement('script')
    script.async = true
    script.src = '/admin/js/jsqr.min.js'
    document.body.appendChild(script)
    setTimeout(this._handleCheck, 1000)
  }

  _handleReset() {
    this.setState({
      message: null
    })
    requestAnimationFrame(this._handleTick)
  }

  _handleSuccess({ data }) {
    const { total } = this.state
    this.setState({
      message: {
        icon: 'check-circle',
        text: data.full_name
      },
      total: total + 1
    })
  }

  _handleTick() {
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      this.canvasElement.hidden = false
      this.canvasElement.height = this.video.videoHeight
      this.canvasElement.width = this.video.videoWidth
      this.canvas.drawImage(this.video, 0, 0, this.canvasElement.width, this.canvasElement.height)
      const imageData = this.canvas.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height)
      const code = window.jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      })
      if(code) return this._handleFound(code)
    }
    requestAnimationFrame(this._handleTick)
  }

}

export default Scanner
