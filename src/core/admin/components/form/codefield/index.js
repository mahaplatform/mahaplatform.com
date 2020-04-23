import PropTypes from 'prop-types'
import React from 'react'

class CodeField extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.string,
    lang: PropTypes.string,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    lang: 'html',
    onChange: () => {},
    onReady: () => {}
  }

  editor = null

  state = {
    value: '',
    ready: false
  }

  _handleCheck = this._handleCheck.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    return (
      <div className="maha-codefield">
        <div { ...this._getEditor() } />
      </div>
    )
  }

  componentDidMount() {
    this._handleLoad()
  }

  componentDidUpdate(prevProps, prevState) {
    const { ready, value } = this.state
    if(ready !== prevState.ready && ready) {
      this._handleInit()
    }
    if(value !== prevState.value) {
      this.props.onChange(value)
    }
  }

  _getEditor() {
    return {
      ref: node => this.div = node
    }
  }

  _handleCheck() {
    const ready = typeof window !== 'undefined' && typeof window.ace !== 'undefined'
    this.setState({ ready })
    if(!ready) setTimeout(this._handleCheck, 1000)
  }

  _handleInit() {
    const { defaultValue, lang } = this.props
    window.ace.config.set('basePath', '/admin/js/ace')
    this.editor = window.ace.edit(this.div)
    this.editor.setTheme('ace/theme/chrome')
    this.editor.setDisplayIndentGuides(false)
    this.editor.setHighlightActiveLine(false)
    this.editor.session.setUseSoftTabs(false)
    this.editor.session.setTabSize(2)
    this.editor.session.setFoldStyle('manual')
    this.editor.session.setMode(`ace/mode/${lang}`)
    this.editor.container.style.fontSize = '12px'
    this.editor.container.style.lineHeight = '20px'
    this.editor.renderer.setShowGutter(false)
    this.editor.renderer.setShowPrintMargin(false)
    this.editor.renderer.updateFontSize()
    if(defaultValue) {
      this.editor.getSession().setValue(defaultValue)
    }
    this.editor.getSession().on('change', this._handleUpdate)
    this.props.onReady()
  }

  _handleLoad() {
    const ready = typeof window !== 'undefined' && typeof window.ace !== 'undefined'
    if(ready) return this.setState({ ready })
    const script = document.createElement('script')
    script.async = true
    script.src = `${process.env.WEB_HOST}/admin/js/ace.min.js`
    document.body.appendChild(script)
    setTimeout(this._handleCheck, 1000)
  }

  _handleUpdate() {
    this.setState({
      value: this.editor.getSession().getValue()
    })
  }

}

export default CodeField
