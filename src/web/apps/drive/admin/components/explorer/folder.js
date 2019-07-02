import { Attachments, Infinite, Message } from 'maha-admin'
import * as selectors from './selectors'
import PropTypes from 'prop-types'
import Items from './items'
import React from 'react'
import Root from './root'
import _ from 'lodash'

class Folder extends React.Component {

  static contextTypes = {
    network: PropTypes.object,
    router: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.bool,
    folder: PropTypes.object,
    records: PropTypes.array,
    onAddSelected: PropTypes.func,
    onBeginDrag: PropTypes.func,
    onClearSelected: PropTypes.func,
    onChangeFolder: PropTypes.func,
    onCreateFile: PropTypes.func,
    onEndDrag: PropTypes.func,
    onMoveItem: PropTypes.func,
    onDrive: PropTypes.func,
    onPreview: PropTypes.func,
    onReplaceSelected: PropTypes.func,
    onShowDetails: PropTypes.func,
    onShared: PropTypes.func,
    onStarred: PropTypes.func,
    onTasks: PropTypes.func,
    onTrash: PropTypes.func,
    onUp: PropTypes.func,
    onUpdateFile: PropTypes.func
  }

  state = {
    cacheKey: null
  }

  _handleCreate = this._handleCreate.bind(this)
  _handlePreview = this._handlePreview.bind(this)
  _handleRefreshFolder = this._handleRefreshFolder.bind(this)
  _handleShowDetails = this._handleShowDetails.bind(this)
  _handleTasks = this._handleTasks.bind(this)
  _handleUp = this._handleUp.bind(this)

