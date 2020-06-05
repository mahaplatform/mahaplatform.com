import React from 'react'
import _ from 'lodash'

const Creator = (dependency) => (Component) => {

  class Dependency extends React.Component {

    state = {
      loaded: false
    }

    _handleCheck = this._handleCheck.bind(this)

    render() {
      if(!this.state.loaded) return null
      return <Component {...this.props} />
    }

    componentDidMount() {
      this._handleLoad()
    }

    _handleCheck() {
      const { name } = dependency
      const loaded = typeof window !== 'undefined' && typeof _.get(window, name) !== 'undefined'
      this.setState({ loaded })
      if(!loaded) setTimeout(this._handleCheck, 1000)
    }

    _handleLoad() {
      const { src, name } = dependency
      const loaded = typeof window !== 'undefined' && typeof _.get(window, name) !== 'undefined'
      if(loaded) return this.setState({ loaded })
      const script = document.createElement('script')
      script.async = true
      script.src = src
      document.body.appendChild(script)
      setTimeout(this._handleCheck, 1000)
    }

  }

  return Dependency

}

export default Creator
