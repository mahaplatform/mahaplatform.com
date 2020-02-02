import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const alignments = [
  { label: 'Left', icon: 'align-left', code: 'left' },
  { label: 'Center', icon: 'align-center', code: 'center' },
  { label: 'Right', icon: 'align-right', code: 'right' }
]

class AlignmentField extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  state = {
    selected: null
  }

  render() {
    return (
      <div className="alignmentfield">
        { alignments.map((style, index) => (
          <div key={`style_${index}`} {...this._getStyle(style)}>
            <i className={`fa fa-fw fa-${style.icon}`} />
          </div>
        ))}
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this._handleChoose(defaultValue)
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
      onClick: this._handleChoose.bind(this, style.code)
    }
  }

  _getClass(style) {
    const { selected } = this.state
    const classes = ['alignmentfield-option']
    if(_.includes(selected, style.code)) classes.push('selected')
    return classes.join(' ')
  }

  _handleChoose(selected) {
    this.setState({ selected })
  }

}

export default AlignmentField
