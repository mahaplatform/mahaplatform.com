import { Searchbox, Infinite, Message, Stack } from 'maha-admin'
import DragLayer from './drag_layer'
import PropTypes from 'prop-types'
import specials from '../specials'
import Details from '../details'
import Folder from './folder'
import Tasks from '../tasks'
import Items from './items'
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
    preview: PropTypes.object,
    q: PropTypes.string,
    selected: PropTypes.array,
    onAddSelected: PropTypes.func,
    onBeginDrag: PropTypes.func,
    onChangeFolder: PropTypes.func,
    onClearSelected: PropTypes.func,
    onCreateFile: PropTypes.func,
    onEndDrag: PropTypes.func,
    onMoveItem: PropTypes.func,
    onFetchFolder: PropTypes.func,
    onPreview: PropTypes.func,
    onReplaceSelected: PropTypes.func,
    onSetQuery: PropTypes.func,
    onShowDetails: PropTypes.func,
    onTasks: PropTypes.func,
    onUp: PropTypes.func,
    onUpdateFile: PropTypes.func
  }

  _handleChangeFolder = this._handleChangeFolder.bind(this)
  _handleDrive = this._handleDrive.bind(this)
  _handleMoveItem = this._handleMoveItem.bind(this)
  _handleShared = this._handleShared.bind(this)
  _handleStarred = this._handleStarred.bind(this)
  _handleTasks = this._handleTasks.bind(this)
  _handleTrash = this._handleTrash.bind(this)

  render() {
    const { q } = this.props
    return (
      <div className={ this._getClass() }>
        <div className="drive-search">
          <Searchbox { ...this._getSearchBox() } />
        </div>
        <div className="drive-main">
          <DragLayer />
          <div className="drive-list">
            { q.length === 0 && <Stack { ...this._getStack() } /> }
            { q.length > 0 && <Infinite { ...this._getInfinite() } /> }
          </div>
          <div className="drive-overlay" onClick={ this._handleShowDetails.bind(this, false) } />
          <Details { ...this._getDetails() } />
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

  _getSearchBox() {
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

  _getPreview() {
    return this.props.preview
  }

  _getInfinite() {
    const { q } = this.props
    return {
      endpoint: '/api/admin/drive/items',
      filter: { q, type: { $eq: 'file' } },
      empty: <Message { ...this._getEmpty() } />,
      notFound: <Message { ...this._getEmpty() } />,
      layout: (props) => <Items  { ...props } { ...this._getItems() } />
    }
  }

  _getEmpty() {
    return {
      icon: 'times',
      title: 'No Results',
      text: 'There are no files that matched your query'
    }
  }

  _getItems() {
    const { onAddSelected, onBeginDrag, onClearSelected, onCreateFile, onEndDrag, onMoveItem, onReplaceSelected, onPreview, onTasks, onUpdateFile } = this.props
    return {
      folder: {
        code: 'search'
      },
      onAddSelected,
      onBeginDrag,
      onClearSelected,
      onCreateFile,
      onEndDrag,
      onMoveItem,
      onPreview,
      onReplaceSelected,
      onTasks,
      onUpdateFile,
      onChangeFolder: this._handleChangeFolder
    }
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

  _getFolder(folder) {
    const { onAddSelected, onBeginDrag, onClearSelected, onCreateFile, onEndDrag, onPreview, onReplaceSelected, onUpdateFile, onUp, onShowDetails } = this.props
    return {
      folder,
      onAddSelected,
      onBeginDrag,
      onClearSelected,
      onCreateFile,
      onEndDrag,
      onPreview,
      onReplaceSelected,
      onUpdateFile,
      onUp,
      onShowDetails,
      onChangeFolder: this._handleChangeFolder,
      onDrive: this._handleDrive,
      onMoveItem: this._handleMoveItem,
      onShared: this._handleShared,
      onStarred: this._handleStarred,
      onTasks: this._handleTasks,
      onTrash: this._handleTrash
    }
  }

  _getTasks(item) {
    const { onCreateFile, onPreview, onShowDetails } = this.props
    return {
      item,
      title: true,
      onCreateFile,
      onPreview,
      onShowDetails
    }
  }

  _handleChangeFolder(folder) {
    const { folders } = this.props
    if(folder.code === folders[folders.length - 1].code) return
    this.props.onChangeFolder(folder)
  }

  _handleShowDetails(show) {
    this.props.onShowDetails(show)
  }

  _handleDrive() {
    this.props.onChangeFolder(specials.drive)
    this.props.onPreview(specials.drive)
  }

  _handleShared() {
    this.props.onChangeFolder(specials.shared)
    this.props.onPreview(specials.shared)
  }

  _handleStarred() {
    this.props.onChangeFolder(specials.starred)
    this.props.onPreview(specials.starred)
  }

  _handleTrash() {
    this.props.onChangeFolder(specials.trash)
    this.props.onPreview(specials.trash)
  }

  _handleFetchFolder(code) {
    this.props.onFetchFolder(code)
  }

  _handleMoveItem(target) {
    const { selected } = this.props
    const { alert, confirm } = this.context
    const codes = selected.map(item => item.code)
    // if(source.access_type === 'view') return alert.open('You do not have permission to move this file to another folder')
    if(target.access_type === 'view') return alert.open('You do not have permission to move files to this folder')
    const yes = () => this.props.onMoveItem(codes, target.item_id)
    //<strong>{source.label}</strong>
    const message = <span>Are you sure you want to move these files to the folder <strong>{target.label}</strong>?</span>
    confirm.open(message, yes)
  }

  _handleTasks(item, e) {
    e.stopPropagation()
    e.preventDefault()
    this.context.tasks.open([
      { component: <Tasks { ...this._getTasks(item) } /> }
    ])
  }

}

export default Explorer
