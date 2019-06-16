import { Image, List, Message } from 'maha-admin'
import specials from '../specials'
import PropTypes from 'prop-types'
import Accesses from './accesses'
import Folder from './folder'
import Tasks from '../tasks'
import React from 'react'
import _ from 'lodash'

class Details extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    network: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    item: PropTypes.object,
    onChangeFolder: PropTypes.func,
    onCreateFile: PropTypes.func,
    onPreview: PropTypes.func,
    onShowDetails: PropTypes.func
  }

  _handleHideDetails = this._handleHideDetails.bind(this)
  _handleView = this._handleView.bind(this)

  render() {
    const { item } = this.props
    return (
      <div className="drive-details">
        <div className="drive-details-title">
          <div className="drive-details-title-close" onClick={ this._handleHideDetails }>
            <i className="fa fa-fw fa-remove" />
          </div>
          <div className="drive-details-title-text">
            { item ? item.label : 'Maha Drive' }
          </div>
        </div>
        <List { ...this._getList() } />
        <Tasks { ...this._getTasks() } />
      </div>
    )
  }

  _getTasks() {
    const { item, onCreateFile, onPreview } = this.props
    return {
      item,
      title: false,
      onCreateFile,
      onPreview
    }
  }

  _getSpecialList() {
    const { item } = this.props
    const items = []
    items.push({ component: <Message icon={ item.icon }/> })
    if(item.description) items.push({ component: <div className="drive-details-description">{ item.description }</div> })
    return { items }
  }

  _getFolderList() {
    const { item } = this.props
    const items = []
    const folder = item.folder || specials.drive
    items.push({ label: 'Created At', content: item.created_at, format: 'datetime' })
    if(item.deleted_at) {
      items.push({ label: 'Folder', content: <Folder { ...this._getFolder(specials.trash) } /> })
      if(item.folder) items.push({ label: 'Removed From', content: <Folder { ...this._getFolder(folder) } /> })
    } else {
      items.push({ label: 'Folder', content: <Folder { ...this._getFolder(folder) } /> })
    }
    if(item.accesses) {
      items.push({ label: 'Access', content: <Accesses accesses={ item.accesses }/> })
    }
    return { items }
  }

  _getFileList() {
    const { item } = this.props
    const { asset } = item
    const folder = item.folder || specials.drive
    const items = []
    if(asset) {
      const is_image = asset.content_type.match(/image/)
      const previewSrc = is_image ? asset.path : `/assets/${asset.id}/preview.jpg`
      items.push({ component: <Image src={ previewSrc } onClick={ this._handleView } title={ asset.original_file_name } transforms={{ fit: 'cover', h: 200, w: 320 }} />})
    } else {
      items.push({ component: <Message icon="folder" />})
    }
    items.push({ label: 'Created At', content: item.created_at, format: 'datetime' })
    if(item.deleted_at) {
      items.push({ label: 'Folder', content: <Folder { ...this._getFolder(specials.trash) } /> })
      if(item.folder) items.push({ label: 'Removed From', content: <Folder { ...this._getFolder(folder) } /> })
    } else {
      items.push({ label: 'Folder', content: <Folder { ...this._getFolder(folder) } /> })
    }
    if(item.accesses) {
      items.push({ label: 'Access', content: <Accesses accesses={ item.accesses }/> })
    }
    return { items }
  }

  _getList() {
    const { item } = this.props
    const special = _.includes(['root','drive','shared','starred','trash'], item.code)
    if(special) return this._getSpecialList()
    if(item.type === 'folder') return this._getFolderList()
    if(item.type === 'file') return this._getFileList()
  }

  _getFolder(folder) {
    const { onChangeFolder } = this.props
    return {
      folder,
      onChangeFolder
    }
  }

  _handleHideDetails() {
    this.props.onShowDetails(false)
  }

  _handleView() {
    const { item } = this.props
    this.context.router.push(`/admin/drive/files/${item.code}`)
  }

}

export default Details
