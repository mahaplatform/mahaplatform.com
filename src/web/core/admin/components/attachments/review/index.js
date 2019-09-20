import ModalPanel from '../../modal_panel'
import { processed } from '../selectors'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Multiple from './multiple'
import Single from './single'
import React from 'react'

class Review extends React.Component {

  static propTypes = {
    multiple: PropTypes.bool,
    doneText: PropTypes.string,
    processed: PropTypes.bool,
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

  componentDidUpdate(prevProps) {
    const { processed } = this.props
    if(processed !== prevProps.processed) {
      this._handleDone()
    }
  }

  _getPanel() {
    return {
      title: 'Review Selections',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
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
  processed: processed(state.maha.attachments, props)
})

export default connect(mapStateToProps)(Review)
