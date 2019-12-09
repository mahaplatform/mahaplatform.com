import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux-rubberstamp'
import createApiRequest from 'redux-api-request'
// import createSocketioClient from './socketio'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import qs from 'qs'

class Root extends React.Component {

  static propTypes = {
    reducers: PropTypes.array,
    children: PropTypes.any
  }

  constructor(props) {

    super(props)

    const reducer = combineReducers(props.reducers)

    const loggerMiddleware = createLogger({ collapsed: true })

    const apiRequestMiddleware = createApiRequest()

    // const socketioClientMiddleware = createSocketioClient({
    //   url: `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
    // })

    const logFlag = qs.parse(window.location.search.substr(1)).log !== undefined

    const isProduction = process.env.NODE_ENV === 'production'

    const middleware = [
      thunkMiddleware,
      apiRequestMiddleware,
      // socketioClientMiddleware,
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
