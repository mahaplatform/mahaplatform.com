import { Image, List, Message, ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Info extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    item: PropTypes.object
  }

  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() } >
        <div className="drive-info">
          <List { ...this._getList() } />
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    const { item } = this.props
    return {
      title: item.label,
      rightItems: [
        { label: 'Done', handler: this._handleDone }
      ]
    }
  }

  _getList() {
    const { item } = this.props
    const { asset } = item
    const items = []
    if(asset) {
      const is_image = asset.content_type.match(/(jpeg|jpg|gif|png)/)
      const previewSrc = is_image ? asset.path : `/assets/${asset.id}/preview.jpg`
      items.push({ component: () => <Image src={ previewSrc } title={ asset.original_file_name } transforms={{ fit: 'cover', h: 200, w: 320 }} />})
    } else {
      items.push({ component: () => <Message icon="folder" />})
    }
    items.push({ label: 'Owned By', content: item.owner.full_name })
    items.push({ label: 'Created At', content: item.created_at, format: 'datetime' })
    if(item.folder) items.push({ label: 'Folder', content: item.folder.label })
    return { items }
  }

  _handleDone() {
    this.context.modal.close()
  }

}

export default Info
