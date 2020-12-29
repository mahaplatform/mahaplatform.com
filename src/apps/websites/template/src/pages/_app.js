import { Workbox } from 'workbox-window'
import PropTypes from 'prop-types'
import React from 'react'

class App extends React.Component {

  static propTypes = {
    Component: PropTypes.func,
    pageProps: PropTypes.object
  }

  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }

  componentDidMount() {
    const wb = new Workbox('sw.js', { scope: '/' })
    wb.register()
  }

}

export default App
