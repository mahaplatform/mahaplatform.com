import { hot } from 'react-hot-loader'
import PropTypes from 'prop-types'
import React from 'react'

class App extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    return <div>foo</div>
  }

}

export default hot(module)(App)
