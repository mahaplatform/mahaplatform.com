import Style from '../designer/components/style'
import Body from '../designer/components/body'
import Root from '../designer/components/root'
import { hot } from 'react-hot-loader'
import PropTypes from 'prop-types'
import Pasteur from 'pasteur'
import React from 'react'

class App extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  pasteur = null

  _handleResize = this._handleResize.bind(this)

  render() {
    return (
      <Style key="style" { ...this._getStyle() } />,
      <Root key="root">
        <Body { ...this._getBody() } />
      </Root>
    )
  }

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', this._handleResize, false)
    window.addEventListener('resize', this._handleResize, false)
    this.pasteur = new Pasteur({
      window,
      target: window.parent,
      name: 'form',
      targetName: 'embed',
      services: {}
    })
  }

  componentWillUnmount() {
    this.pasteur.close()
  }

  _getBodyStyle(prop) {
    const el = document.body
    const retVal = document.defaultView.getComputedStyle(el, null)
    return !retVal ? parseInt(retVal[prop], 10) : 0
  }

  _getBody() {
    const { config } = window
    return {
      config
    }
  }

  _getStyle() {
    const { config } = window
    return {
      config: config.style
    }
  }

  _handleResize() {
    const height = document.body.offsetHeight + this._getBodyStyle('marginTop') + this._getBodyStyle('marginBottom') + 40
    this.pasteur.send('embed', 'resize', height)
  }

}

export default hot(module)(App)