  render() {
    const { folder } = this.props
    return (
      <div className="drive-folder">
        <div className="drive-header">
          <div className="drive-header-breadcrumb" onClick={ this._handleUp }>
            <div className="drive-header-back">
              { folder.code === 'root' ?
                <i className="fa fa-fw fa-home" /> :
                <i className="fa fa-fw fa-chevron-left" />
              }
            </div>
            <div className="drive-header-label">
              { folder.label }
            </div>
          </div>
          { folder.code !== 'root' ?
            <div className="drive-header-icon" onClick={ this._handleTasks.bind(this, folder) }>
              <i className="fa fa-fw fa-ellipsis-v" />
            </div> : <div className="drive-header-icon" />
          }
        </div>
        <div className="drive-results" { ...this._getResults() }>
          { folder.code === 'root' ?
            <Root { ...this._getRoot() } /> :
            <Infinite { ...this._getInfinite() } />
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { network } = this.context
    const { folder } = this.props
    network.join(`/admin/drive/folders/${folder.code}`)
    network.subscribe([
      { target: `/admin/drive/folders/${folder.code}`, action: 'refresh', handler: this._handleRefreshFolder }
    ])
    this._handleFocus()
  }

  componentDidUpdate(prevProps) {
    const { active } = this.props
    if(active !== prevProps.active && active) {
      this._handleFocus()
    }
  }

  componentWillUnmount() {
    const { network } = this.context
    const { folder } = this.props
    network.leave(`/admin/drive/folders/${folder.code}`)
    network.unsubscribe([
      { target: `/admin/drive/folders/${folder.code}`, action: 'refresh', handler: this._handleRefreshFolder }
    ])
  }

  _getAttachments() {
    return {
      prompt: 'Upload File(s)',
      networks: ['device','web','google','dropbox','box','microsoft'],
      onChooseAssets: this._handleCreate
    }
  }

  _getFilter(code) {
    if(_.includes(['shared','starred','trash'], code)) return {}
    return {
      filter: {
        code: { $eq: code }
      }
    }
  }

  _getEmptyShared() {
    return {
      icon: 'handshake-o',
      title: 'No Shared Items',
      text: 'You have not had any items shared with you'
    }
  }

  _getEmptyStarred() {
    return {
      icon: 'star',
      title: 'No Starred Items',
      text: 'You have not starred any items'
    }
  }

  _getEmptyTrash() {
    return {
      icon: 'trash',
      title: 'Empty Trash',
      text: 'The trash is empty'
    }
  }

  _getEmptyFolder() {
    return  {
      icon: 'folder-open-o',
      title: 'Empty Folder',
      text: 'There are no items in this folder',
      button: {
        label: 'Upload File(s)',
        modal: <Attachments { ...this._getAttachments() } />
      }
    }
  }

  _getResults() {
    return {
      onClick: this._handlePreview,
      onContextMenu: this._handleTasks
    }
  }

  _getRoot() {
    const { onDrive, onShared, onStarred, onTrash } = this.props
    return {
      onDrive,
      onShared,
      onStarred,
      onTrash
    }
  }

  _getInfinite() {
    const { folder } = this.props
    if(folder.code === 'shared') return this._getShared()
    if(folder.code === 'starred') return this._getStarred()
    if(folder.code === 'trash') return this._getTrash()
    return this._getFolder(folder)
  }

  _getShared() {
    return {
      endpoint: '/api/admin/drive/shared',
      empty: <Message { ...this._getEmptyShared() } />,
      notFound: <Message { ...this._getEmptyShared() } />,
      layout: (props) => <Items { ...this._getItems() } { ...props } />
    }
  }

  _getStarred() {
    return {
      endpoint: '/api/admin/drive/starred',
      empty: <Message { ...this._getEmptyStarred() } />,
      notFound: <Message { ...this._getEmptyStarred() } />,
      layout: (props) => <Items { ...this._getItems() } { ...props } />,
      selectors
    }
  }

  _getTrash() {
    const { cacheKey } = this.state
    return {
      cacheKey,
      endpoint: '/api/admin/drive/trash',
      empty: <Message { ...this._getEmptyTrash() } />,
      notFound: <Message { ...this._getEmptyTrash() } />,
      layout: (props) => <Items { ...this._getItems() } { ...props } />,
      selectors
    }
  }

  _getFolder(folder) {
    const { cacheKey } = this.state
    return {
      cacheKey,
      endpoint: '/api/admin/drive/items',
      ...this._getFilter(folder.code),
      empty: <Message { ...this._getEmptyFolder() } />,
      notFound: <Message { ...this._getEmptyFolder() } />,
      layout: (props) => <Items { ...this._getItems() } { ...props } />
    }
  }

  _getItems() {
    const { folder, onAddSelected, onBeginDrag, onChangeFolder, onClearSelected, onCreateFile, onEndDrag, onMoveItem, onPreview, onReplaceSelected, onTasks, onUpdateFile } = this.props
    return {
      folder,
      onAddSelected,
      onBeginDrag,
      onChangeFolder,
      onClearSelected,
      onCreateFile,
      onEndDrag,
      onMoveItem,
      onPreview,
      onReplaceSelected,
      onTasks,
      onUpdateFile
    }
  }

  _getPath(code) {
    if(code === 'root') return '/admin/drive'
    if(code === 'drive') return '/admin/drive/items'
    if(code === 'shared') return '/admin/drive/shared'
    if(code === 'starred') return '/admin/drive/starred'
    if(code === 'trash') return '/admin/drive/trash'
    return `/admin/drive/folders/${code}`
  }

  _handleFocus() {
    const { folder } = this.props
    const path = this._getPath(folder.code)
    this.context.router.replace(path)
  }

  _handleTasks(e) {
    const { folder } = this.props
    e.stopPropagation()
    e.preventDefault()
    this.props.onTasks([folder], e)
  }

  _handleUp() {
    const { folder } = this.props
    if(folder.code === 'root') return
    this.props.onUp()
  }

  _handleCreate(assets) {
    const { folder, onCreateFile } = this.props
    assets.map(asset => {
      onCreateFile(folder.item_id, asset.id)
    })
  }

  _handlePreview() {
    const { folder, onPreview, onClearSelected } = this.props
    onClearSelected()
    onPreview(folder)
  }

  _handleRefreshFolder() {
    this.setState({
      cacheKey: _.random(100000000, 999999999).toString(36)
    })
  }

  _handleShowDetails(e) {
    e.stopPropagation()
    this.props.onShowDetails()
  }

}

export default Folder
