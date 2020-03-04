import PropTypes from 'prop-types'
import React from 'react'

class Add extends React.Component {

  static propTypes = {
    answer: PropTypes.string,
    delta: PropTypes.number,
    parent: PropTypes.string,
    onNew: PropTypes.func
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    return (
      <div className="flowchart-box-add" onClick={ this._handleClick }>
        <i className="fa fa-plus" />
      </div>
    )
  }

  _handleClick() {
    const { answer, delta, parent } = this.props
    this.props.onNew(answer, delta, parent)
  }

}

export default Add
