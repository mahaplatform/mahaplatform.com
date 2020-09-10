import { connect } from 'react-redux'
import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import Changes from './changes'
import React from 'react'

class Revision extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    revision: PropTypes.string
  }

  state = {
    reload: false
  }

  _handleReload = this._handleReload.bind(this)

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

  componentDidUpdate(prevProps) {
    const { revision } = this.props
    console.log('revision', revision, prevProps.revision)
    if(revision !== prevProps.revision && prevProps.revision !== null) {
      this.setState({
        reload: true
      })
    }
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

}

const mapStateToProps = (state, props) => ({
  revision: state.maha.network.revision
})

export default connect(mapStateToProps)(Revision)
