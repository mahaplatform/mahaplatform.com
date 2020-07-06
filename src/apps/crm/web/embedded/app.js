import { Error, Logger } from 'maha-client'
import { hot } from 'react-hot-loader'
import Style from './components/style'
import Form from './components/form'
import Root from './components/root'
import PropTypes from 'prop-types'
import React from 'react'

class App extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    embedded: PropTypes.bool
  }

  render() {
    const { embedded } = this.props
    return (
      <Root key="root">
        <Logger environment="form">
          <Error>
            <div className="maha-form-layout">
              { !embedded &&
                <Style key="style" { ...this._getStyle() } />
              }
              <Form { ...this._getForm() } />
            </div>
          </Error>
        </Logger>
      </Root>
    )
  }

  _getForm() {
    const { embedded } = this.props
    const { form, token } = window
    const { code, config, ipaddress, referer, starttime, settings, isOpen } = form
    return { code, config, embedded, ipaddress, referer, starttime, settings, isOpen, token }
  }

  _getStyle() {
    const { form } = window
    const { config } = form
    return { config }
  }

}

export default hot(module)(App)
