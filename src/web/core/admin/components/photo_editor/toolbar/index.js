import Button from '../../button'
import PropTypes from 'prop-types'
import React from 'react'

class Toolbar extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  static defaultProps = {}

  render() {
    return (
      <div className="maha-photoeditor-toolbar">
        <Button { ...this._getRotate() } />
        <Button { ...this._getFlip() } />
        <Button { ...this._getUndo() } />
      </div>
    )
  }

  _getRotate() {
    return {
      label: 'Rotate 90',
      handler: () => this.props.onPush({ rot: 90 })
    }
  }

  _getFlip() {
    return {
      label: 'Flip',
      handler: () => this.props.onPush({ flip: 'h' })
    }
  }
  _getUndo() {
    return {
      label: 'Undo',
      handler: () => this.props.onPop()
    }
  }

}

export default Toolbar
