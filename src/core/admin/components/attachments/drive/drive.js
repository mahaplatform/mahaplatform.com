import ModalPanel from '../../modal_panel'
import Searchbox from '../../searchbox'
import { connect } from 'react-redux'
import Infinite from '../../infinite'
import Message from '../../message'
import PropTypes from 'prop-types'
import Stack from '../../stack'
import Folder from './folder'
import List from './list'
import Grid from './grid'
import React from 'react'
import _ from 'lodash'

class Drive extends React.Component {

  static propTypes = {
    allow: PropTypes.object,
    files: PropTypes.array,
    folders: PropTypes.array,
    multiple: PropTypes.bool,
    q: PropTypes.string,
    view: PropTypes.string,
    onAdd: PropTypes.func,
    onBack: PropTypes.func,
    onChangeFolder: PropTypes.func,
    onCreate: PropTypes.func,
    onDone: PropTypes.func,
    onNext: PropTypes.func,
    onRemove: PropTypes.func,
    onSetQuery: PropTypes.func,
    onToggleView: PropTypes.func,
    onUp: PropTypes.func
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleBack = this._handleBack.bind(this)
  _handleNext = this._handleNext.bind(this)
  _handleRemove = this._handleRemove.bind(this)
  _handleToggleView = this._handleToggleView.bind(this)

  render() {
    const { q } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-attachments-drive">
          <div className="maha-attachments-drive-head">
            <div className="maha-attachments-drive-head-bar">
              <div className="maha-attachments-drive-search">
                <Searchbox { ...this._getSearchbox() } />
              </div>
              <div className="maha-attachments-drive-view" onClick={ this._handleToggleView }>
                <i className={`fa fa-${ this._getView() }`} />
              </div>
            </div>
          </div>
          { q.length === 0 && <Stack { ...this._getStack() } /> }
          { q.length > 0 && <Infinite { ...this._getInfinite() } /> }
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    const { files, multiple } = this.props
    return {
      title: 'Choose File(s)',
      leftItems: [
        { icon: 'chevron-left', handler: this.props.onBack  }
      ],
      rightItems: multiple && files.length > 0 ? [
        { label: 'Next', handler: this._handleNext }
      ] : []
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
    const { allow, q, view, onChangeFolder } = this.props
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
      layout: view === 'list' ? List : Grid,
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

  _getView() {
    const { view } = this.props
    return view === 'list' ? 'list' : 'th'
  }

  _handleAdd(asset) {
    const { onAdd } = this.props
    onAdd({
      id: asset.id,
      source_id: 'maha',
      name: asset.original_file_name,
      service: 'maha',
      content_type: asset.content_type,
      asset,
      thumbnail: asset.content_type.match(/(jpeg|jpg|gif|png)/) ? asset.signed_url : null,
      status: 'imported'
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

  _handleToggleView() {
    this.props.onToggleView()
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files,
  view: state.maha.attachments.view
})

export default connect(mapStateToProps)(Drive)
