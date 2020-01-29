import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux-rubberstamp'
import createApiRequest from 'redux-api-request'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import qs from 'qs'

import achMiddleware from './form/payment/ach/middleware'
import cardMiddleware from './form/payment/card/middleware'
import applepayMiddleware from './form/payment/applepay/middleware'
import googlepayMiddleware from './form/payment/googlepay/middleware'

import paymentfield from './form/payment'
import applepay from './form/payment/applepay'
import googlepay from './form/payment/googlepay'
import ach from './form/payment/ach'
import card from './form/payment/card'

import addressfield from './form/fields/addressfield'
import productfield from './form/fields/productfield'
import filefield from './form/fields/filefield'
import form from './form'

class Root extends React.Component {

  static propTypes = {
    reducers: PropTypes.array,
    children: PropTypes.any
  }

  constructor(props) {

    super(props)

    const reducer = combineReducers([
      applepay,
      googlepay,
      ach,
      card,
      form,
      filefield,
      addressfield,
      paymentfield,
      productfield
    ])

    const loggerMiddleware = createLogger({ collapsed: true })

    const apiRequestMiddleware = createApiRequest()

    const logFlag = qs.parse(window.location.search.substr(1)).log !== undefined

    const isProduction = process.env.NODE_ENV === 'production'

    const middleware = [
      thunkMiddleware,
      apiRequestMiddleware,
      achMiddleware,
      cardMiddleware,
      applepayMiddleware,
      googlepayMiddleware,
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
