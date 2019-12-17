import PropTypes from 'prop-types'
import React from 'react'

class Text extends React.Component {

  static propTypes = {
    style: PropTypes.string,
    text: PropTypes.string,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onReady: () => {}
  }

  render() {
    const { text } = this.props
    return <div className={ this._getClass() }dangerouslySetInnerHTML={{ __html: text }} />
  }

  componentDidMount() {
    this.props.onReady()
  }

  _getClass() {
    const { style } = this.props
    const classes = ['maha-text']
    if(style) classes.push(style)
    return classes.join(' ')
  }

}

export default Text
