import PropTypes from 'prop-types'
import Trunk from './trunk'
import React from 'react'

class Canvas extends React.PureComponent {

  static propTypes = {
    blocks: PropTypes.array,
    config: PropTypes.array
  }

  render() {
    const { blocks, config } = this.props
    return (
      <div className="flowchart-canvas">
        <div className="flowchart">
          <Trunk boxes={ config } blocks={ blocks } />
        </div>
      </div>
    )
  }

  _getBox(box) {
    const { blocks } = this.props
    return {
      ...box,
      blocks
    }
  }

}

export default Canvas
