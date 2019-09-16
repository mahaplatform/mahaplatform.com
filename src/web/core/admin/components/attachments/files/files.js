import ModalPanel from '../../modal_panel'
import Message from '../../message'
import Infinite from '../../infinite'
import Searchbox from '../../searchbox'
import Stack from '../../stack/stack'
import PropTypes from 'prop-types'
import Folder from './folder'
import Items from './items'
import React from 'react'

class Files extends React.Component {

  static propTypes = {
    files: PropTypes.array,
    folders: PropTypes.array,
    service: PropTypes.string,
    q: PropTypes.string,
    source: PropTypes.object,
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

  render() {
    const { q } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-attachments-drive">
          <div className="maha-attachments-drive-search">
            <Searchbox { ...this._getSearchbox() } />
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

  _getSearchbox() {
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
      name: 'Home'
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
    const { files, service, q, source, onCreate, onRemoveFile } = this.props
    const empty = {
      icon: 'times-circle',
      title: 'No Results',
      text: 'There are no files that matched your query'
    }
    const filter = q.length > 0 ? { q } : null
    return {
      endpoint: `/api/admin/profiles/${source.id}/files`,
      filter,
      empty: <Message { ...empty } />,
      notFound: <Message { ...empty } />,
      layout: Items,
      props: {
        files,
        service,
        onCreate,
        onRemoveFile
      }
    }
  }

  _getFolder(folder) {
    const { files, source, onUp, onChangeFolder, onCreate, onRemoveFile } = this.props
    return {
      files,
      source,
      folder,
      onCreate,
      onChangeFolder,
      onRemoveFile,
      onUp
    }
  }
}

export default Files
