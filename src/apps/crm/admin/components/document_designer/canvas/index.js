import PropTypes from 'prop-types'
import React from 'react'

class Canvas extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    return <iframe { ...this._getIframe() } />
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  _getIframe() {
    return {
      ref: node => this.preview = node,
      src: '/templates/document.html'
    }
  }

}

export default Canvas
