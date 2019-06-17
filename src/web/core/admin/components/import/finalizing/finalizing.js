import PropTypes from 'prop-types'
import React from 'react'

class Finalizing extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.string,
    destination: PropTypes.func,
    finalizeComponent: PropTypes.any,
    import: PropTypes.object,
    status: PropTypes.string,
    onBack: PropTypes.func,
    onDone: PropTypes.func,
    onInit: PropTypes.func
  }

  _handleDone = this._handleDone.bind(this)

  render() {
    const FinalizeComponent = this.props.finalizeComponent
    return (
      <FinalizeComponent { ...this._getFinalizeComponent() }/>
    )
  }

  componentDidMount() {
    const { defaultValue, onInit } = this.props
    onInit( defaultValue )
  }

  componentDidUpdate(prevProps) {

  }

  _getFinalizeComponent() {
    const { status } = this.props
    return {
      import: this.props.import,
      status,
      onDone: this._handleDone
    }
  }

  _handleDone() {
    const { onDone } = this.props
    this.props.import.stage = 'complete'
    onDone(this.props.import)
  }

}

export default Finalizing
