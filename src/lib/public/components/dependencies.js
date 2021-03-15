import React from 'react'
import _ from 'lodash'

const page = {
  scripts: [],
  styles: []
}

const Creator = (dependencies) => (Component) => {

  class Dependencies extends React.Component {

    state = {
      loaded: false,
      scripts: [],
      styles: []
    }

    _handleCheck = this._handleCheck.bind(this)

    render() {
      if(!this.state.loaded) return null
      return <Component {...this.props} />
    }

    componentDidMount() {
      const scripts = dependencies.scripts ? dependencies.scripts.reduce((scripts, script) => {
        const load = _.find(page.scripts, { url: script.url }) === undefined
        if(load) page.scripts.push(script)
        return [
          ...scripts,
          { ...script, load }
        ]
      }, []) : []
      const styles = dependencies.styles ? dependencies.styles.reduce((styles, style) => {
        const load = _.find(page.styles, { url: style.url }) === undefined
        if(load) page.styles.push(style)
        return [
          ...styles,
          { ...style, load }
        ]
      }, []) : []
      this.setState({
        scripts,
        styles
      }, () => {
        this._handleCheck(true)
      })
    }

    _getNormalized(path) {
      return path[0] === '/' ? `${process.env.ADMIN_HOST}${path}` : path
    }

    _handleCheck(load = false) {
      const { scripts, styles } = this.state
      const scriptscheck = scripts.reduce((loaded, dependency) => {
        if(this._handleCheckLoadedScript(dependency)) return dependency
        if(load && dependency.load) this._handleLoadScript(dependency)
        return false
      }, true)
      const stylescheck = styles.reduce((loaded, dependency) => {
        if(this._handleCheckLoadedStyle(dependency)) return dependency
        if(load && dependency.load) this._handleLoadStyle(dependency)
        return false
      }, true)
      if(scriptscheck && stylescheck) return this.setState({ loaded: true })
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
