import ModalPanel from '../../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

class Device extends React.Component {

  static contextTypes = {
    uploader: PropTypes.object
  }

  static propTypes = {
    multiple: PropTypes.bool,
    files: PropTypes.array,
    onBack: PropTypes.func,
    onNext: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleBrowse = this._handleBrowse.bind(this)
  _handleNext = this._handleNext.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-attachments-device">
          <div className="maha-attachments-device-body">
            <div className="maha-attachments-device-drop">
              <div className="maha-attachments-device-text">
                <p>Drop Files Here</p>
                <span>or</span>
                <div className="ui red button" onClick={ this._handleBrowse }>
                  Choose file(s)
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    const { files, multiple } = this.props
    return {
      title: 'Choose File(s)',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      rightItems: multiple && files.length > 0 ? [
        { label: 'Next', handler: this._handleNext }
      ] : []
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleBrowse() {
    this.context.uploader.browse()
  }

  _handleNext() {
    this.props.onNext()
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files
})

export default connect(mapStateToProps)(Device)
