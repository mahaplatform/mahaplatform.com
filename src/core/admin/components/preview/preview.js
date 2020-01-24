import PropTypes from 'prop-types'
import Header from './header'
import React from 'react'
import Body from './body'

class Preview extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    children: PropTypes.any,
    deviceIndex: PropTypes.number,
    orientationIndex: PropTypes.number,
    scaleIndex: PropTypes.number,
    onChangeViewport: PropTypes.func
  }

  static defaultProps = {
    canvas: <div />
  }

  render() {
    const { children } = this.props
    return (
      <div className="preview">
        <Header { ...this._getHeader() } />
        <Body { ...this._getBody() }>
          { children }
        </Body>
      </div>
    )
  }

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
    const { deviceIndex, orientationIndex, scaleIndex } = this.props
    return {
      deviceIndex,
      orientationIndex,
      scaleIndex
    }
  }

}

export default Preview
