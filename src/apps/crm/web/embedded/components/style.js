import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Style extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    return (
      <style type="text/css">
        { this._getStyle() }
      </style>
    )
  }

  _getProp(prop, key, unit = null, defaultValue = null) {
    const { config } = this.props
    const value = _.get(config, key)
    const adjusted = !_.isNil(value) ? value : defaultValue
    const formatted = unit ? `${adjusted}${unit}` : value
    return !_.isNil(value) ? [{ prop, value: formatted }] : []
  }

  _getFormat(prop, targetValue, key, defaultValue) {
    const { config } = this.props
    const formats = _.get(config, key) || []
    const selected = _.includes(formats, targetValue)
    const value = selected ? targetValue : defaultValue
    return selected ? [{ prop, value }] : []
  }

  _getBorder(prop, key) {
    const { config } = this.props
    const width = _.get(config, `${key}_width`)
    const style = _.get(config, `${key}_style`)
    const color = _.get(config, `${key}_color`)
    if(!_.isNil(width) && !_.isNil(style) && !_.isNil(color)) {
      return [{ prop, value: `${width}px ${style} ${color}` }]
    }
    return []
  }

  _getStyle() {
    const styles = [
      { selector: 'body', styles: [
        ...this._getProp('background-color', 'page.background_color')
      ] },
      { selector: '.maha-form', styles: [
        ...this._getProp('background-color', 'form.background_color'),
        ...this._getProp('margin-top', 'page.padding_top', 'px'),
        ...this._getProp('margin-bottom', 'page.padding_bottom', 'px')
      ] },
      { selector: '.maha-form-header', styles: [
        ...this._getProp('background-color', 'header.background_color'),
        ...this._getProp('color', 'header.color')
      ] },
      { selector: '.maha-form-footer', styles: [
        ...this._getProp('background-color', 'footer.background_color'),
        ...this._getProp('color', 'footer.color')
      ] }
    ]
    return styles.map(item => item.styles.length === 0 ? '' : `
      ${item.selector} {
        ${ item.styles.map(style => `${style.prop}: ${style.value};`).join('\n') }
      }`).join('\n')
  }

}

export default Style
