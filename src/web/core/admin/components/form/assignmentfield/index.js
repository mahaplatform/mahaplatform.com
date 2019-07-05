import PropTypes from 'prop-types'
import React from 'react'

class AssignmentField extends React.Component {

  static contextTypes = {
  }

  static propTypes = {
    onReady: PropTypes.func
  }

  static defaultProps = {
  }

  render() {
    return (
      <div>foo</div>
    )
  }

  componentDidMount() {
    this.props.onReady()
  }


}

export default AssignmentField
