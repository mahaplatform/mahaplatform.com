import ModalPanel from '../../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Multiple from './multiple'
import Single from './single'
import React from 'react'

class Review extends React.Component {

  static propTypes = {
    multiple: PropTypes.bool,
    doneText: PropTypes.string,
    files: PropTypes.array,
    onBack: PropTypes.func,
    onDone: PropTypes.func,
    onRemove: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    const { multiple } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        { multiple ?
          <Multiple { ...this._getReview() } /> :
          <Single { ...this._getReview() } />
        }
      </ModalPanel>
    )
  }

  _getPanel() {
    const { doneText ,files } = this.props
    const processed = files.find((file) => {
      return file.asset === undefined
    }) === undefined
    return {
      title: 'Review Selections',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      rightItems: processed ? [
        { label: doneText, handler: this._handleDone }
      ] : []
    }
  }

  _getReview() {
    const { onRemove } = this.props
    return {
      onRemove
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleDone() {
    this.props.onDone()
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files
})

export default connect(mapStateToProps)(Review)
