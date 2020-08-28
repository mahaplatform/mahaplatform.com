import React from 'react'

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
      const path = this._getNormalized(dependency)
      return scripts.find(script => {
        return script.src === path
      }) !== undefined
    }

    _handleCheckLoadedStyle(dependency) {
      const styles = Array.prototype.slice.call(document.styleSheets)
      const path = this._getNormalized(dependency)
      return styles.find(style => {
        return style.href === path
      }) !== undefined
    }

    _handleLoadScript(dependency) {
      const script = document.createElement('script')
      script.async = true
      script.defer = true
      script.src = this._getNormalized(dependency)
      script.onload = this._handleCheck
      document.body.appendChild(script)
    }

    _handleLoadStyle(dependency) {
      const style = document.createElement('link')
      style.rel = 'stylesheet'
      style.type = 'text/css'
      style.href = this._getNormalized(dependency)
      style.onload = this._handleCheck
      document.head.appendChild(style)
    }

  }

  return Dependencies

}

export default Creator
