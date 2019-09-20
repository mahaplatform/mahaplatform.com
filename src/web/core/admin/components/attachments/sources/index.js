import ModalPanel from '../../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import New from './new'

class Sources extends React.Component {

  static propTypes = {
    cancelText: PropTypes.any,
    counts: PropTypes.object,
    extensions: PropTypes.array,
    files: PropTypes.array,
    multiple: PropTypes.bool,
    sources: PropTypes.array,
    types: PropTypes.array,
    onAdd: PropTypes.func,
    onCreate: PropTypes.func,
    onBack: PropTypes.func,
    onCancel: PropTypes.func,
    onNext: PropTypes.func,
    onPush: PropTypes.func,
    onRemove: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleNew = this._handleNew.bind(this)
  _handleNext = this._handleNext.bind(this)

  render() {
    const { counts, sources } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-attachments-sources">
          { sources.map((source, index) => (
            <div className="maha-attachments-source" key={`source_${index}`} onClick={ this._handleChooseSource.bind(this, source)}>
              <div className="maha-attachments-source-logo">
                <div className={`maha-attachments-source-favicon ${source.service}`}>
                  <img src={ `/admin/images/services/${source.service}.png` } />
                </div>
              </div>
              <div className="maha-attachments-source-text">
                { source.username || source.service }
              </div>
              { counts[source.service] &&
                <div className="maha-attachments-source-count">
                  <div className="maha-attachments-source-count-badge">
                    { counts[source.service] }
                  </div>
                </div>
              }
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
    const { types } = this.props
    return {
      types,
      onBack: this._handleBack
    }
  }

  _getPanel() {
    const { cancelText, files } = this.props
    return {
      title: 'Choose Source',
      leftItems: [
        { label: cancelText, handler: this._handleCancel }
      ],
      rightItems: files.length > 0 ? [
        { label: 'Next', handler: this._handleNext }
      ] : []
    }
  }

  _getSource(source) {
    const { extensions, multiple, onAdd, onCreate, onRemove } = this.props
    return {
      extensions,
      multiple,
      source,
      onAdd,
      onCreate,
      onRemove,
      onBack: this._handleBack,
      onNext: this._handleNext
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChooseSource(source) {
    this.props.onPush(source.component, this._getSource(source))
  }

  _handleNew() {
    this.props.onPush(New, this._getNew())
  }

  _handleNext() {
    this.props.onNext()
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files
})

export default connect(mapStateToProps)(Sources)
