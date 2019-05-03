import PropTypes from 'prop-types'
import React from 'react'

class ImagePreview extends React.Component {

  static propTypes = {
    image: PropTypes.object
  }

  state = {
    width: 0,
    height: 0,
    dataurl: null,
    exif: null
  }

  _handlePreview = this._handlePreview.bind(this)
  _handleProcess = this._handleProcess.bind(this)

  render() {
    const { dataurl, exif } = this.state
    if(!dataurl || !exif) return null
    return (
      <div className="maha-image-preview checkered">
        <div { ...this._getPreview() } />
      </div>
    )
  }

  componentDidMount() {
    this._handlePreview()
  }

  componentDidUpdate(prevProps) {
    const { image } = this.props
    if(image.identifier !== prevProps.image.identifier) {
      this._handlePreview()
    }
  }

  _getPreview() {
    const { dataurl, exif, width, height } = this.state
    const paddingBottom = width === 0 ? 0 : (height / width) * 100
    return {
      className: `maha-image-preview-image exif-${ exif }`,
      style: {
        backgroundImage: `url('${dataurl}')`,
        display: paddingBottom > 0 ? 'block' : 'none',
        paddingBottom: `${paddingBottom}%`
      }
    }
  }

  _handlePreview() {
    const { image } = this.props
    const filereader = new FileReader()
    filereader.readAsArrayBuffer(image.file)
    filereader.onloadend = this._handleProcess
  }

  _getExif(arrayBuffer) {
    try {
      const scanner = new DataView(arrayBuffer)
      let idx = 0
      let value = 1
      if(scanner.getUint16(idx) != 0xFFD8) {
        return value
      }
      idx += 2
      let maxBytes = scanner.byteLength
      var littleEndian = false
      while(idx < maxBytes - 2) {
        idx += 2
        switch(scanner.getUint16(idx)) {
        case 0xFFE1:
          if(scanner.getUint16(idx + 8) === 0x4949) littleEndian = true
          const exifLength = scanner.getUint16(idx, littleEndian)
          maxBytes = exifLength - idx
          idx += 2
          break
        case 0x0112:
          value = scanner.getUint16(idx + 8, littleEndian)
          maxBytes = 0
          break
        }
      }
      return value
    } catch(e) {
      return 1
    }
  }

  _handleProcess(e) {
    const { image } = this.props
    const arrayBuffer = e.target.result
    const bytes = new Uint8Array(arrayBuffer)
    const binary = bytes.reduce((binary, byte) => {
      return binary + String.fromCharCode(byte)
    }, '')
    const base64 = window.btoa(binary)
    const dataurl = `data:${image.file.type};base64,${base64}`
    const el = new Image()
    el.src = dataurl
    el.onload = function() {
      this.setState({
        width: el.width,
        height: el.height
      })
    }.bind(this)
    this.setState({
      dataurl,
      exif: this._getExif(arrayBuffer)
    })
  }

}

export default ImagePreview
