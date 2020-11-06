import { AddressField, Button, ContainerRoot, Form, Network, Payment, ApplePay, GooglePay, PayPal, ACH, Card, Door, paymentMiddleware } from '@client'
import { createStore, applyMiddleware } from 'redux'
import createlocalStorage from 'redux-local-storage'
import { combineReducers } from 'redux-rubberstamp'
import createApiRequest from 'redux-api-request'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import localforage from 'localforage'
import PropTypes from 'prop-types'
import Checkout from './checkout'
import Wrapper from './wrapper'
import React from 'react'
import qs from 'qs'

class Root extends React.Component {

  static propTypes = {
    reducers: PropTypes.array,
    storeName: PropTypes.string,
    children: PropTypes.any
  }

  constructor(props) {

    super(props)

    const reducer = combineReducers([
      AddressField,
      Button,
      Checkout,
      ContainerRoot,
      Form,
      Network,
      Payment,
      ApplePay,
      GooglePay,
      PayPal,
      ACH,
      Card,
      Door,
      Wrapper
    ])

    const loggerMiddleware = createLogger({ collapsed: true })

    const apiRequestMiddleware = createApiRequest()

    const client = localforage.createInstance({
      name: 'store',
      storeName: props.storeName
    })

    const localStorageMiddleware = createlocalStorage(client)

    const logFlag = qs.parse(window.location.search.substr(1)).log !== undefined

    const isProduction = process.env.NODE_ENV === 'production'

    const middleware = [
      thunkMiddleware,
      apiRequestMiddleware,
      localStorageMiddleware,
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
