import { hot } from 'react-hot-loader'
import PropTypes from 'prop-types'
import Header from './header'
import Footer from './footer'
import React from 'react'
import Form from './form'

class App extends React.Component {

  static propTypes = {
    active: PropTypes.object,
    config: PropTypes.object
  }

  render() {
    return (
      <div className="maha-form">
        <Header { ...this._getHeader() } />
        <Form { ...this._getForm() } />
        <Footer { ...this._getFooter() } />
      </div>
    )
  }

  _getForm() {
    const { active, config } = this.props
    return {
      active,
      fields: config.fields,
      onAction: this._handleAction
    }
  }

  _getFooter() {
    return this.props.config.footer
  }

  _getHeader() {
    return this.props.config.header
  }

}

export default hot(module)(App)
