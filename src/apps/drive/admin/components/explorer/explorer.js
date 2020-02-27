import { Searchbox, Infinite, Message, Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import specials from '../specials'
import Uploader from '../uploader'
import Details from '../details'
import Folder from './folder'
import Tasks from '../tasks'
import Grid from './grid'
import List from './list'
import React from 'react'

class Explorer extends React.Component {

  static contextTypes = {
    alert: PropTypes.object,
    confirm: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    code: PropTypes.string,
    details: PropTypes.bool,
    folders: PropTypes.array,
    info: PropTypes.bool,
    preview: PropTypes.object,
    q: PropTypes.string,
    selected: PropTypes.array,
    view: PropTypes.string,
    onAddSelected: PropTypes.func,
    onChangeFolder: PropTypes.func,
    onClearSelected: PropTypes.func,
    onCreateFile: PropTypes.func,
    onMove: PropTypes.func,
    onFetchFolder: PropTypes.func,
    onPreview: PropTypes.func,
    onReplaceSelected: PropTypes.func,
    onSetQuery: PropTypes.func,
    onShowDetails: PropTypes.func,
    onTasks: PropTypes.func,
    onToggleInfo: PropTypes.func,
    onToggleView: PropTypes.func,
    onUp: PropTypes.func,
    onUpdateFile: PropTypes.func
  }

  _handleChangeFolder = this._handleChangeFolder.bind(this)
  _handleDrive = this._handleDrive.bind(this)
  _handleMove = this._handleMove.bind(this)
  _handleShared = this._handleShared.bind(this)
  _handleStarred = this._handleStarred.bind(this)
  _handleTasks = this._handleTasks.bind(this)
  _handleToggleInfo = this._handleToggleInfo.bind(this)
  _handleToggleView = this._handleToggleView.bind(this)
  _handleTrash = this._handleTrash.bind(this)

  render() {
    const { info, q } = this.props
    return (
      <div className={ this._getClass() }>
        <div className="drive-heading">
          <div className="drive-heading-box">
            <div className="drive-heading-search">
              <Searchbox { ...this._getSearchbox() } />
            </div>
            <div className="drive-heading-action" onClick={ this._handleToggleView }>
              <i className={`fa fa-${ this._getView() }`} />
            </div>
            <div className="drive-heading-action" onClick={ this._handleToggleInfo }>
              <i className={`fa fa-${ this._getInfo() }`} />
            </div>
          </div>
        </div>
        <div className="drive-main">
          <div className="drive-list">
            <Uploader>
              { q.length === 0 && <Stack { ...this._getStack() } /> }
              { q.length > 0 && <Infinite { ...this._getInfinite() } /> }
            </Uploader>
          </div>
          <div className="drive-overlay" onClick={ this._handleShowDetails.bind(this, false) } />
          { info &&
            <Details { ...this._getDetails() } />
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { code } = this.props
    if(code === 'root') return this._handleRoot()
    if(code === 'drive') return this._handleDrive()
    if(code === 'shared') return this._handleShared()
    if(code === 'starred') return this._handleStarred()
    if(code === 'trash') return this._handleTrash()
    if(code) return this._handleFetchFolder(code)
  }

  _getClass() {
    const { details } = this.props
    const classes= ['drive']
    if(details) classes.push('details')
    return classes.join(' ')
  }

  _getDetails() {
    const { preview, onCreateFile, onShowDetails } = this.props
    return {
      item: preview,
      onCreateFile,
      onShowDetails,
      onChangeFolder: this._handleChangeFolder
    }
  }

  _getEmpty() {
    return {
      icon: 'times',
      title: 'No Results',
      text: 'There are no files that matched your query'
    }
  }

  _getFolder(folder) {
    const { view, onAddSelected, onClearSelected, onCreateFile, onPreview, onReplaceSelected, onUpdateFile, onUp, onShowDetails } = this.props
    return {
      folder,
      view,
      onAddSelected,
      onClearSelected,
      onCreateFile,
      onPreview,
      onReplaceSelected,
      onUpdateFile,
      onUp,
      onShowDetails,
      onChangeFolder: this._handleChangeFolder,
      onDrive: this._handleDrive,
      onMove: this._handleMove,
      onShared: this._handleShared,
      onStarred: this._handleStarred,
      onTasks: this._handleTasks,
      onTrash: this._handleTrash
    }
  }

  _getInfinite() {
    const { q, view } = this.props
    return {
      endpoint: '/api/admin/drive/items',
      filter: { q, type: { $eq: 'file' } },
      empty: <Message { ...this._getEmpty() } />,
      notFound: <Message { ...this._getEmpty() } />,
      layout: view === 'list' ? List : Grid,
      props: this._getList()
    }
  }

  _getList() {
    const { onAddSelected, onClearSelected, onCreateFile, onMove, onReplaceSelected, onPreview, onTasks, onUpdateFile } = this.props
    return {
      folder: {
        code: 'search'
      },
      onAddSelected,
      onClearSelected,
      onCreateFile,
      onMove,
      onPreview,
      onReplaceSelected,
      onTasks,
      onUpdateFile,
      onChangeFolder: this._handleChangeFolder
    }
  }

  _getPreview() {
    return this.props.preview
  }

  _getSearchbox() {
    const { onSetQuery } = this.props
    return {
      prompt: 'Find a file...',
      onChange: onSetQuery
    }
  }

  _getStack() {
    const { folders } = this.props
    return {
      cards: [
        ...folders.map((folder, index) => (
          { component: Folder, props: this._getFolder(folder) }
        ))
      ]
    }
  }

  _getTasks(items) {
    const { onCreateFile, onPreview, onShowDetails } = this.props
    return {
      items,
      title: true,
      onCreateFile,
      onPreview,
      onShowDetails
    }
  }

  _getInfo() {
    const { info } = this.props
    return info ? 'info-circle' : 'info'
  }

  _getView() {
    const { view } = this.props
    return view === 'list' ? 'list' : 'th'
  }

  _handleChangeFolder(folder) {
    const { folders } = this.props
    if(folder.code === folders[folders.length - 1].code) return
    this.props.onChangeFolder(folder)
  }

  _handleDrive() {
    this.props.onChangeFolder(specials.drive)
    this.props.onPreview(specials.drive)
  }

  _handleFetchFolder(code) {
    this.props.onFetchFolder(code)
  }

  _handleMove(target) {
    const { selected } = this.props
    const { alert } = this.context
    const codes = selected.map(item => item.code)
    const allowed = selected.find(item => item.access_type === 'view') === undefined
    if(!allowed) return alert.open('You do not have permission to move one or more of these file to another folder')
    if(target.access_type === 'view') return alert.open('You do not have permission to move files to this folder')
    this.props.onMove(codes, target.item_id)
  }

  _handleShared() {
    this.props.onChangeFolder(specials.shared)
    this.props.onPreview(specials.shared)
  }

  _handleShowDetails(show) {
    this.props.onShowDetails(show)
  }

  _handleStarred() {
    this.props.onChangeFolder(specials.starred)
    this.props.onPreview(specials.starred)
  }

  _handleTasks(items) {
    this.context.tasks.open({
      items: [
        { component: <Tasks { ...this._getTasks(items) } /> }
      ]
    })
  }

  _handleToggleInfo() {
    this.props.onToggleInfo()
  }

  _handleToggleView() {
    this.props.onToggleView()
  }

  _handleTrash() {
    this.props.onChangeFolder(specials.trash)
    this.props.onPreview(specials.trash)
  }

}

export default Explorer
