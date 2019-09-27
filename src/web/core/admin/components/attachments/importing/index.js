import ModalPanel from '../../modal_panel'
import { processed } from '../selectors'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Multiple from './multiple'
import Single from './single'
import React from 'react'

class Review extends React.Component {

  static propTypes = {
    files: PropTypes.array,
    multiple: PropTypes.bool,
    processed: PropTypes.bool,
    onBack: PropTypes.func,
    onCreate: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    const { multiple } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        { multiple ? <Multiple /> : <Single /> }
      </ModalPanel>
    )
  }

  componentDidMount() {
    this.props.files.map((file, index) => {
      const { endpoint, body } = file.create
      this.props.onCreate(endpoint, body, index)
    })
  }

  componentDidUpdate(prevProps) {
    const { processed } = this.props
    if(processed !== prevProps.processed) {
      this._handleDone()
    }
  }

  _getPanel() {
    return {
      title: 'Importing Files'
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
  files: state.maha.attachments.files,
  processed: processed(state.maha.attachments, props)
})

export default connect(mapStateToProps)(Review)
