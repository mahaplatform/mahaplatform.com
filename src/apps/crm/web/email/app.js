import { Error, Logger } from 'maha-client'
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { hot } from 'react-hot-loader'
import Style from './components/style'
import Email from './components/email'
import PropTypes from 'prop-types'
import Pasteur from 'pasteur'
import React from 'react'

class App extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  pasteur = null

  state = {
    active: {
      section: null,
      index: null
    },
    config: null,
    editable: true
  }

  _handleAction = this._handleAction.bind(this)
  _handleHighlight = this._handleHighlight.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    if(!this.state.config) return null
    return (
      <DndProvider backend={ HTML5Backend }>
        <Logger environment="email">
          <Error>
            <div className="email">
              <Style { ...this._getStyle() } />
              <Email { ...this._getEmail() } />
            </div>
          </Error>
        </Logger>
      </DndProvider>
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

  _getEmail() {
    const { active, config, editable } = this.state
    return {
      active,
      config,
      editable,
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

  _handleUpdate({ config, editable }) {
    this.setState({ config, editable })
  }

}

export default hot(module)(App)
