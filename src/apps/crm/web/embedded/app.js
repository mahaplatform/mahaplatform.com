import { Error, Logger, Network } from 'maha-client'
import { hot } from 'react-hot-loader'
import Style from './components/style'
import Form from './components/form'
import Root from './components/root'
import PropTypes from 'prop-types'
import Pasteur from 'pasteur'
import React from 'react'

class App extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    embedded: PropTypes.bool
  }

  pasteur = null

  state = {
    ready: false,
    style: null
  }

  _handleRedirect = this._handleRedirect.bind(this)
  _handleResize = this._handleResize.bind(this)
  _handleReady = this._handleReady.bind(this)

  render() {
    if(!this.state.ready) return null
    return (
      <Root key="root">
        <Logger environment="form">
          <Error>
            <Network>
              <div className="maha-form-layout">
                <Style { ...this._getStyle() } />
                <Form { ...this._getForm() } />
              </div>
            </Network>
          </Error>
        </Logger>
      </Root>
    )
  }

  componentDidMount() {
    if(!this.props.embedded) {
      return this.setState({
        ready: true
      })
    }
    this.pasteur = new Pasteur({
      window,
      target: window.parent,
      name: 'form',
      targetName: 'embed'
    })
    this.pasteur.send('ready')
    this.pasteur.on('ready', this._handleReady)
  }

  _getForm() {
    const { embedded } = this.props
    const { form, token } = window
    const { code, config, ipaddress, referer, starttime, settings, isOpen } = form
    return {
      code,
      config,
      embedded,
      ipaddress,
      isOpen,
      referer,
      starttime,
      settings,
      token,
      onRedirect: this._handleRedirect,
      onResize: this._handleResize
    }
  }

  _getStyle() {
    const { embedded } = this.props
    const { style } = this.state
    const { form } = window
    const { config } = form
    return { config, embedded, style }
  }

  _handleReady({ style }) {
    this.setState({
      ready: true,
      style
    })
  }


  _handleRedirect(url) {
    this.pasteur.send('redirect', url)
  }

  _handleResize(height) {
    this.pasteur.send('resize', height)
  }
}

export default hot(module)(App)
