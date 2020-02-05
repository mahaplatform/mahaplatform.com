import { DropTarget } from 'react-dnd'
import PropTypes from 'prop-types'
import Target from './target'
import React from 'react'

class Placeholder extends React.PureComponent {

  static propTypes = {
    answer: PropTypes.string,
    connectDropTarget: PropTypes.func,
    delta: PropTypes.number,
    hovering: PropTypes.object,
    parent: PropTypes.string,
    onAdd: PropTypes.func,
    onHover: PropTypes.func
  }

  render() {
    const { answer, connectDropTarget, delta, hovering, parent } = this.props
    return connectDropTarget(
      <div className="flowchart-placeholder">
        { hovering && parent === hovering.parent  && answer === hovering.answer && hovering.delta === delta &&
          <Target />
        }
      </div>
    )
  }

}

const target = {
  hover(props, monitor, component) {
    if(monitor.isOver()) return
    const { answer, delta, parent } = props
    props.onHover({ answer, delta, parent })
  },
  drop(props, monitor, component) {
    if(monitor.didDrop()) return
    const block = monitor.getItem()
    const { answer, delta, parent } = props
    const { type, action } = block
    props.onAdd(type, action, parent, answer, delta)
  }
}

const targetCollector = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
})

Placeholder = DropTarget('ITEM', target, targetCollector)(Placeholder)

export default Placeholder
