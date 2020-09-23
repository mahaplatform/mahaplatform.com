import React from 'react'
import _ from 'lodash'

const Creator = (dependencies) => (Component) => {

  class Dependencies extends React.Component {

    state = {
      loaded: false
    }

    _handleCheck = this._handleCheck.bind(this)

    render() {
      if(!this.state.loaded) return null
      return <Component {...this.props} />
    }

    componentDidMount() {
      this._handleCheck(true)
    }

    _getNormalized(path) {
      return path[0] === '/' ? `${process.env.WEB_HOST}${path}` : path
    }

    _handleCheck(load = false) {
      const scripts = dependencies.scripts ? dependencies.scripts.reduce((loaded, dependency) => {
        if(this._handleCheckLoadedScript(dependency)) return loaded
        if(load) this._handleLoadScript(dependency)
        return false
      }, true) : true
      const styles = dependencies.styles ? dependencies.styles.reduce((loaded, dependency) => {
        if(this._handleCheckLoadedStyle(dependency)) return loaded
        if(load) this._handleLoadStyle(dependency)
        return false
      }, true) : true
      if(scripts && styles) return this.setState({ loaded: true })
      setTimeout(this._handleCheck, 1000)
    }

    _handleCheckLoadedScript(dependency) {
      const scripts = Array.prototype.slice.call(document.scripts)
      const path = this._getNormalized(dependency.url)
      const loaded = scripts.find(script => {
        return script.src === path
      }) !== undefined
      const available = typeof _.get(window, dependency.check) !== 'undefined'
      return loaded && available
    }

    _handleCheckLoadedStyle(dependency) {
      const styles = Array.prototype.slice.call(document.styleSheets)
      const path = this._getNormalized(dependency.url)
      return styles.find(style => {
        return style.href === path
      }) !== undefined
    }

    _handleLoadScript(dependency) {
      const script = document.createElement('script')
      script.async = true
      script.defer = true
      script.src = this._getNormalized(dependency.url)
      script.onload = this._handleCheck.bind(this, false)
      document.body.appendChild(script)
    }

    _handleLoadStyle(dependency) {
      const style = document.createElement('link')
      style.rel = 'stylesheet'
      style.type = 'text/css'
      style.href = this._getNormalized(dependency.url)
      style.onload = this._handleCheck.bind(this, false)
      document.head.appendChild(style)
    }

  }

  return Dependencies

}

export default Creator
