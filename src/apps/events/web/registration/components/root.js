import { AddressField, Button, Form, Network, Payment, ApplePay, GooglePay, PayPal, ACH, Card, Door, paymentMiddleware } from '@client'
import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux-rubberstamp'
import createApiRequest from 'redux-api-request'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import Registration from './registration'
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

    const reducer = combineReducers([
      AddressField,
      Button,
      Form,
      Registration,
      Network,
      Payment,
      ApplePay,
      GooglePay,
      PayPal,
      ACH,
      Card,
      Door
    ])

    const loggerMiddleware = createLogger({ collapsed: true })

    const apiRequestMiddleware = createApiRequest()

    const logFlag = qs.parse(window.location.search.substr(1)).log !== undefined

    const isProduction = process.env.NODE_ENV === 'production'

    const middleware = [
      thunkMiddleware,
      apiRequestMiddleware,
      ...paymentMiddleware,
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
