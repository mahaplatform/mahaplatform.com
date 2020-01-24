import PropTypes from 'prop-types'
import React from 'react'

class Text extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    status: PropTypes.string,
    text: PropTypes.string,
    onFinalize: PropTypes.func,
    onReady: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
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

  componentDidUpdate(prevProps, prevState) {
    const { status, onFinalize, onValidate } = this.props
    if(status !== prevProps.status) {
      if(status === 'validating') onValidate('valid')
      if(status === 'finalizing') onFinalize(null)
    }
  }

}

export default Text
