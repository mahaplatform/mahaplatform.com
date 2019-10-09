import Document from './components/document'
import Style from './components/style'
import { hot } from 'react-hot-loader'
import PropTypes from 'prop-types'
import Pasteur from 'pasteur'
import React from 'react'

class App extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  pasteur = null

  state = {
    config: {
      page: {
        padding_top: 50,
        padding_right: 50,
        padding_left: 50,
        padding_bottom: 50,
        h1_color: 'blue',
        h2_color: 'green',
        p_color: 'black',
        p_line_height: 1.5
      }
    }
  }

  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    // if(!this.state.config) return null
    return [
      <Style key="style" { ...this._getStyle() } />,
      <Document key="document" { ...this._getDocument() } />
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
          update: this._handleUpdate
        }
      }
    })
    this.pasteur.send('designer','ready')
  }

  componentWillUnmount() {
    this.pasteur.close()
  }

  _getDocument() {
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

  _handleUpdate({ config }) {
    this.setState({ config })
  }

}

export default hot(module)(App)
