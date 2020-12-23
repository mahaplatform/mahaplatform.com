import Image from '../../image'
import React from 'react'
import _ from 'lodash'

function ImageBlock({ block }) {

  const data = null

  const _getImageUrl = ({ image_url }, data) => {
    return data ? _.template(image_url)({ data }) : image_url
  }

  return (
    <div>
      <div>
        <Image src={ _getImageUrl(block.content, data) } transforms={{ fit: 'cover', w: 360, h: 360 / config.image_ratio }} />
      </div>
      <div>
        { image.caption }
      </div>
    </div>
  )

}

export default ImageBlock
