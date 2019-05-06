import authenticationMiddleware from './authentication'
import { createStore, applyMiddleware } from 'redux'
import createlocalStorage from 'redux-local-storage'
import { combineReducers } from 'redux-rubberstamp'
import fingerprintMiddleware from './fingerprint'
import createApiRequest from 'redux-api-request'
import createSocketioClient from './socketio'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import pushNative from './push_native'
import tokenMiddleware from './token'
import PropTypes from 'prop-types'
import pushWeb from './push_web'
import Reframe from 'reframe'
import React from 'react'
import qs from 'qs'

class Root extends React.Component {

  static propTypes = {
    reducers: PropTypes.array,
    children: PropTypes.any
  }

  constructor(props) {

    super(props)

    const reducer = combineReducers([
      ...Object.values(Reframe),
      ...props.reducers
    ])

    const loggerMiddleware = createLogger({ collapsed: true })

    const apiRequestMiddleware = createApiRequest()

    const socketioClientMiddleware = createSocketioClient({
      url: `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
    })

    const localStorageMiddleware = createlocalStorage()

    const logFlag = qs.parse(window.location.search.substr(1)).log !== undefined

    const isProduction = process.env.NODE_ENV === 'production'

    const getPushMiddleware = () => {
      if(navigator.userAgent.match(/Cordova/) !== null) return pushNative()
      if(navigator.userAgent.match(/Electron/) !== null) return pushNative()
      return pushWeb()
    }

    const pushMiddleware = getPushMiddleware()

    const middleware = [
      thunkMiddleware,
      tokenMiddleware,
      fingerprintMiddleware,
      apiRequestMiddleware,
      socketioClientMiddleware,
      localStorageMiddleware,
      authenticationMiddleware,
      pushMiddleware,
      ...(!isProduction || logFlag) ? [loggerMiddleware] : []
    ]

    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)

    this.store = createStoreWithMiddleware(reducer)

  }

  render() {
    return (
      <Provider store={ this.store }>
        { this.props.children }
      </Provider>
    )
  }

}

export default Root
