import ModalPanel from '../../modal_panel'
import Searchbox from '../../searchbox'
import Infinite from '../../infinite'
import { connect } from 'react-redux'
import Stack from '../../stack'
import Message from '../../message'
import PropTypes from 'prop-types'
import Folder from './folder'
import Items from './items'
import React from 'react'

class Files extends React.Component {

  static propTypes = {
    allow: PropTypes.object,
    doneText: PropTypes.any,
    files: PropTypes.array,
    folders: PropTypes.array,
    q: PropTypes.string,
    source: PropTypes.object,
    onBack: PropTypes.func,
    onChangeFolder: PropTypes.func,
    onCreate: PropTypes.func,
    onNext: PropTypes.func,
    onRemove: PropTypes.func,
    onProcessing: PropTypes.func,
    onSetQuery: PropTypes.func,
    onUp: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleNext = this._handleNext.bind(this)

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
    const { doneText, files } = this.props
    return {
      title: 'Choose File(s)',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      rightItems: files.length > 0 ? [
        { label: doneText, handler: this._handleNext }
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
    const { allow, q, source, onCreate, onRemove } = this.props
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
        allow,
        source,
        onCreate,
        onRemove
      }
    }
  }

  _getFolder(folder) {
    const { allow, source, onUp, onChangeFolder, onCreate, onRemove } = this.props
    return {
      allow,
      source,
      folder,
      onCreate,
      onChangeFolder,
      onRemove,
      onUp
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleNext() {
    this.props.onNext()
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files
})

export default connect(mapStateToProps)(Files)
