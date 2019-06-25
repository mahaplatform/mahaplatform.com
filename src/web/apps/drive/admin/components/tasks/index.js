import { Attachments, Button, List } from 'maha-admin'
import RenameFolder from '../rename_folder'
import RenameFile from '../rename_file'
import { connect } from 'react-redux'
import NewFolder from '../new_folder'
import PropTypes from 'prop-types'
import Transfer from '../transfer'
import Versions from '../versions'
import pluralize from 'pluralize'
import Access from '../access'
import Share from '../share'
import Move from '../move'
import React from 'react'
import _ from 'lodash'
import qs from 'qs'

class Tasks extends React.Component {

  static contextTypes = {
    network: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    items: PropTypes.array,
    rights: PropTypes.array,
    title: PropTypes.bool,
    token: PropTypes.string,
    onChangeFolder: PropTypes.func,
    onCreateFile: PropTypes.func,
    onPreview: PropTypes.func,
    onShowDetails: PropTypes.func
  }

  _handleDetails = this._handleDetails.bind(this)
  _handleUpload = this._handleUpload.bind(this)
  _handleView = this._handleView.bind(this)

  render() {
    const { items, title } = this.props
    return (
      <div className="drive-tasks">
        { title && items.length === 1 &&
          <div className="maha-tasks-title">
            <div className="maha-tasks-title-icon">
              { items[0].code === 'root' && <i className="fa fa-fw fa-home" /> }
              { items[0].code === 'shared' && <i className="fa fa-fw fa-handshake-o" /> }
              { items[0].code === 'starred' && <i className="fa fa-fw fa-star" /> }
              { items[0].code === 'trash' && <i className="fa fa-fw fa-trash" /> }
              { items[0].type === 'folder' && <i className="fa fa-fw fa-folder" /> }
              { items[0].type === 'file' && <i className="fa fa-fw fa-file" /> }
            </div>
            <div className="maha-tasks-title-label">
              { items[0].label }
            </div>
          </div>
        }
        { title && items.length > 1 &&
          <div className="maha-tasks-title">
            <div className="maha-tasks-title-icon">
              <i className="fa fa-fw fa-clone" />
            </div>
            <div className="maha-tasks-title-label">
              { items.length } items
            </div>
          </div>
        }
        <List { ...this._getList() } />
      </div>
    )
  }

  _getList() {
    const { items, rights } = this.props
    const mobile = document.body.clientWidth <= 768
    const options = []
    if(items.length > 1) {
      if(items[0].deleted_at) {
        options.push({ component: <Button { ...this._getRestore(items) } /> })
        options.push({ component: <Button { ...this._getDelete(items) } /> })
      } else {
        options.push({ component: <Button { ...this._getArchive(items) } /> })
        options.push({ component: <Button { ...this._getMove(items) } /> })
        options.push({ component: <Button { ...this._getTrash(items) } /> })
      }
    } else {
      const item = items[0]
      if(item.code === 'root') {
        if(_.includes(rights, 'drive:manage_ownership')) {
          options.push({ component: <Button { ...this._getTransfer() } /> })
        }
      } else if(item.code === 'drive') {
        options.push({ component: <Button { ...this._getNewFolder(item) } /> })
        options.push({ component: <Button { ...this._getUpload(item) } /> })
      } else if(item.code === 'trash') {
        options.push({ component: <Button { ...this._getEmpty() } /> })
        options.push({ component: <Button { ...this._getRestoreAll() } /> })
      } else if(item.deleted_at) {
        options.push({ component: <Button { ...this._getRestore([item]) } /> })
        options.push({ component: <Button { ...this._getDelete([item]) } /> })
      } else if(!_.includes(['shared','starred'], item.code)) {
        const can_edit = _.includes(['owner','edit'], item.access_type)
        if(mobile) options.push({ component: <Button { ...this._getDetails(item) } /> })
        if(can_edit) options.push({ component: <Button { ...this._getAccess(item) } /> })
        if(item.type === 'folder') {
          if(can_edit) {
            options.push({ component: <Button { ...this._getNewFolder(item) } /> })
            options.push({ component: <Button { ...this._getUpload(item) } /> })
          }
        } else if(item.type === 'file') {
          options.push({ component: <Button { ...this._getShare(item) } /> })
          options.push({ component: <Button { ...this._getDownload(item) } /> })
          options.push({ component: <Button { ...this._getView(item) } /> })
          if(can_edit) options.push({ component: <Button { ...this._getVersions(item) } /> })
        }
        if(can_edit) {
          options.push({ component: <Button { ...this._getMove([item]) } /> })
          options.push({ component: <Button { ...this._getRename(item) } /> })
          options.push({ component: <Button { ...this._getTrash([item]) } /> })
        }
      }
    }
    return {
      items: options
    }
  }

  _getArchive(items) {
    const { token } = this.props
    const query = qs.stringify({
      codes: items.map(item => item.code)
    })
    return {
      icon: 'download',
      label: 'Download items',
      className: 'maha-list-item-link',
      url: `/api/admin/drive/items/archive?token=${token}&${query}`
    }
  }

