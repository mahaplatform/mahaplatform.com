import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux-rubberstamp'
import createApiRequest from 'redux-api-request'
import braintreeMiddleware from './braintree'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import qs from 'qs'

import paymentfield from '../form/paymentfield'
import googlepay from '../form/paymentfield/googlepay'
import ach from '../form/paymentfield/ach'
import card from '../form/paymentfield/card'
import productfield from '../form/productfield'
import filefield from '../form/filefield'
import form from '../form'

class Root extends React.Component {

  static propTypes = {
    reducers: PropTypes.array,
    children: PropTypes.any
  }

  constructor(props) {

    super(props)

    const reducer = combineReducers([
      googlepay,
      ach,
      card,
      form,
      filefield,
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
      braintreeMiddleware,
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
