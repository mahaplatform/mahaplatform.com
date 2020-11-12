import RichText from './richtext'
import React from 'react'

function ImageBlock({ children, config }) {

  return (
    <div>
      <div>
        <img src={`https://dev.mahaplatform.com:8080/imagecache/fit=cover&w=200&h=200${config.src}`} />
      </div>
      <div>
        { RichText(config.caption, config) }
      </div>
    </div>
  )

}

export default ImageBlock
