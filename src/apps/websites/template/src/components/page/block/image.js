import RichText from '../../richtext'
import Image from '../../image'
import React from 'react'
import _ from 'lodash'

function ImageBlock({ block }) {

  const data = null

  const _getImageUrl = ({ image }, data) => {
    return data ? _.template(image)({ data }) : image
  }

  return (
    <div className="im">
      <div>
        <Image src={ _getImageUrl(block.content, data) } transforms={{ fit: 'cover', w: 360, h: 360 }} />
      </div>
      <div>{ RichText(block.content.caption) }</div>
    </div>
  )

}

export default ImageBlock
