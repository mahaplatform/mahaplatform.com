import PropTypes from 'prop-types'
import Preview from './preview'
import Header from './header'
import React from 'react'

class Designer extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    config: PropTypes.object,
    deviceIndex: PropTypes.number,
    orientationIndex: PropTypes.number,
    onChangeViewport: PropTypes.func
  }

  static defaultProps = {}

  render() {
    return (
      <div className="designer">
        <div className="designer-main">
          <Header { ...this._getHeader() } />
          <Preview { ...this._getPreview() } />
        </div>
        <div className="designer-sidebar">
        </div>
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  _getHeader() {
    const { onChangeViewport } = this.props
    return {
      onChange: onChangeViewport
    }
  }

  _getPreview() {
    const { config, deviceIndex, orientationIndex } = this.props
    return {
      config,
      deviceIndex,
      orientationIndex
    }
  }


}

export default Designer
