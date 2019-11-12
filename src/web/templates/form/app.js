import { hot } from 'react-hot-loader'
import Style from './components/style'
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
    config: {
      style: {
        page: {
          background_color: 'red'
        },
        form: {
          background_color: 'white'
        },
        header: {
          background_color: 'green'
        },
        footer: {
          background_color: 'purple'
        }
      },
      header: {
        image: null,
        // text: '<h1>Form</h1><p>This is a form</p>'
      },
      fields: [
        { type: 'text', text: 'foo bar baz' },
        { label: 'First Name', name: 'first_name', type: 'textfield', placeholder: 'First Name', required: true },
        { label: 'Last Name', name: 'last_name', type: 'textfield', placeholder: 'Last Name', required: true },
        { label: 'Email', name: 'email', type: 'textfield', placeholder: 'Email', required: true },
        { label: 'Gender', name: 'gender', type: 'dropdown', placeholder: 'Gender', options: [{value:'male',text:'Male'},{value:'female',text:'Female'}], required: true }
      ],
      footer: {
        // text: '<p>foo bar baz</p>'
      }
    }
  }

  _handleAction = this._handleAction.bind(this)
  _handleHighlight = this._handleHighlight.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    if(!this.state.config) return null
    return [
      <Style key="style" { ...this._getStyle() } />,
      <Form key="form" { ...this._getForm() } />
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
    return {
      config: config.style
    }
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
