import { useRouter } from 'next/router'
import RichText from '../../richtext'
import template from '../../template'
import PropTypes from 'prop-types'
import Image from '../../image'
import React from 'react'
import _ from 'lodash'

const ImageBlock = ({ block, data, widths }) => {

  const { caption, image, link } = block.content

  const router = useRouter()

  const interpolate = (text, data) => {
    if(!text) return null
    if(typeof(text) !== 'string') return text
    return data ? template(text, data) : text
  }

  const attrs = (image, data) => {
    const src = interpolate(image.src || image, data)
    const parts = src.substr(1).split('/')
    const filename = parts.slice(-1)[0]
    const fileparts = filename.split('.')
    return {
      src,
      filename,
      path: parts.slice(0, parts.length - 1).join('/'),
      basename: fileparts.slice(0, fileparts.length - 1).join('.'),
      extname: fileparts.slice(-1)[0],
      alt: image.alt ? interpolate(image.alt, data) : null,
      ratio: interpolate(image.ratio, data),
      height: interpolate(image.height, data),
      width: interpolate(image.width, data)
    }
  }

  const expand = (template, data) => {
    if(!template.isResponsive) {
      return {
        all: attrs(template.all || template, data)
      }
    }
    return {
      desktop: attrs(template.desktop, data),
      tablet: attrs(template.tablet, data),
      mobile: attrs(template.mobile, data)
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    if(!link) return
    const href = interpolate(link, data)
    router.push(href)
  }

  const getImage = (block, image, widths, data) => {
    return {
      images: expand(image, data),
      ratio: _.get(block, 'styles.image.ratio') || (image.height / image.width),
      height: _.get(block, 'styles.image.height'),
      widths
    }
  }

  return (
    <div className="bi" onClick={ handleClick }>
      <div className="bii">
        <Image { ...getImage(block, image, widths, data) } />
      </div>
      <div className="bic">
        { RichText(caption, data) }
      </div>
    </div>
  )

}

ImageBlock.propTypes = {
  block: PropTypes.object,
  data: PropTypes.object,
  widths: PropTypes.object
}

export default ImageBlock
