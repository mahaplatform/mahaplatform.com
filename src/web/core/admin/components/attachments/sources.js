import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Avatar from '../avatar'
import React from 'react'
import New from './new'

class Sources extends React.Component {

  static propTypes = {
    cancelText: PropTypes.any,
    doneText: PropTypes.string,
    counts: PropTypes.object,
    sources: PropTypes.array,
    onCancel: PropTypes.func,
    onDone: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleNew = this._handleNew.bind(this)

  render() {
    const { counts, sources } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-attachments-sources">
          { sources.map((source, index) => (
            <div className="maha-attachments-source" key={`source_${index}`} onClick={ this._handleChooseSource.bind(this, source)}>
              { source.photo ?
                <div className="maha-attachments-source-logo">
                  <Avatar user={{ photo: source.photo }} />
                  <div className="maha-attachments-source-network">
                    <img src={ `/admin/images/services/${source.network}.png` } />
                  </div>
                </div> :
                <div className="maha-attachments-source-logo">
                  <img src={ `/admin/images/services/${source.network}.png` } />
                </div>
              }
              <div className="maha-attachments-source-text">
                { source.username || source.network }
              </div>
              <div className="maha-attachments-source-count">
                { counts[source.source] &&
                  <div className="maha-attachments-source-count-badge">
                    { counts[source.source] }
                  </div>
                }
              </div>
              <div className="maha-attachments-source-proceed">
                <i className="fa fa-fw fa-chevron-right" />
              </div>
            </div>
          ))}
          <div className="maha-attachments-source" onClick={ this._handleNew }>
            <div className="maha-attachments-source-logo">
              <i className="fa fa-fw fa-plus-circle" />
            </div>
            <div className="maha-attachments-source-text">
              Add a new source
            </div>
            <div className="maha-attachments-source-proceed">
              <i className="fa fa-fw fa-chevron-right" />
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getNew() {
    return {
      onBack: this._handleBack
    }
  }

  _getPanel() {
    const { cancelText, doneText } = this.props
    return {
      title: 'Choose Source',
      leftItems: [
        { label: cancelText, handler: this._handleCancel }
      ],
      rightItems: [
        { label: doneText, handler: this.props.onDone }
      ]
    }
  }

  _getSource(source) {
    const { files, isReady, multiple, onAddAsset, onAddFile, onCreate, onRemoveFile } = this.props
    return {
      source,
      files,
      isReady,
      multiple,
      onAddAsset,
      onAddFile,
      onCreate,
      onRemoveFile,
      onBack: this._handleBack,
      onDone: this._handleDone
    }
  }

  _handleBack() {
    this.props.onPop()
  }

  _handleChooseSource(source) {
    this.props.onPush(source.component, this._getSource(source))
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleNew() {
    this.props.onPush(New, this._getNew())
  }

}

export default Sources
