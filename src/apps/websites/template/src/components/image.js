import PropTypes from 'prop-types'
import React from 'react'
import qs from 'qs'

class Image extends React.Component {

  static propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string,
    title: PropTypes.string,
    transforms: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number
  }

  state = {
    basename: null,
    extname: null,
    path: null,
    src: null
  }

  constructor(props) {
    super(props)
    this.state = this._getParsed(props.src)
  }

  render() {
    return (
      <picture>
        <source { ...this._getSource() } />
        <img { ...this._getImage() } />
      </picture>
    )
  }

  _getHost() {
    return process.env.NODE_ENV !== 'production' ? 'https://assets.mahaplatform.com' : ''
  }

  _getImage() {
    const { alt, className, height, title, width } = this.props
    const { filename } = this.state
    return {
      alt: alt || filename,
      className,
      ...!!height ? { height } : {},
      src: this._getUrl(1, 'jpg'),
      srcSet: this._getSourceset('jpg'),
      title,
      ...!!width ? { width } : {},
      onLoad: this._handleLoad
    }
  }

  _getParsed(src) {
    const parts = src.substr(1).split('/')
    const filename = parts.slice(-1)[0]
    const fileparts = filename.split('.')
    return {
      src,
      filename,
      path: parts.slice(0, parts.length - 1).join('/'),
      basename: fileparts.slice(0, fileparts.length - 1).join('.'),
      extname: fileparts.slice(-1)[0]
    }
  }

  _getSource() {
    return {
      type: 'image/webp',
      srcSet: this._getSourceset('webp')
    }
  }

  _getSourceset(format) {
    return [
      this._getUrl(1, format),
      this._getUrl(2, format)
    ].join(', ')
  }

  _getUrl(dpi, format) {
    const { basename, extname, path } = this.state
    const transforms = {
      ...this.props.transforms || {},
      ...extname !== format ? { fm: extname } : {},
      dpi
    }
    const query = qs.stringify(transforms, { encode: false })
    const host = this._getHost()
    return `${host}/imagecache/${query}/${path}/${basename}.${format} ${dpi}x`
  }

}

export default Image
