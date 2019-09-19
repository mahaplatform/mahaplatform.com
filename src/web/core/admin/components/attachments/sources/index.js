import { CSSTransition } from 'react-transition-group'
import ModalPanel from '../../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Review from './review'
import React from 'react'
import New from './new'

class Sources extends React.Component {

  static propTypes = {
    cancelText: PropTypes.any,
    counts: PropTypes.object,
    files: PropTypes.array,
    multiple: PropTypes.bool,
    sources: PropTypes.array,
    onAdd: PropTypes.func,
    onCreate: PropTypes.func,
    onBack: PropTypes.func,
    onCancel: PropTypes.func,
    onNext: PropTypes.func,
    onPush: PropTypes.func,
    onRemove: PropTypes.func
  }

  state = {
    review: false
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleBack = this._handleBack.bind(this)
  _handleNew = this._handleNew.bind(this)
  _handleNext = this._handleNext.bind(this)
  _handleToggleReview = this._handleToggleReview.bind(this)

  render() {
    const { counts, files, sources } = this.props
    const { review } = this.state
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
        <CSSTransition in={ files.length > 0 } classNames="slideup" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="maha-attachments-sources-footer" onClick={ this._handleToggleReview }>
            { files.length } files selected
          </div>
        </CSSTransition>
        <CSSTransition in={ review } classNames="slideup" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <Review { ...this._getReview() } />
        </CSSTransition>
      </ModalPanel>
    )
  }

  _getNew() {
    return {
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

  _getReview() {
    const { onRemove } = this.props
    return {
      onClose: this._handleToggleReview,
      onRemove
    }
  }

  _getSource(source) {
    const { multiple, onAdd, onCreate, onRemove } = this.props
    return {
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

  _handleToggleReview() {
    const { review } = this.state
    this.setState({
      review: !review
    })
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files
})

export default connect(mapStateToProps)(Sources)
