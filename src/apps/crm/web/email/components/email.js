import PropTypes from 'prop-types'
import Section from './section'
import React from 'react'

class Email extends React.Component {

  static propTypes = {
    active: PropTypes.object,
    config: PropTypes.object,
    editable: PropTypes.bool,
    children: PropTypes.any,
    onAction: PropTypes.func
  }

  state = {
    moving: {
      isMoving: false,
      target: null,
      position: null
    }
  }

  _handleHover = this._handleHover.bind(this)
  _handleMove = this._handleMove.bind(this)
  _handleReordering = this._handleReordering.bind(this)

  render() {
    return (
      <table className="body" id="body">
        <tbody>
          <tr>
            <td className="float-center" align="center" valign="top">
              <center>
                <table className="container">
                  <tbody>
                    <tr>
                      <td>
                        <Section { ...this._getSection('header') } />
                        <Section { ...this._getSection('body') } />
                        <Section { ...this._getSection('footer') } />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </center>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

  _getSection(section) {
    const { active, config, editable, onAction } = this.props
    const { moving } = this.state
    return {
      active,
      section,
      config,
      editable,
      moving,
      onAction,
      onHover: this._handleHover,
      onMove: this._handleMove,
      onReordering: this._handleReordering
    }
  }

  _handleHover(from, to, position) {
    this.setState({
      moving: {
        isMoving: true,
        target: { from, to },
        position
      }
    })
  }

  _handleMove(from, to) {
    this.props.onAction('move', { from, to })
  }

  _handleReordering(isMoving) {
    this.setState({
      moving: {
        isMoving,
        target: null,
        position: null
      }
    })
  }

}

export default Email
