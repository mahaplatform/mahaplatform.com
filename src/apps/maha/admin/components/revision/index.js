import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import Changes from './changes'
import React from 'react'

class Revision extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any
  }

  state = {
    revision: null,
    reload: false
  }

  _handleReload = this._handleReload.bind(this)
  _handleRevision = this._handleRevision.bind(this)

  render() {
    const { reload } = this.state
    return (
      <div className="maha-revision">
        { reload &&
          <div className="maha-revision-status">
            An updated version of Maha is available! See <Button { ...this._getWhatsNew() } /> or <Button { ...this._getReload() } />
          </div>
        }
        <div className="maha-revision-body">
          { this.props.children }
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.context.network.addEventListener('revision', this._handleRevision)
  }

  componentWillUnmount() {
    this.context.network.removeEventListener('revision', this._handleRevision)
  }

  _getChanges() {
    return {
      onReload: this._handleReload
    }
  }

  _getWhatsNew() {
    return {
      label: 'what\'s new',
      className: 'link',
      modal: <Changes { ...this._getChanges() } />
    }
  }

  _getReload() {
    return {
      label: 'reload application',
      className: 'link',
      handler: this._handleReload
    }
  }

  _handleReload() {
    window.location.reload()
  }

  _handleRevision(newrevision) {
    const { revision } = this.state
    this.setState({
      revision: newrevision,
      reload: newrevision !== revision && revision !== null
    })
  }

}

export default Revision
