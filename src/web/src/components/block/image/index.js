import './style.less'
import Image from '@client/components/image'
import RichText from '../../../richtext'
import Style from '../../../style'
import React from 'react'
import _ from 'lodash'

function ImageBlock({ config, data }) {

  const _getImageClassName = ({ image_format }) => {
    const classes = ['maha-image-block-image']
    if(image_format) classes.push(image_format)
    return classes.join(' ')
  }

  const _getImageUrl = ({ image_url }, data) => {
    return data ? _.template(image_url)({ data }) : image_url
  }

  return (
    <div className="maha-image-block" style={ Style(null, config.style) }>
      <div style={ Style(null, config.image_style) }>
        <div className={ _getImageClassName(config) }>
          <Image src={ _getImageUrl(config, data) } transforms={{ fit: 'cover', w: 200, h: 200 }} />
        </div>
      </div>
      <div className="maha-image-block-caption" style={ Style(null, config.caption_style) }>
        { RichText(config.caption, config.style, data) }
      </div>
    </div>
  )

}

export default ImageBlock
