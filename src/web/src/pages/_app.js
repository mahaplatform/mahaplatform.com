import Analytics from '../components/analytics'
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
    return (
      <>
        <Analytics website={ pageProps.website }>
          <Component {...pageProps} />
        </Analytics>
      </>
    )
  }

  componentDidMount() {
    if(process.env.NODE_ENV !== 'production') return
    const wb = new Workbox('sw.js', { scope: '/' })
    wb.register()
  }

}

export default App
