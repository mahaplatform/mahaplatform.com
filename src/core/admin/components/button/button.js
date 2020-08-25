import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class Button extends React.Component {

  static contextTypes = {
    confirm: PropTypes.object,
    drawer: PropTypes.object,
    flash: PropTypes.object,
    host: PropTypes.object,
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
    html: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.any,
    link: PropTypes.string,
    mobile: PropTypes.bool,
    modal: PropTypes.any,
    request: PropTypes.shape({
      method: PropTypes.string,
      endpoint: PropTypes.string,
      onFailure: PropTypes.func,
      onSuccess: PropTypes.func
    }),
    route: PropTypes.string,
    status: PropTypes.string,
    text: PropTypes.string,
    tooltip: PropTypes.any,
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

  _handleClick = this._handleClick.bind(this)

  render() {
    const { icon } = this.props
    return (
      <div { ...this._getButton() }>
        { icon && <i className={`fa fa-${icon}`} /> }
        { this._getLabel() }
      </div>
    )

  }

  _getLabel() {
    const { children, component, label, text, html } = this.props
    if(!_.isNil(html)) return <span dangerouslySetInnerHTML={{__html: html }} />
    if(!_.isNil(label)) return label
    if(!_.isNil(text)) return text
    if(!_.isNil(children)) return children
    if(!_.isNil(component)) return component
    return null
  }

  _getButton() {
    const { disabled } = this.props
    return {
      ...this._getToolTip(),
      className: this._getClass(),
      disabled,
      onClick: this._handleClick
    }
  }

  _getClass() {
    const { component, basic, className, color, disabled, mobile, status } = this.props
    if(component) return ''
    const classes = className === undefined ? ['ui', color, 'fluid', 'button'] : (className ? className.split(' ') : [])
    classes.push('maha-button')
    if(mobile !== false) classes.push('mobile')
    if(basic) classes.push('basic')
    if(disabled) classes.push('disabled')
    if(status === 'submitting') classes.push('loading')
    return classes.join(' ')
  }

  _getToolTip() {
    const { tooltip } = this.props
    if(!tooltip) return {}
    return {
      'data-tooltip': _.isString(tooltip) ? tooltip : tooltip.title,
      'data-position': _.isString(tooltip) ? 'bottom right' : tooltip.position,
      'data-inverted': ''
    }
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
      if(route) this._handleRoute(route, e.metaKey)
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
    this.context.host.openWindow(url)
  }

  _handleUrl(url) {
    window.location.href = url
  }

  _handleRoute(route, metaKey) {
    if(metaKey) return this._handleLink(`${process.env.WEB_HOST}${route}`)
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
