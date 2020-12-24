import { useRouter } from 'next/router'
import RichText from '../../richtext'
import template from '../../template'
import PropTypes from 'prop-types'
import Image from '../../image'
import React from 'react'

const ImageBlock = ({ block, data }) => {

  const { caption, image, link } = block.content

  const router = useRouter()

  const interpolate = (text, data) => {
    return data ? template(text, data) : text
  }

  const handleClick = (e) => {
    e.preventDefault()
    if(!link) return
    const href = interpolate(link, data)
    router.push(href)
  }

  const getImage = () => ({
    alt: image.alt ? interpolate(image.alt, data) : null,
    src: interpolate(image.src || image, data),
    transforms: image.transforms,
    height: image.height,
    width: image.width
  })

  return (
    <div className="bi" onClick={ handleClick }>
      <div className="bii">
        <Image { ...getImage() } />
      </div>
      <div className="bic">
        { RichText(caption, data) }
      </div>
    </div>
  )

}

ImageBlock.propTypes = {
  block: PropTypes.object,
  data: PropTypes.array
}

export default ImageBlock
