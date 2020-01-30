import { hot } from 'react-hot-loader'
import Style from '../embedded/components/style'
import Root from '../embedded/components/root'
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
        <div className="maha-form-layout">
          <Style key="style" { ...this._getStyle() } />
          <Form { ...this._getForm() } />
        </div>
      </Root>

    )
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

  _handleAction(action, data) {
    this.pasteur.send('designer', action, data)
  }

  _handleHighlight({ active }) {
    this.setState({ active })
  }

  _handleUpdate({ config }) {
    this.setState({ config })
  }

}

export default hot(module)(App)
