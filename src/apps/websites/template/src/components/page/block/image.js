import { useRouter } from 'next/router'
import RichText from '../../richtext'
import template from '../../template'
import Image from '../../image'
import React from 'react'

function ImageBlock({ block, data }) {

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

  return (
    <div className="im" onClick={ handleClick }>
      <div className="imi">
        <Image src={ interpolate(image, data) } transforms={{ fit: 'cover', w: 360, h: 360 }} />
      </div>
      <div className="imc">
        { RichText(caption, data) }
      </div>
    </div>
  )

}

export default ImageBlock
