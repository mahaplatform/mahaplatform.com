import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Loader } from '@client'
import Pasteur from 'pasteur'
import React from 'react'

class Sign extends React.Component {

  static propTypes = {
    agreement: PropTypes.object,
    cid: PropTypes.string,
    document: PropTypes.object,
    onCreateAgreement: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    ready: false
  }

  _handleDone = this._handleDone.bind(this)
  _handleReady = this._handleReady.bind(this)

  render() {
    const { ready } = this.state
    return (
      <div className="maha-signaturefield-sign">
        <iframe {...this._getIframe() } />
        { !ready &&
          <Loader { ...this._getLoader() } />
        }
      </div>
    )
  }

  componentDidMount() {
    this.pasteur = new Pasteur({
      window,
      target: window.parent,
      name: 'parent',
      targetName: 'child'
    })
    this.pasteur.on('complete', this._handleDone)
  }

  _getIframe() {
    const { agreement } = this.props
    const { ready } = this.state
    return {
      src: agreement.url,
      style: {
        visibility: ready ? 'visible' : 'hidden'
      },
      onLoad: this._handleReady
    }
  }

  _getLoader() {
    return {
      label: 'Connecting to Adobe Sign'
    }
  }

  _handleReady() {
    this.setState({
      ready: true
    })
  }

  _handleDone() {
    this.props.onDone()
  }

}

const mapStateToProps = (state, props) => ({
  ...state.signaturefield[props.cid]
})

export default connect(mapStateToProps)(Sign)
