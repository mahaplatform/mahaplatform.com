import PropTypes from 'prop-types'
import React from 'react'

class Scanner extends React.Component {

  static propTypes = {
  }

  canvas = null
  canvasElement = null
  video = null

  _handleDrawLine = this._handleDrawLine.bind(this)
  _handleInitStream = this._handleInitStream.bind(this)
  _handleTick = this._handleTick.bind(this)

  render() {
    return (
      <div className="event-scanner">
        <canvas ref={ node => this.canvasElement = node } hidden="true" />
        scan!
      </div>
    )
  }

  componentDidMount() {
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

  _handleDrawLine(begin, end, color) {
    this.canvas.beginPath()
    this.canvas.moveTo(begin.x, begin.y)
    this.canvas.lineTo(end.x, end.y)
    this.canvas.lineWidth = 4
    this.canvas.strokeStyle = color
    this.canvas.stroke()
  }

  _handleInitStream(stream) {
    this.video.srcObject = stream
    this.video.setAttribute('playsinline', true)
    this.video.play()
    requestAnimationFrame(this._handleTick)
  }

  _handleTick() {
    // loadingMessage.innerText = "⌛ Loading video..."
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      // loadingMessage.hidden = true
      this.canvasElement.hidden = false
      this.canvasElement.height = this.video.videoHeight
      this.canvasElement.width = this.video.videoWidth
      this.canvas.drawImage(this.video, 0, 0, this.canvasElement.width, this.canvasElement.height)
      // var imageData = this.canvas.getImageData(0, 0, this.canvas.width, this.canvas.height)
      // var code = jsQR(imageData.data, imageData.width, imageData.height, {
      //   inversionAttempts: "dontInvert",
      // })
      // if (code) {
      //   drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58")
      //   drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58")
      //   drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58")
      //   drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58")
      //   outputMessage.hidden = true
      //   outputData.parentElement.hidden = false
      //   outputData.innerText = code.data
      // } else {
      //   outputMessage.hidden = false
      //   outputData.parentElement.hidden = true
      // }
    }
    requestAnimationFrame(this._handleTick)
  }

}

export default Scanner
