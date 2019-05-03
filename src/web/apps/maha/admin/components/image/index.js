import PropTypes from 'prop-types'
import React from 'react'
import qs from 'qs'

class Image extends React.Component {

  static propTypes = {
    alt: PropTypes.string,
    className: PropTypes.string,
    src: PropTypes.string,
    src2: PropTypes.string,
    title: PropTypes.string,
    transforms: PropTypes.object,
    onClick: PropTypes.func,
    onLoad: PropTypes.func
  }

  static defaultProps = {
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
      <div className={`maha-image ${ src.match(/.png/) != null ? 'checkered' : '' }`} onClick={ this._handleClick }>
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

  _getImage() {
    const { alt, className, title } = this.props
    const host = process.env.DATA_ASSET_CDN_HOST || ''
    const normal = `${host}/imagecache${this._getNormal()}`
    const retina = `${host}/imagecache${this._getRetina()}`
    return {
      alt,
      className,
      src: normal,
      srcSet: `${normal} 1x, ${retina} 2x`,
      title,
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
