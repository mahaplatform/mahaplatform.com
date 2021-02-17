import PropTypes from 'prop-types'
import React from 'react'
import qs from 'qs'

class Image extends React.Component {

  static propTypes = {
    alt: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    host: PropTypes.string,
    src: PropTypes.string,
    src2: PropTypes.string,
    title: PropTypes.string,
    transforms: PropTypes.object,
    onClick: PropTypes.func,
    onLoad: PropTypes.func
  }

  static defaultProps = {
    host: null,
    onLoad: () => {},
    onClick: () => {}
  }

  state = {
    loaded: false
  }

  _handleClick = this._handleClick.bind(this)
  _handleLoad = this._handleLoad.bind(this)

  render() {
    const { src } = this.props
    if(!src) return <div className="maha-image" />
    return (
      <div className="maha-image" onClick={ this._handleClick }>
        <img { ...this._getImage() } />
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { loaded } = this.state
    if(loaded !== prevState.loaded) {
      this.props.onLoad()
    }
  }

  _getHost() {
    if(this.props.host !== null) return this.props.host
    if(process.env.DATA_ASSET_CDN_HOST) return process.env.DATA_ASSET_CDN_HOST
    return ''
  }

  _getImage() {
    const { alt, className, height, title, width } = this.props
    const host = this._getHost()
    const normal = `${host}/imagecache${this._getNormal()}`
    const retina = `${host}/imagecache${this._getRetina()}`
    return {
      alt,
      className,
      src: normal,
      srcSet: `${normal} 1x, ${retina} 2x`,
      title,
      width,
      height,
      onLoad: this._handleLoad
    }
  }

  _getNormal() {
    const { src, transforms } = this.props
    if(!transforms) return src
    const query = qs.stringify(transforms, { encode: false })
    return `/${query}&dpi=2${src}`
  }

  _getRetina() {
    const { src, src2, transforms } = this.props
    if(!transforms) return src2 || src
    const query = qs.stringify(transforms, { encode: false })
    return `/${query}&dpi=2${src2 || src}`
  }

  _handleClick() {
    this.props.onClick()
  }

  _handleLoad() {
    this.setState({
      loaded: true
    })
  }

}

export default Image
