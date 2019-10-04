import PropTypes from 'prop-types'
import Header from './header'
import React from 'react'
import Body from './body'

class Designer extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    canvas: PropTypes.any,
    deviceIndex: PropTypes.number,
    orientationIndex: PropTypes.number,
    scaleIndex: PropTypes.number,
    sidebar: PropTypes.any,
    onChangeViewport: PropTypes.func
  }

  static defaultProps = {
    canvas: <div />,
    sidebar: <div />
  }

  render() {
    const { sidebar } = this.props
    return (
      <div className="designer">
        <div className="designer-main">
          <Header { ...this._getHeader() } />
          <Body { ...this._getBody() } />
        </div>
        <div className="designer-sidebar">
          { sidebar }
        </div>
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  _getHeader() {
    const { deviceIndex, orientationIndex, scaleIndex, onChangeViewport } = this.props
    return {
      deviceIndex,
      orientationIndex,
      scaleIndex,
      onChange: onChangeViewport
    }
  }

  _getBody() {
    const { canvas, deviceIndex, orientationIndex, scaleIndex } = this.props
    return {
      canvas,
      deviceIndex,
      orientationIndex,
      scaleIndex
    }
  }

}

export default Designer
