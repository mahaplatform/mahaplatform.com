import PropTypes from 'prop-types'
import React from 'react'
import Box from './box'

class Trunk extends React.PureComponent {

  static propTypes = {
    boxes: PropTypes.array,
    blocks: PropTypes.array
  }

  render() {
    const { boxes } = this.props
    return (
      <div className="flowchart-trunk">
        { boxes.map((box, index) => [
          ...!(boxes[0].type === 'trigger' && index === 0) && false ? [
            <div className="flowchart-box-padding" key="dropzone">
              <div className="flowchart-dropzone">
                dropzone
              </div>
            </div>,
            <div className="flowchart-connector" key={`box_connector2_${index}`}>
              <div className="flowchart-line" />
            </div>
          ] : [],
          <Box { ...this._getBox(box) } key={`box_${index}`} />,
          ...(index < boxes.length - 1) ? [
            <div className="flowchart-connector" key={`box_connector_${index}`}>
              <div className="flowchart-line" />
            </div>
          ] : []
        ])}
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

export default Trunk
