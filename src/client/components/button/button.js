import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class Button extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    basic: PropTypes.bool,
    className: PropTypes.string,
    color: PropTypes.string,
    component: PropTypes.any,
    children: PropTypes.any,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    location: PropTypes.string,
    handler: PropTypes.func,
    icon: PropTypes.string,
    label: PropTypes.any,
    link: PropTypes.string,
    mobile: PropTypes.bool,
    modal: PropTypes.any,
    request: PropTypes.object,
    size: PropTypes.string,
    status: PropTypes.string,
    text: PropTypes.string,
    url: PropTypes.string,
    onRequest: PropTypes.func
  }

  static defaultProps = {
    basic: false,
    disabled: false,
    mobile: true,
    size: 'medium'
  }

  link = null

  _handleClick = this._handleClick.bind(this)

  render() {
    const { icon, link } = this.props
    return (
      <div { ...this._getButton() }>
        { icon && <i className={`fa fa-${icon}`} /> }
        <span dangerouslySetInnerHTML={{ __html: this._getLabel() }} />
        { link && <a target="_blank" ref={ node => this.link = node} /> }
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { flash } = this.context
    const { error, status } = this.props
    if(prevProps.status !== status && status === 'failure') {
      flash.set('error', error)
    }
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
    const { component, basic, className, color, disabled, mobile, size, status } = this.props
    if(component) return ''
    const classes = className ? className.split(' ') : ['ui', color, size, 'fluid', 'button']
    classes.push('maha-button')
    if(mobile !== false) classes.push('mobile')
    if(basic) classes.push('basic')
    if(disabled) classes.push('disabled')
    if(status === 'submitting') classes.push('loading')
    return classes.join(' ')
  }

  _handleClick(e) {
    e.stopPropagation()
    const { disabled, handler, link, modal, request, url } = this.props
    if(disabled) return
    if(link) this._handleLink(link)
    if(url) this._handleUrl(url)
    if(request) this._handleRequest(request)
    if(modal) this._handleModal(modal)
    if(handler) this._handleFunction(handler, e)
  }

  _handleLink(url) {
    this.link.href = url
    this.link.click()
  }

  _handleUrl(url) {
    window.location.href = url
  }

  _handleFunction(handler, e) {
    handler(e)
  }

  _handleModal(modal) {
    if(modal.component) {
      const options = modal.options || {}
      return this.context.modal.open(modal.component, options)
    }
    this.context.modal.open(modal)
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
