import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const styles = [
  { label: 'Bold', icon: 'bold', code: 'bold' },
  { label: 'Italic', icon: 'italic', code: 'italic' },
  { label: 'Underline', icon: 'underline', code: 'underline' }
]

class FormatField extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.array,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  state = {
    selected: []
  }

  render() {
    return (
      <div className="formatfield">
        { styles.map((style, index) => (
          <div key={`style_${index}`} {...this._getStyle(style)}>
            <i className={`fa fa-fw fa-${style.icon}`} />
          </div>
        ))}
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    console.log('defaultValue', defaultValue)
    if(defaultValue) this._handleSet(defaultValue)
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { selected } = this.state
    if(!_.isEqual(selected, prevState.selected)) {
      this.props.onChange(selected)
    }
  }

  _getStyle(style) {
    return {
      className: this._getClass(style),
      onClick: this._handleToggle.bind(this, style.code)
    }
  }

  _getClass(style) {
    const { selected } = this.state
    const classes = ['formatfield-option']
    if(_.includes(selected, style.code)) classes.push('selected')
    return classes.join(' ')
  }

  _handleSet(selected) {
    this.setState({ selected })
  }

  _handleToggle(code) {
    const { selected } = this.state
    this.setState({
      selected: _.xor(selected, [code])
    })
  }

}

export default FormatField
