import { Attachments, Button, List } from 'maha-admin'
import RenameFolder from '../rename_folder'
import RenameFile from '../rename_file'
import { connect } from 'react-redux'
import NewFolder from '../new_folder'
import PropTypes from 'prop-types'
import Transfer from '../transfer'
import Versions from '../versions'
import Access from '../access'
import Share from '../share'
import Move from '../move'
import React from 'react'
import _ from 'lodash'

class Tasks extends React.Component {

  static contextTypes = {
    network: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    item: PropTypes.object,
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
    const { item, title } = this.props
    return (
      <div className="drive-tasks">
        { title &&
          <div className="maha-tasks-title">
            <div className="maha-tasks-title-icon">
              { item.code === 'root' && <i className="fa fa-fw fa-home" /> }
              { item.code === 'shared' && <i className="fa fa-fw fa-handshake-o" /> }
              { item.code === 'starred' && <i className="fa fa-fw fa-star" /> }
              { item.code === 'trash' && <i className="fa fa-fw fa-trash" /> }
              { item.type === 'folder' && <i className="fa fa-fw fa-folder" /> }
              { item.type === 'file' && <i className="fa fa-fw fa-file" /> }
            </div>
            <div className="maha-tasks-title-label">
              { item.label }
            </div>
          </div>
        }
        <List { ...this._getList() } />
      </div>
    )
  }

  _getList() {
    const { item, rights } = this.props
    const mobile = document.body.clientWidth <= 768
    const items = []
    if(item.code === 'root') {
      if(_.includes(rights, 'drive:manage_ownership')) {
        items.push({ component: <Button { ...this._getTransfer() } /> })
      }
    } else if(item.code === 'drive') {
      items.push({ component: <Button { ...this._getNewFolder() } /> })
      items.push({ component: <Button { ...this._getUpload() } /> })
    } else if(item.code === 'trash') {
      items.push({ component: <Button { ...this._getEmpty() } /> })
      items.push({ component: <Button { ...this._getRestoreAll() } /> })
    } else if(item.deleted_at) {
      items.push({ component: <Button { ...this._getRestore() } /> })
      items.push({ component: <Button { ...this._getDelete() } /> })
    } else if(!_.includes(['shared','starred'], item.code)) {
      const can_edit = _.includes(['owner','edit'], item.access_type)
      if(mobile) items.push({ component: <Button { ...this._getDetails() } /> })
      if(can_edit) items.push({ component: <Button { ...this._getAccess() } /> })
      if(item.type === 'folder') {
        if(can_edit) {
          items.push({ component: <Button { ...this._getNewFolder() } /> })
          items.push({ component: <Button { ...this._getUpload() } /> })
        }
      } else if(item.type === 'file') {
        items.push({ component: <Button { ...this._getShare() } /> })
        items.push({ component: <Button { ...this._getDownload() } /> })
        items.push({ component: <Button { ...this._getView() } /> })
        if(can_edit) items.push({ component: <Button { ...this._getVersions() } /> })
      }
      if(can_edit) {
        items.push({ component: <Button { ...this._getMove() } /> })
        items.push({ component: <Button { ...this._getRename() } /> })
        items.push({ component: <Button { ...this._getTrash() } /> })
      }
    }
    return { items }
  }

  _getNewFolder() {
    const { item } = this.props
    return {
      icon: 'folder',
      label: 'Create New Folder',
      className: 'maha-list-item-link',
      modal: <NewFolder parent_id={ item ? item.item_id : null } />
    }
  }

  _getUpload() {
    return {
      icon: 'upload',
      label: 'Upload File(s)',
      className: 'maha-list-item-link',
      modal: <Attachments { ...this._getAttachments() } />
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

  _getAttachments() {
    return {
      icon: 'upload',
      prompt: 'Upload File(s)',
      networks: ['device','web','google','dropbox','box','microsoft'],
      onChooseAssets: this._handleUpload
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

  _getRestore() {
    const { item } = this.props
    return {
      icon: 'rotate-left',
      label: `Restore ${_.capitalize(item.type)}`,
      className: 'maha-list-item-link',
      request: {
        method: 'PATCH',
        endpoint: `/api/admin/drive/items/${item.code}/restore`
      }
    }
  }

  _getDelete() {
    const { item } = this.props
    return {
      icon: 'trash-o',
      label: 'Delete Forever',
      className: 'maha-list-item-link',
      request: {
        method: 'PATCH',
        endpoint: `/api/admin/drive/items/${item.code}/destroy`
      }
    }
  }

  _getDetails() {
    const { item } = this.props
    return {
      icon: 'info-circle',
      label: `${_.capitalize(item.type)} Details`,
      className: 'maha-list-item-link',
      handler: this._handleDetails
    }
  }

  _getShare() {
    const { item } = this.props
    return {
      icon: 'share',
      label: `Share ${_.capitalize(item.type)}`,
      className: 'maha-list-item-link',
      modal: <Share item={ item } />
    }
  }

  _getAccess() {
    const { item } = this.props
    return {
      icon: 'handshake-o',
      label: 'Manage Access',
      className: 'maha-list-item-link',
      modal: <Access item={ item } />
    }
  }

  _getMove() {
    const { item } = this.props
    return {
      icon: 'arrows-alt',
      label: `Move ${_.capitalize(item.type)}`,
      className: 'maha-list-item-link',
      modal: <Move item={ item } />
    }
  }

  _getRename() {
    const { item } = this.props
    const Component = item.type === 'folder' ? RenameFolder : RenameFile
    return {
      icon: 'i-cursor',
      label: `Rename ${_.capitalize(item.type)}`,
      className: 'maha-list-item-link',
      modal: <Component item={ item } />
    }
  }

  _getDownload() {
    const { item, token } = this.props
    return {
      icon: 'download',
      label: 'Download File',
      className: 'maha-list-item-link',
      handler: () => {
        window.location.href = `/api/admin/assets/${item.asset.id}/download?token=${token}`
      }
    }
  }

  _getView() {
    const { item } = this.props
    return {
      icon: 'eye',
      label: 'View File',
      className: 'maha-list-item-link',
      route: `/admin/drive/files/${item.code}`
    }
  }

  _getVersions() {
    const { item } = this.props
    return {
      icon: 'clone',
      label: 'Manage Versions',
      className: 'maha-list-item-link',
      modal: <Versions id={ item.code } />
    }
  }

  _getTrash() {
    const { item } = this.props
    return {
      icon: 'trash-o',
      label: 'Move to Trash',
      className: 'maha-list-item-link',
      confirm: 'Are you sure?',
      request: {
        method: 'PATCH',
        endpoint: `/api/admin/drive/items/${item.code}/trash`
      }
    }
  }

  _handleUpload(assets) {
    const { item, onCreateFile } = this.props
    const folder_id = item ? item.item_id : null
    assets.map(asset => {
      onCreateFile(folder_id, asset.id)
    })
  }

  _handleView() {
    const { item } = this.props
    this.context.router.push(`/admin/drive/files/${item.code}`)
  }

  _handleDetails() {
    const { item } = this.props
    this.props.onShowDetails(true)
    this.props.onPreview(item)
  }

}

const mapStateToProps = (state, props) => ({
  token: state.maha.admin.team.token,
  rights: state.maha.admin.rights
})

export default connect(mapStateToProps)(Tasks)
