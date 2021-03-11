import PropTypes from 'prop-types'
import React from 'react'
import qs from 'qs'

class Image extends React.Component {

  static propTypes = {
    height: PropTypes.number,
    images: PropTypes.object,
    ratio: PropTypes.number,
    transforms: PropTypes.object,
    widths: PropTypes.object
  }

  state = {
    sources: null
  }

  constructor(props) {
    super(props)
    this.state = {
      sources: this._getSources()
    }
  }

  render() {
    const { sources } = this.state
    return (
      <picture>
        { sources.map((source, index) => (
          <source key={`source_${index}`} { ...source } />
        )) }
        <img { ...this._getImage() } />
      </picture>
    )
  }

  _getImage() {
    const { height, images, ratio, widths } = this.props
    const image = images.desktop || images.all
    const width = widths.desktop|| widths.all
    const { w, h } = this._getSize(image, width, height, ratio)
    const { alt, filename, src } = image
    return {
      alt: alt || filename,
      height: h,
      loading: 'lazy',
      src: `/imagecache${src}`,
      width: w
    }
  }

  _getSize(image, width, height, ratio) {
    const w = Math.min(width, image.width)
    const h = Math.floor(ratio * w)
    return { w, h }
  }

  _getSource(media, device, maxWidth) {
    const { height, images, ratio, widths } = this.props
    const image = images[device] || images.all
    const width = maxWidth || widths[device] || widths.all
    const { w, h } = this._getSize(image, width, height, ratio)
    return [
      { media, type: 'image/webp', srcSet: this._getSrcSet(image, w, h, 'webp') },
      { media, type: 'image/jpeg', srcSet: this._getSrcSet(image, w, h, 'jpg') }
    ]
  }

  _getSources() {
    return [
      ...this._getSource('(min-width:981px)', 'desktop'),
      ...this._getSource('(min-width:768px) and (max-width:980px)', 'tablet'),
      ...this._getSource('(min-width:480px) and (max-width:767px)', 'mobile'),
      ...this._getSource('(max-width:479px)', 'mobile', 479)
    ]
  }

  _getSrcSet(image, w, h, format) {
    const srcSet = []
    srcSet.push(this._getUrl(image, w, h, 1, format))
    if(image.width > w) srcSet.push(this._getUrl(image, w, h, 2, format))
    return srcSet.join(', ')
  }

  _getUrl(image, w, h, dpi, format) {
    const { basename, extname, path } = image
    const transforms = {
      ...this.props.transforms || {},
      fit: 'cover',
      w,
      h,
      ...extname !== format ? { fm: extname } : {},
      dpi
    }
    const query = qs.stringify(transforms, { encode: false })
    return `/imagecache/${query}/${path}/${basename}.${format} ${dpi}x`
  }

}

export default Image
