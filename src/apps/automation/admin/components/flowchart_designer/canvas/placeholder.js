import PropTypes from 'prop-types'
import React from 'react'
import Add from './add'

class Placeholder extends React.PureComponent {

  static propTypes = {
    answer: PropTypes.string,
    blocks: PropTypes.array,
    delta: PropTypes.number,
    editable: PropTypes.bool,
    hovering: PropTypes.object,
    parent: PropTypes.string,
    onAdd: PropTypes.func,
    onHover: PropTypes.func,
    onNew: PropTypes.func
  }

  render() {
    return (
      <div className="flowchart-placeholder">
        <Add { ...this._getAdd() } />
      </div>
    )
  }

  _getAdd() {
    const { answer, blocks, delta, editable, parent, onAdd, onNew } = this.props
    return {
      answer,
      blocks,
      delta,
      editable,
      parent,
      onAdd,
      onNew
    }
  }

}

export default Placeholder
