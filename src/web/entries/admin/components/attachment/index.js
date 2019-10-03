import React from 'react'
import Asset from './asset'
import Image from './image'
import Local from './local'

const Attachment = (attachment) => (
  <div className="maha-attachment">
    { attachment.type === 'image' && <Image { ...attachment } /> }
    { attachment.type === 'asset' && <Asset { ...attachment } /> }
    { attachment.type === 'local' && <Local { ...attachment } /> }
  </div>
)

export default Attachment
