import Infinite from '../../infinite'
import Message from '../../message'
import ModalPanel from '../../modal_panel'
import Searchbox from '../../searchbox'
import Stack from '../../stack/stack'
import PropTypes from 'prop-types'
import Folder from './folder'
import Items from './items'
import React from 'react'

class Drive extends React.Component {

  static propTypes = {
    files: PropTypes.array,
    folders: PropTypes.array,
    q: PropTypes.string,
    onAddAsset: PropTypes.func,
    onAddFile: PropTypes.func,
    onBack: PropTypes.func,
    onChangeFolder: PropTypes.func,
    onCreate: PropTypes.func,
    onDone: PropTypes.func,
    onRemoveFile: PropTypes.func,
    onSetQuery: PropTypes.func,
    onUp: PropTypes.func
  }

  _handleAddAsset = this._handleAddAsset.bind(this)
  _handleRemoveAsset = this._handleRemoveAsset.bind(this)

  render() {
    const { q } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-attachments-drive">
          <div className="maha-attachments-drive-search">
            <Searchbox { ...this._getSearchBox() } />
          </div>
          { q.length === 0 && <Stack { ...this._getStack() } /> }
          { q.length > 0 && <Infinite { ...this._getInfinite() } /> }
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Choose File(s)',
      leftItems: [
        { icon: 'chevron-left', handler: this.props.onBack  }
      ],
      rightItems: [
        { label: 'Done', handler: this.props.onDone }
      ]
    }
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
    const root = {
      id: null,
      item_id: null,
      label: 'Drive'
    }
    return {
      cards: [
        { component: Folder, props: this._getFolder(root) },
        ...folders.map((folder, index) => (
          { component: Folder, props: this._getFolder(folder) }
        ))
      ]
    }
  }

  _getInfinite() {
    const { files,  q, onChangeFolder } = this.props
    const empty = {
      icon: 'times-circle',
      title: 'No Results',
      text: 'There are no files that matched your query'
    }
    return {
      endpoint: '/api/admin/drive/items',
      filter: { q, type: { $eq: 'file' } },
      empty: <Message { ...empty } />,
      notFound: <Message { ...empty } />,
      layout: Items,
      props: {
        files,
        onAddFile: this._handleAddAsset,
        onAddAsset: this._handleAddAsset,
        onRemoveAsset: this._handleRemoveAsset,
        onChangeFolder
      }
    }
  }

  _getFolder(folder) {
    const { files, onUp, onChangeFolder } = this.props
    return {
      files,
      folder,
      onAddAsset: this._handleAddAsset,
      onChangeFolder,
      onRemoveAsset: this._handleRemoveAsset,
      onUp
    }
  }

  _handleAddAsset(asset) {
    const { onAddFile } = this.props
    onAddFile({
      id: asset.id,
      name: asset.original_file_name,
      network: 'maha',
      content_type: asset.content_type,
      asset,
      thumbnail: asset.content_type.match(/image/) ? asset.signed_url : null
    })
  }

  _handleRemoveAsset(asset) {
    const { onRemoveFile } = this.props
    onRemoveFile({
      id: asset.id,
      network: 'maha'
    })
  }

}

export default Drive
