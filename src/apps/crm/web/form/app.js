import { hot } from 'react-hot-loader'
import Style from '../embedded/components/style'
import Root from '../embedded/components/root'
import { Error, Network } from 'maha-client'
import Form from './components/form'
import PropTypes from 'prop-types'
import Pasteur from 'pasteur'
import React from 'react'

class App extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  pasteur = null

  state = {
    active: null,
    config: null
  }

  _handleAction = this._handleAction.bind(this)
  _handleHighlight = this._handleHighlight.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    if(!this.state.config) return null
    return (
      <Root key="root">
        <Error>
          <Network>
            <div className="maha-form-layout">
              <Style key="style" { ...this._getStyle() } />
              <Form { ...this._getForm() } />
            </div>
          </Network>
        </Error>
      </Root>
    )
  }

  componentDidMount() {
    this.pasteur = new Pasteur({
      window,
      target: window.parent,
      name: 'designerCanvas',
      targetName: 'designerComponent'
    })
    this.pasteur.on('highlight', this._handleHighlight)
    this.pasteur.on('update', this._handleUpdate)
    this.pasteur.send('ready')
  }

  componentWillUnmount() {
    this.pasteur.close()
  }

  _getForm() {
    const { active, config } = this.state
    return {
      active,
      config,
      onAction: this._handleAction
    }
  }

  _getStyle() {
    const { config } = this.state
    return { config }
  }

  _handleAction(event, data) {
    this.pasteur.send(event, data)
  }

  _handleHighlight({ active }) {
    this.setState({ active })
  }

  _handleUpdate({ config }) {
    this.setState({ config })
  }

}

export default hot(module)(App)
