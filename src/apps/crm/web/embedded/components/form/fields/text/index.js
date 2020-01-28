import PropTypes from 'prop-types'
import React from 'react'

class Text extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    status: PropTypes.string,
    text: PropTypes.string,
    onReady: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  render() {
    const { text } = this.props
    return <div className="field" dangerouslySetInnerHTML={{ __html: text }} />
  }

  componentDidMount() {
    this.props.onReady()
  }

}

export default Text
