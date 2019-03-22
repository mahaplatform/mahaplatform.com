import { Button, ModalPanel, Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Folder from './folder'
import React from 'react'

class Move extends React.Component {

  static contextTypes = {
    flash: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    item: PropTypes.object,
    folders: PropTypes.array,
    folder: PropTypes.object,
    status: PropTypes.string,
    onChangeFolder: PropTypes.func,
    onMove: PropTypes.func,
    onUp: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getModalPanel() }>
        <div className="drive-move">
          <div className="drive-move-body">
            <Stack { ...this._getStack() } />
          </div>
          <div className="drive-move-footer">
            <Button { ...this._getButton() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidUpdate(prevProps) {
    const { modal } = this.context
    const { status } = this.props
    if(status !== prevProps.status && status === 'success') {
      modal.close()
    }
  }

  _getModalPanel() {
    return {
      title: 'Choose Destination',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ]
    }
  }

  _getButton() {
    return {
      label: 'Move Here',
      color: 'red',
      handler: this._handleDone
    }
  }

  _getStack() {
    const { folders } = this.props
    const root = {
      id: null,
      item_id: null,
      label: 'My Drive'
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

  _getFolder(folder) {
    const { onChangeFolder, onUp } = this.props
    return {
      folder,
      onChangeFolder,
      onUp
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleDone() {
    const { item, folder, onMove } = this.props
    const folder_id = folder ? folder.item_id : null
    onMove(item.code, folder_id)
  }

}

export default Move
