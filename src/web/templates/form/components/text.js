import PropTypes from 'prop-types'
import React from 'react'

class Text extends React.Component {

  static propTypes = {
    text: PropTypes.string
  }

  render() {
    const { text } = this.props
    return (
      <div className="field" dangerouslySetInnerHTML={{ __html: text }} />
    )
  }

}

export default Text
