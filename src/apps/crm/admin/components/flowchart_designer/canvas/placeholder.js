import PropTypes from 'prop-types'
import React from 'react'
import Add from './add'

class Placeholder extends React.PureComponent {

  static propTypes = {
    answer: PropTypes.string,
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
    const { parent, answer, delta, editable, onNew } = this.props
    return {
      parent,
      answer,
      delta,
      editable,
      onNew
    }
  }

}

export default Placeholder
