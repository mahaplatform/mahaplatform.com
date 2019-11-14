import PropTypes from 'prop-types'
import React from 'react'

class Text extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    text: PropTypes.string,
    onReady: PropTypes.func
  }

  render() {
    const { text } = this.props
    return (
      <div className="field" dangerouslySetInnerHTML={{ __html: text }} />
    )
  }

  componentDidMount() {
    const { onReady } = this.props
    onReady()
  }

}

export default Text
