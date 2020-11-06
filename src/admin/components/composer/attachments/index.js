import PropTypes from 'prop-types'
import Items from './items'
import React from 'react'
import _ from 'lodash'

class Attachments extends React.Component {

  static propTypes = {
    attachments: PropTypes.array,
    onRemove: PropTypes.func
  }

  render() {
    const { attachments } = this.props
    if(attachments.length === 0) return null
    return (
      <div className="maha-composer-attachments">
        { attachments.length > 0 &&
          <Items { ...this._getItems(attachments) } />
        }
      </div>
    )
  }

  _getFileAttachments() {
    const { attachments } = this.props
    return attachments.filter(attachment => {
      const filename = attachment.file ? attachment.file.fileName : attachment.file_name
      const extension = filename.split('.').pop()
      return !_.includes(['jpg','jpeg','png'], extension)
    })
  }

  _getImageAttachments() {
    const { attachments } = this.props
    return attachments.filter(attachment => {
      const filename = attachment.file ? attachment.file.fileName : attachment.file_name
      const extension = filename.split('.').pop()
      return _.includes(['jpg','jpeg','png'], extension)
    })
  }

  _getItems(attachments) {
    const { onRemove } = this.props
    return {
      attachments,
      onRemove
    }
  }

  _getImages(images) {
    const { onRemove } = this.props
    return {
      images,
      onRemove
    }
  }

}

export default Attachments
