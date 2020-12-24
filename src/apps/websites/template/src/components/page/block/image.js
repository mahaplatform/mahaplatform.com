import RichText from '../../richtext'
import template from '../../template'
import Image from '../../image'
import React from 'react'

function ImageBlock({ block, data }) {

  const _getImageUrl = ({ image }, data) => {
    return data ? template(image, data) : image
  }

  return (
    <div className="im">
      <div className="imi">
        <Image src={ _getImageUrl(block.content, data) } transforms={{ fit: 'cover', w: 360, h: 360 }} />
      </div>
      <div className="imc">
        { RichText(block.content.caption, data) }
      </div>
    </div>
  )

}

export default ImageBlock
