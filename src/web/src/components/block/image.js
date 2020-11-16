import Image from '@client/components/image'
import RichText from '../richtext'
import React from 'react'

function ImageBlock({ children, config }) {

  return (
    <div>
      <div>
        <Image src={ config.src } transforms={{ fit: 'cover', w: 200, h: 200 }} />
      </div>
      <div>
        { RichText(config.caption, config) }
      </div>
    </div>
  )

}

export default ImageBlock
