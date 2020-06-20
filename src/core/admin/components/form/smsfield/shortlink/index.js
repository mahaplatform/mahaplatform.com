import PropTypes from 'prop-types'
import Shorten from './shorten'
import React from 'react'

class ShortLink extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    onDone: PropTypes.func
  }

  text = null

  _handleDone = this._handleDone.bind(this)
  _handleSelection = this._handleSelection.bind(this)
  _handleShorten = this._handleShorten.bind(this)

  render() {
    return (
      <div className="maha-shortlink" onMouseDown={ this._handleSelection } onClick={ this._handleShorten }>
        <i className="fa fa-link" />
      </div>
    )
  }

  _getShorten() {
    return {
      url: this.text,
      onDone: this._handleDone
    }
  }

  _handleDone(shortlink) {
    this.props.onDone(shortlink)
  }

  _handleSelection() {
    const selection = window.getSelection()
    const text = selection.toString()
    this.text = text.length > 0 ? text : null
  }

  _handleShorten() {
    this.context.modal.open(<Shorten { ...this._getShorten() } />, {
      width: 500,
      height: 140
    })
  }

}

export default ShortLink
