import PropTypes from 'prop-types'
import React from 'react'

class Answer extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    connectDropTarget: PropTypes.func,
    connectDragPreview: PropTypes.func,
    connectDragSource: PropTypes.func,
    isDragging: PropTypes.bool,
    answer: PropTypes.object,
    index: PropTypes.number,
    onChoose: PropTypes.func,
    onMove: PropTypes.func,
    onRemove: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  _handleChoose = this._handleChoose.bind(this)
  _handleRemove = this._handleRemove.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { answer } = this.props
    return (
      <div className="answer">
        <div className="answer-correct" onClick={ this._handleChoose }>
          { answer.is_correct ?
            <i className="fa fa-fw fa-check-circle" /> :
            <i className="fa fa-fw fa-circle-o" />
          }
        </div>
        <div className="answer-label">
          <input { ...this._getInput(answer) } />
        </div>
        <div className="answer-extra" onClick={ this._handleRemove }>
          <i className="fa fa-fw fa-remove" />
        </div>
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  _getInput() {
    const { answer } = this.props
    return {
      type: 'text',
      value: answer.text,
      placeholder: 'Enter an answer',
      onChange: this._handleUpdate
    }
  }

  _handleChoose() {
    const { index } = this.props
    this.props.onChoose(index)
  }

  _handleRemove() {
    const { index } = this.props
    this.props.onRemove(index)
  }

  _handleUpdate(event) {
    const { index } = this.props
    this.props.onUpdate(index, event.target.value)
  }

}

export default Answer
