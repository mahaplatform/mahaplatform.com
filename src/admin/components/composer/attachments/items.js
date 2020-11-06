import PropTypes from 'prop-types'
import Image from './image'
import File from './file'
import React from 'react'
import _ from 'lodash'

class Items extends React.Component {

  static propTypes = {
    attachments: PropTypes.array,
    onRemove: PropTypes.func
  }

  render() {
    const { attachments } = this.props
    if(attachments.length === 0) return null
    return (
      <div className="maha-composer-items">
        { attachments.map((attachment, index) => (
          <div className="maha-composer-item" key={`item_${index}`}>
            { this._getType(attachment) === 'image' ?
              <Image { ...this._getImage(attachment, index) } /> :
              <File { ...this._getFile(attachment, index) } />
            }
          </div>
        ))}
      </div>
    )
  }

  _getFile(file, index) {
    return {
      file,
      onRemove: this._handleRemove.bind(this, index)
    }
  }

  _getImage(image, index) {
    return {
      image,
      onRemove: this._handleRemove.bind(this, index)
    }
  }

  _getType(attachment) {
    const filename = attachment.file ? attachment.file.fileName : attachment.file_name
    const extension = filename.split('.').pop()
    return _.includes(['jpg','jpeg','png'], extension) ? 'image' : 'file'
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

}

export default Items
