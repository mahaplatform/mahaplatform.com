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
    return [
      <Style key="style" { ...this._getStyle() } />,
      <Email key="email" { ...this._getEmail() } />
    ]
  }

  componentDidMount() {
    this.pasteur = new Pasteur({
      window,
      target: window.parent,
      name: 'designerCanvas',
      targetName: 'designerComponent',
      services: {
        designer: {
          highlight: this._handleHighlight,
          update: this._handleUpdate
        }
      }
    })
    this.pasteur.send('designer','ready')
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

  _handleAction(action, data) {
    this.pasteur.send('designer', action, data)
  }

  _handleHighlight({ active }) {
    this.setState({ active })
  }

  _handleUpdate({ config, editable }) {
    this.setState({ config, editable })
  }

}

export default hot(module)(App)
