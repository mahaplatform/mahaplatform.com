import PropTypes from 'prop-types'
import React from 'react'
import Content from './content'

class Sidebar extends React.PureComponent {

  static propTypes = {
    blocks: PropTypes.array
  }

  render() {
    return <Content { ...this._getContent() } />
  }

  _getContent() {
    const { blocks } = this.props
    return {
      blocks
    }
  }


}

export default Sidebar