  _getNewFolder(item) {
    return {
      icon: 'folder',
      label: 'Create New Folder',
      className: 'maha-list-item-link',
      modal: <NewFolder parent_id={ item ? item.item_id : null } />
    }
  }

  _getUpload(item) {
    return {
      icon: 'upload',
      label: 'Upload File(s)',
      className: 'maha-list-item-link',
      modal: <Attachments { ...this._getAttachments(item) } />
    }
  }

  _getTransfer() {
    return {
      icon: 'exchange',
      label: 'Transfer Ownership',
      className: 'maha-list-item-link',
      modal: <Transfer />
    }
  }

  _getAttachments(item) {
    return {
      icon: 'upload',
      prompt: 'Upload File(s)',
      networks: ['device','web','google','dropbox','box','microsoft'],
      onChooseAssets: this._handleUpload.bind(this, item)
    }
  }

  _getEmpty() {
    return {
      icon: 'trash-o',
      label: 'Empty Trash',
      className: 'maha-list-item-link',
      request: {
        method: 'POST',
        endpoint: '/api/admin/drive/trash/empty'
      }
    }
  }

  _getRestoreAll() {
    return {
      icon: 'rotate-left',
      label: 'Restore all',
      className: 'maha-list-item-link',
      request: {
        method: 'POST',
        endpoint: '/api/admin/drive/trash/restore_all'
      }
    }
  }

  _getRestore(items) {
    const label = items.length === 1 ? _.capitalize(items[0].type): pluralize('item', items.length)
    return {
      icon: 'rotate-left',
      label: `Restore ${label}`,
      className: 'maha-list-item-link',
      request: {
        method: 'PATCH',
        endpoint: '/api/admin/drive/items/restore',
        body: {
          codes: items.map(item => item.code)
        }
      }
    }
  }

  _getDelete(items) {
    return {
      icon: 'trash-o',
      label: 'Delete Forever',
      className: 'maha-list-item-link',
      request: {
        method: 'PATCH',
        endpoint: '/api/admin/drive/items/destroy',
        body: {
          codes: items.map(item => item.code)
        }
      }
    }
  }

  _getDetails(item) {
    return {
      icon: 'info-circle',
      label: `${_.capitalize(item.type)} Details`,
      className: 'maha-list-item-link',
      handler: this._handleDetails
    }
  }

  _getShare(item) {
    return {
      icon: 'share',
      label: `Share ${_.capitalize(item.type)}`,
      className: 'maha-list-item-link',
      modal: <Share item={ item } />
    }
  }

  _getAccess(item) {
    return {
      icon: 'handshake-o',
      label: 'Manage Access',
      className: 'maha-list-item-link',
      modal: <Access item={ item } />
    }
  }

  _getMove(items) {
    const label = items.length === 1 ? _.capitalize(items[0].type): pluralize('item', items.length)
    return {
      icon: 'arrows-alt',
      label: `Move ${label}`,
      className: 'maha-list-item-link',
      modal: <Move items={ items } />
    }
  }

  _getRename(item) {
    const Component = item.type === 'folder' ? RenameFolder : RenameFile
    return {
      icon: 'i-cursor',
      label: `Rename ${_.capitalize(item.type)}`,
      className: 'maha-list-item-link',
      modal: <Component item={ item } />
    }
  }

  _getDownload(item) {
    const { token } = this.props
    return {
      icon: 'download',
      label: 'Download File',
      className: 'maha-list-item-link',
      url: `/api/admin/assets/${item.asset.id}/download?token=${token}`
    }
  }

  _getView(item) {
    return {
      icon: 'eye',
      label: 'View File',
      className: 'maha-list-item-link',
      route: `/admin/drive/files/${item.code}`
    }
  }

  _getVersions(item) {
    return {
      icon: 'clone',
      label: 'Manage Versions',
      className: 'maha-list-item-link',
      modal: <Versions id={ item.code } />
    }
  }

  _getTrash(items) {
    const label = items.length === 1 ? _.capitalize(items[0].type): pluralize('item', items.length)
    return {
      icon: 'trash-o',
      label: `Remove ${label}`,
      className: 'maha-list-item-link',
      request: {
        method: 'PATCH',
        endpoint: '/api/admin/drive/items/trash',
        body: {
          codes: items.map(item => item.code)
        }
      }
    }
  }

  _handleUpload(item, assets) {
    const { onCreateFile } = this.props
    const folder_id = item ? item.item_id : null
    assets.map(asset => {
      onCreateFile(folder_id, asset.id)
    })
  }

  _handleView(item) {
    this.context.router.push(`/admin/drive/files/${item.code}`)
  }

  _handleDetails(item) {
    this.props.onShowDetails(true)
    this.props.onPreview(item)
  }

}

const mapStateToProps = (state, props) => ({
  token: state.maha.admin.team.token,
  rights: state.maha.admin.rights
})

export default connect(mapStateToProps)(Tasks)
