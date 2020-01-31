import PropTypes from 'prop-types'
import React from 'react'

class Methods extends React.Component {

  static propTypes = {
    methods: PropTypes.array,
    program: PropTypes.object,
    summary: PropTypes.object,
    token: PropTypes.string,
    selected: PropTypes.number,
    onChoose: PropTypes.func,
    onSuccess: PropTypes.func
  }

  state = {
    selected: 'card'
  }

  render() {
    const { selected } = this.state
    return null
  }

}

export default Methods
