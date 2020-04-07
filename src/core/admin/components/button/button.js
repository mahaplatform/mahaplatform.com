import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class Button extends React.Component {

  static contextTypes = {
    confirm: PropTypes.object,
    drawer: PropTypes.object,
    flash: PropTypes.object,
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    basic: PropTypes.bool,
    className: PropTypes.string,
    color: PropTypes.string,
    component: PropTypes.any,
    confirm: PropTypes.any,
    children: PropTypes.any,
    disabled: PropTypes.bool,
    drawer: PropTypes.any,
    error: PropTypes.string,
    location: PropTypes.string,
    handler: PropTypes.func,
    icon: PropTypes.string,
    label: PropTypes.any,
    link: PropTypes.string,
    mobile: PropTypes.bool,
    modal: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func
    ]),
    request: PropTypes.shape({
      method: PropTypes.string,
      endpoint: PropTypes.string,
      onFailure: PropTypes.func,
      onSuccess: PropTypes.func
    }),
    route: PropTypes.string,
    status: PropTypes.string,
    text: PropTypes.string,
    url: PropTypes.string,
    onDone: PropTypes.func,
    onRequest: PropTypes.func
  }

  static defaultProps = {
    basic: false,
    mobile: true,
    disabled: false,
    onDone: () => {}
  }

  link = null

  _handleClick = this._handleClick.bind(this)

  render() {
    const { icon, link } = this.props
    return (
      <div { ...this._getButton() }>
        { icon && <i className={`fa fa-${icon}`} /> }
        { this._getLabel() }
        { link && <a target="_blank" ref={ node => this.link = node} /> }
      </div>
    )

  }

  _getLabel() {
    const { children, component, label, text } = this.props
    if(!_.isNil(label)) return label
    if(!_.isNil(text)) return text
    if(!_.isNil(children)) return children
    if(!_.isNil(component)) return component
    return null
  }

  _getButton() {
    const { disabled } = this.props
    return {
      className: this._getClass(),
      disabled,
      onClick: this._handleClick
    }
  }

  _getClass() {
    const { component, basic, className, color, disabled, mobile, status } = this.props
    if(component) return ''
    const classes = className ? className.split(' ') : ['ui', color, 'fluid', 'button']
    classes.push('maha-button')
    if(mobile !== false) classes.push('mobile')
    if(basic) classes.push('basic')
    if(disabled) classes.push('disabled')
    if(status === 'submitting') classes.push('loading')
    return classes.join(' ')
  }

  componentDidUpdate(prevProps) {
    const { flash } = this.context
    const { error, status } = this.props
    if(prevProps.status !== status && status === 'failure') {
      flash.set('error', error)
    }
  }

  _handleClick(e) {
    e.stopPropagation()
    const { confirm, disabled, drawer, handler, link, location, modal, request, route, url, onDone } = this.props
    if(disabled) return
    const yesHandler = () => {
      if(link) this._handleLink(link)
      if(url) this._handleUrl(url)
      if(route) this._handleRoute(route)
      if(request) this._handleRequest(request)
      if(modal) this._handleModal(modal)
      if(drawer) this._handleDrawer(drawer, location)
      if(handler) this._handleFunction(handler, e)
    }
    onDone()
    if(confirm) return this.context.confirm.open(confirm, yesHandler)
    yesHandler()
  }

  _handleLink(url) {
    this.link.href = url
    this.link.click()
  }

  _handleUrl(url) {
    window.location.href = url
  }

  _handleRoute(route) {
    this.context.router.history.push(route)
  }

  _handleModal(modal) {
    if(modal.component) {
      const options = modal.options || {}
      return this.context.modal.open(modal.component, options)
    }
    this.context.modal.open(modal)
  }

  _handleDrawer(component, location) {
    this.context.drawer.open(component, location)
  }

  _handleFunction(handler, e) {
    handler(e)
  }

  _handleRequest(itemRequest) {
    const { onRequest } = this.props
    onRequest({
      body: null,
      params: null,
      ...itemRequest
    })
  }

}

export default Button
