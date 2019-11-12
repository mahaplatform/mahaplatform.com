import PropTypes from 'prop-types'
import React from 'react'

class TextField extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string
  }

  render() {
    const { name, placeholder } = this.props
    return <input type="text" name={ name } placeholder={ placeholder } />
  }

}

export default TextField
