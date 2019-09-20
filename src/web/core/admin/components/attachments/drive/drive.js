import ModalPanel from '../../modal_panel'
import Searchbox from '../../searchbox'
import { connect } from 'react-redux'
import Stack from '../../stack/stack'
import Infinite from '../../infinite'
import Message from '../../message'
import PropTypes from 'prop-types'
import Folder from './folder'
import Items from './items'
import React from 'react'
import _ from 'lodash'

class Drive extends React.Component {

  static propTypes = {
    allow: PropTypes.object,
    files: PropTypes.array,
    folders: PropTypes.array,
    q: PropTypes.string,
    onAdd: PropTypes.func,
    onBack: PropTypes.func,
    onChangeFolder: PropTypes.func,
    onCreate: PropTypes.func,
    onDone: PropTypes.func,
    onNext: PropTypes.func,
    onRemove: PropTypes.func,
    onSetQuery: PropTypes.func,
    onUp: PropTypes.func
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleBack = this._handleBack.bind(this)
  _handleNext = this._handleNext.bind(this)
  _handleRemove = this._handleRemove.bind(this)

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
    const { files } = this.props
    return {
      title: 'Choose File(s)',
      leftItems: [
        { icon: 'chevron-left', handler: this.props.onBack  }
      ],
      rightItems: files.length > 0 ? [
        { label: 'Next', handler: this._handleNext }
      ] : []
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
      label: 'Maha Drive'
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
    const { allow, q, onChangeFolder } = this.props
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
        allow,
        onAdd: this._handleAdd,
        onChangeFolder,
        onRemove: this._handleRemove
      }
    }
  }

  _getFolder(folder) {
    const { allow, onUp, onChangeFolder } = this.props
    return {
      allow,
      folder,
      onAdd: this._handleAdd,
      onChangeFolder,
      onRemove: this._handleRemove,
      onUp
    }
  }

  _handleAdd(asset) {
    const { onAdd } = this.props
    onAdd({
      id: asset.id,
      name: asset.original_file_name,
      service: 'maha',
      content_type: asset.content_type,
      asset,
      thumbnail: asset.content_type.match(/image/) ? asset.signed_url : null
    })
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleNext() {
    this.props.onNext()
  }

  _handleRemove(asset) {
    const { files, onRemove } = this.props
    const index = _.findIndex(files, { id: asset.id, service: 'maha' })
    onRemove(index)
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files
})

export default connect(mapStateToProps)(Drive)
