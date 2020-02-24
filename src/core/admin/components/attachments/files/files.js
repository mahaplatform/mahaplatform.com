import ModalPanel from '../../modal_panel'
import Searchbox from '../../searchbox'
import Infinite from '../../infinite'
import { connect } from 'react-redux'
import Message from '../../message'
import PropTypes from 'prop-types'
import Stack from '../../stack'
import Folder from './folder'
import Grid from './grid'
import List from './list'
import React from 'react'

class Files extends React.Component {

  static propTypes = {
    allow: PropTypes.object,
    files: PropTypes.array,
    folders: PropTypes.array,
    q: PropTypes.string,
    source: PropTypes.object,
    view: PropTypes.string,
    onBack: PropTypes.func,
    onChangeFolder: PropTypes.func,
    onAdd: PropTypes.func,
    onNext: PropTypes.func,
    onRemove: PropTypes.func,
    onProcessing: PropTypes.func,
    onSetQuery: PropTypes.func,
    onToggleView: PropTypes.func,
    onUp: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleNext = this._handleNext.bind(this)
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
    const { files } = this.props
    return {
      title: 'Choose File(s)',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      rightItems: files.length > 0 ? [
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
    const { folders, source } = this.props
    const root = {
      id: null,
      name: source.username
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
    const { allow, q, source, view, onAdd, onRemove } = this.props
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
      layout: view === 'list' ? List : Grid,
      props: {
        allow,
        source,
        onAdd,
        onRemove
      }
    }
  }

  _getFolder(folder) {
    const { allow, source, onUp, onChangeFolder, onAdd, onRemove } = this.props
    return {
      allow,
      source,
      folder,
      onAdd,
      onChangeFolder,
      onRemove,
      onUp
    }
  }

  _getView() {
    const { view } = this.props
    return view === 'list' ? 'list' : 'th'
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleNext() {
    this.props.onNext()
  }

  _handleToggleView() {
    this.props.onToggleView()
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files,
  view: state.maha.attachments.view
})

export default connect(mapStateToProps)(Files)
